import { render, screen } from '@testing-library/vue';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import VesselListItem from '../../../src/components/sidebar/VesselListItem.vue';
import { mockVessels } from '../../mocks/vessels';

const vessel = mockVessels[0];

vi.mock('naive-ui', async () => {
  return {
    useDialog: () => ({ create: vi.fn() }),
    useMessage: () => ({ success: vi.fn() }),
    NCard: { template: '<div class="mock-card"><slot /><slot name="header-extra" /></div>' },
    NIcon: { template: '<div class="mock-icon"></div>' },
    NTooltip: { template: '<div><slot /><slot name="trigger" /></div>' }
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
                markers: mockVessels.map(vessel => ({ ...vessel, marker: {} }))
              }
            },
          }),
        ],
        stubs: {
          'n-tooltip': true,
          'n-icon': true,
          'n-card': { template: '<div><slot /><slot name="header-extra" /></div>' },
          'VesselFormModal': true,
        }
      }
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
});
