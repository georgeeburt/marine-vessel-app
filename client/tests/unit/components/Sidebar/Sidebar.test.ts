import { describe, it, expect, vi, afterEach } from 'vitest';
import { fireEvent } from '@testing-library/vue';
import { renderWithSetup } from '../../../helpers/render-helper';
import { mockVesselMarkers } from '../../../mocks/markers';
import { mockVessels } from '../../../mocks/vessels';
import { naiveUIMocks, resetNaiveUIMocks } from '../../../mocks/components/naive-ui-mocks';
import {
  mockVesselFormModal,
  resetVesselFormModalMocks,
} from '../../../mocks/components/vessel-form-modal-mock';
import Sidebar from '../../../../src/components/sidebar/Sidebar.vue';

vi.mock('naive-ui', () => naiveUIMocks);
mockVesselFormModal();

describe('Sidebar component', () => {
  afterEach(() => {
    resetNaiveUIMocks();
    resetVesselFormModalMocks();
  });

  it('should render the vessel list component', () => {
    renderWithSetup(Sidebar, {
      stores: {
        vessel: { vessels: mockVessels },
        marker: { markers: mockVesselMarkers },
      },
    });

    const vesselList = document.querySelector('.vessel-list');
    expect(vesselList).toBeTruthy();
  });

  it('should emit open-modal event when Add Vessel button is clicked', () => {
    const result = renderWithSetup(Sidebar, {
      stores: {
        vessel: { vessels: mockVessels },
        marker: { markers: mockVesselMarkers },
      },
    });

    const addButton = document.querySelector('.add-button');
    expect(addButton).toBeTruthy();

    addButton?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(result.emitted()).toHaveProperty('open-modal');
  });

  it('should filter for vessels when search input is changed', async () => {
    renderWithSetup(Sidebar, {
      stores: {
        vessel: { vessels: mockVessels },
        marker: { markers: mockVesselMarkers },
      },
    });

    const initialVesselItems = document.querySelectorAll('.vessel-card');
    expect(initialVesselItems.length).toBe(mockVessels.length);

    const searchInput = document.querySelector('.search') as HTMLInputElement;
    expect(searchInput).toBeTruthy();

    await fireEvent.update(searchInput, 'atlantic');

    await new Promise((resolve) => setTimeout(resolve, 0));

    const filteredVesselItems = document.querySelectorAll('.vessel-card');
    expect(filteredVesselItems.length).toBe(1);
    expect(filteredVesselItems[0].getAttribute('title')).toContain('Atlantic Explorer');

    await fireEvent.update(searchInput, '');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const resetVesselItems = document.querySelectorAll('.vessel-card');
    expect(resetVesselItems.length).toBe(mockVessels.length);
  });
});
