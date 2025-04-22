import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { renderWithSetup } from '../../helpers/render-helper';
import { mockVessels } from '../../mocks/vessels';
import { mockVesselMarkers } from '../../mocks/markers';
import { mockDialogCreate, naiveUIMocks, resetNaiveUIMocks } from '../../mocks/components/naive-ui-mocks';
import VesselListItem from '../../../src/components/sidebar/VesselListItem.vue';

const vessel = mockVessels[0];

vi.mock('naive-ui', () => naiveUIMocks);

describe('VesselListItem component', () => {
  beforeEach(() => {
    renderWithSetup(VesselListItem, {
      props: { vessel },
      stores: {
        vessel: { vessels: mockVessels },
        marker: { markers: mockVesselMarkers },
      }
    });
  });

  afterEach(() => {
    resetNaiveUIMocks();
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

  it('should open confirmation dialog on delete icon click', () => {
    const deleteIcon = document.querySelector('.delete-icon');

    deleteIcon?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(mockDialogCreate).toHaveBeenCalled();
  });
});
