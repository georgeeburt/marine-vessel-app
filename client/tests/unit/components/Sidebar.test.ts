import { createTestingPinia } from '@pinia/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/vue';
import { mockVessels } from '../../mocks/vessels';
import Sidebar from '../../../src/components/sidebar/Sidebar.vue';
import VesselList from '../../../src/components/sidebar/VesselList.vue';
import VesselListItem from '../../../src/components/sidebar/VesselListItem.vue';

vi.mock('../../../src/composables/use-socket', () => ({
  useSocket: () => ({
    emitDeleteVessel: vi.fn(),
    listenToVesselEvents: vi.fn()
  })
}));

vi.mock('../../../src/components/map/map-instance', () => ({
  map: { panTo: vi.fn(), setZoom: vi.fn() }
}));


vi.mock('naive-ui', async () => {

  return {
    NDialogProvider: vi.fn(),
    NMessageProvider: vi.fn(),
    NConfigProvider: vi.fn(),
    NInput: vi.fn(),
    NButton: vi.fn(),
    NIcon: vi.fn(),
    NCard: vi.fn(),
    NModal: vi.fn(),
    useDialog: () => ({
      create: vi.fn(),
      destroyAll: vi.fn(),
      error: vi.fn(),
      info: vi.fn(),
      success: vi.fn(),
      warning: vi.fn()
    }),
    useMessage: () => ({
      error: vi.fn(),
      info: vi.fn(),
      loading: vi.fn(),
      success: vi.fn(),
      warning: vi.fn()
    })
  };
});

describe('Sidebar', () => {
  beforeEach(() => {

    const TestWrapper = {
      components: {
        Sidebar,
        VesselList,
        VesselListItem
      },
      template: '<Sidebar />'
    };

    render(TestWrapper, {
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
          'n-dialog-provider': true,
          'n-message-provider': true,
          'n-config-provider': true,
          'n-input': true,
          'n-button': true,
          'VesselList': false,
          'VesselListItem': false,
          'VesselFormModal': false,
        },
      },
    });
  });

  it('should display the correct vessel count', () => {
    expect(screen.getByText(`Tracked Vessels (${mockVessels.length})`)).toBeTruthy();
  });

  // it('should render vessel names', () => {
  //   mockVessels.forEach(vessel => {
  //     expect(screen.getByText(vessel.name)).toBeTruthy();
  //   });
  // });
});
