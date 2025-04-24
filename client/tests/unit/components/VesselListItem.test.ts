import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { renderWithSetup } from '../../helpers/render-helper';
import { mockVessels } from '../../mocks/vessels';
import { mockVesselMarkers } from '../../mocks/markers';
import { mockDialogCreate, naiveUIMocks, resetNaiveUIMocks } from '../../mocks/components/naive-ui-mocks';
import { mockVesselFormModal, resetVesselFormModalMocks } from '../../mocks/components/vessel-form-modal-mock';
import VesselListItem from '../../../src/components/sidebar/VesselListItem.vue';

const vessel = mockVessels[0];

vi.mock('naive-ui', () => naiveUIMocks);
mockVesselFormModal();

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
    resetVesselFormModalMocks();
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

  it('should open edit modal on edit icon click', async () => {
    const editIcon = document.querySelector('.edit-icon');
    expect(editIcon).toBeTruthy();

    await editIcon?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    const modalStub = document.querySelector('vessel-form-modal-stub');
    expect(modalStub).toBeTruthy();

    expect(modalStub?.getAttribute('show')).toBe('true');
  });

  it('should open confirmation dialog on delete icon click', () => {
    const deleteIcon = document.querySelector('.delete-icon');

    deleteIcon?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(mockDialogCreate).toHaveBeenCalled();
  });
});
