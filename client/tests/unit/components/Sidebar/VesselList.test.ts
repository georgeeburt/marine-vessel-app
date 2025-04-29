import { ref, SetupContext } from 'vue';
import { cleanup } from '@testing-library/vue';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderWithSetup } from '../../../helpers/render-helper';
import { mockVessels } from '../../../mocks/data/vessels';
import { mockVesselMarkers } from '../../../mocks/data/markers';
import {
  naiveUIMocks,
  resetNaiveUIMocks,
} from '../../../mocks/components/naive-ui-mocks';
import VesselList from '../../../../src/components/sidebar/VesselList.vue';

vi.mock('naive-ui', () => naiveUIMocks);

describe('VesselList component', () => {
  beforeEach(() => {
    renderWithSetup(VesselList, {
      stores: {
        vessel: { vessels: mockVessels },
        marker: { markers: mockVesselMarkers },
      },
      global: {
        stubs: {
          'n-dialog-provider': {
            template: '<div class="dialog-provider-stub"><slot /></div>',
          },
          'n-message-provider': {
            template: '<div class="message-provider-stub"><slot /></div>',
          },
        },
      },
    });
  });

  afterEach(() => resetNaiveUIMocks());

  it('should render the VesselList component title', () => {
    const vesselListTitle = document.querySelector('.vessel-list-title');
    expect(vesselListTitle).toBeTruthy();
  });

  it('should render the correct number of vessels in the list title', () => {
    const vesselListTitle = document.querySelector('.vessel-list-title');
    expect(vesselListTitle?.textContent).toContain(mockVessels.length.toString());
  });

  it('should render the empty vessel list message when there are no vessels', () => {
    cleanup();

    const ModifiedVesselList = {
      ...VesselList,
      setup(props, context: SetupContext) {
        const originalSetup = VesselList.setup?.(props, context) || {};
        return {
          ...originalSetup,
          loading: ref(false),
        };
      },
    };

    renderWithSetup(ModifiedVesselList, {
      stores: {
        vessel: { vessels: [] },
      },
    });

    const emptyVesselListMessage = document.querySelector('.empty-message');
    expect(emptyVesselListMessage).toBeTruthy();
  });

  it('should render the correct number of vessel cards', () => {
    const vesselCards = document.querySelectorAll('.vessel-card');
    expect(vesselCards.length).toBe(mockVessels.length);
  });
});
