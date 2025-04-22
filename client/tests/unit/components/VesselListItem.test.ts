import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render } from '@testing-library/vue';
import { createTestingPinia } from '@pinia/testing';
import { mockVessels } from '../../mocks/vessels';
import VesselListItem from '../../../src/components/sidebar/VesselListItem.vue';

const mockEmitUpdateVessel = vi.fn();
vi.mock('@/composables/use-socket', () => ({
  useSocket: () => ({
    emitUpdateVessel: mockEmitUpdateVessel,
    emitDeleteVessel: vi.fn()
  })
}));

const vessel = mockVessels[0];

const mockDialogCreate = vi.fn();

vi.mock('naive-ui', async () => {
  return {
    useDialog: () => ({
      create: mockDialogCreate,
      destroyAll: vi.fn(),
      success: vi.fn(),
      warning: vi.fn(),
      error: vi.fn(),
      info: vi.fn()
    }),
    useMessage: () => ({ success: vi.fn() }),
    NCard: {
      template: '<div class="mock-card"><slot /><slot name="header-extra" /></div>',
    },
    NIcon: { template: '<div class="mock-icon"></div>' },
    NTooltip: { template: '<div><slot /><slot name="trigger" /></div>' },
  };
});

describe('VesselListItem', () => {
  beforeEach(() => {
    render(VesselListItem, {
      props: { vessel },
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              vessel: {
                vessels: mockVessels,
              },
              marker: {
                markers: mockVessels.map((vessel) => ({ ...vessel, marker: {} })),
              },
            },
          }),
        ],
        stubs: {
          'n-tooltip': true,
          'n-icon': true,
          'n-card': { template: '<div><slot /><slot name="header-extra" /></div>' },
          VesselFormModal: true,
        },
      },
    });
  });
  it('should render vessel name', () => {
    const cardElement = document.querySelector('.vessel-card');

    expect(cardElement).toBeTruthy();
    expect(cardElement?.getAttribute('title')).toBe(vessel.name);
  });

  it('should render vessel action buttons', () => {
    const cardElement = document.querySelector('.vessel-card');
    const editIcon = cardElement?.querySelector('.edit-icon');
    const deleteIcon = cardElement?.querySelector('.delete-icon');

    expect(editIcon).toBeTruthy();
    expect(deleteIcon).toBeTruthy();
  });

  it('should render vessel longitude and latitude', () => {
    const cardElement = document.querySelector('.vessel-card');

    expect(cardElement?.textContent).toContain(vessel.latitude.toString());
    expect(cardElement?.textContent).toContain(vessel.longitude.toString());
  });
});
