import { describe, it, expect, vi, afterEach } from 'vitest';
import { fireEvent } from '@testing-library/vue';
import { renderWithSetup } from '../../helpers/render-helper';
import { resetNaiveUIMocks } from '../../mocks/components/naive-ui-mocks';
import { naiveUIMocks } from '../../mocks/components/naive-ui-mocks';
import {
  mockSocket,
  resetSocketMocks,
  mockEmitAddVessel,
  mockEmitUpdateVessel,
} from '../../mocks/composables/use-socket-mock';
import VesselFormModal from '../../../src/components/ui/VesselFormModal.vue';
import { mockVessels, mockVessel } from '../../mocks/data/vessels';

vi.mock('naive-ui', () => naiveUIMocks);
mockSocket();

describe('VesselFormModal component', () => {
  afterEach(() => {
    resetNaiveUIMocks();
    resetSocketMocks();
    vi.restoreAllMocks();
  });

  it('should render the VesselFormModal title', () => {
    const { getByText } = renderWithSetup(VesselFormModal, {
      props: { show: true },
    });

    const title = getByText('Track New Vessel');
    expect(title).toBeTruthy();
  });

  it('should populate the form with the correct data when editing a vessel', () => {
    renderWithSetup(VesselFormModal, {
      props: {
        show: true,
        vessel: mockVessel,
      },
    });

    const nameInput = document.querySelector('.mock-input');
    expect(nameInput?.getAttribute('value')).toBe(mockVessel.name);
  });

  it('should restrict the user from tracking a vessel with an existing vessel name', async () => {
    mockEmitAddVessel.mockClear();

    const { getByText } = renderWithSetup(VesselFormModal, {
      props: { show: true },
      stores: {
        vessel: {
          vessels: [mockVessel],
        },
      },
    });

    const nameInput = document.querySelector('.mock-input') as HTMLInputElement;
    const latitudeInput = document.querySelector(
      '.mock-input-number'
    ) as HTMLInputElement;
    const longitudeInput = document.querySelectorAll(
      '.mock-input-number'
    )[1] as HTMLInputElement;

    await fireEvent.update(nameInput, mockVessel.name);
    await fireEvent.update(latitudeInput, '45.5');
    await fireEvent.update(longitudeInput, '-122.6');

    const trackButton = getByText('Track Vessel');
    await fireEvent.click(trackButton);

    expect(mockEmitAddVessel).not.toHaveBeenCalled();
  });

  it("should emitAddVessel when the 'track vessel' button is clicked", async () => {
    const { getByText } = renderWithSetup(VesselFormModal, {
      props: { show: true },
    });

    const nameInput = document.querySelector('.mock-input') as HTMLInputElement;
    const latitudeInput = document.querySelector(
      '.mock-input-number'
    ) as HTMLInputElement;
    const longitudeInput = document.querySelectorAll('.mock-input-number')[1];

    await fireEvent.update(nameInput, mockVessel.name);
    await fireEvent.update(latitudeInput, mockVessel.latitude.toString());
    await fireEvent.update(longitudeInput, mockVessel.longitude.toString());

    const trackButton = getByText('Track Vessel');
    await fireEvent.click(trackButton);

    await vi.waitFor(() => {
      expect(mockEmitAddVessel).toHaveBeenCalledWith({
        name: mockVessel.name.toLowerCase(),
        latitude: mockVessel.latitude,
        longitude: mockVessel.longitude,
      });
    });
  });

  it("should emitUpdateVessel when the 'update vessel' button is clicked", async () => {
    const { getByText } = renderWithSetup(VesselFormModal, {
      props: {
        show: true,
        vessel: mockVessel,
      },
    });

    const nameInput = document.querySelector('.mock-input') as HTMLInputElement;
    const latitudeInput = document.querySelector(
      '.mock-input-number'
    ) as HTMLInputElement;
    const longitudeInput = document.querySelectorAll('.mock-input-number')[1];

    await fireEvent.update(nameInput, mockVessel.name);
    await fireEvent.update(latitudeInput, mockVessel.latitude.toString());
    await fireEvent.update(longitudeInput, mockVessel.longitude.toString());

    const updateButton = getByText('Update Vessel');
    await fireEvent.click(updateButton);

    await vi.waitFor(() => {
      expect(mockEmitUpdateVessel).toHaveBeenCalledWith({
        id: mockVessel.id,
        name: mockVessel.name.toLowerCase(),
        latitude: mockVessel.latitude,
        longitude: mockVessel.longitude,
      });
    });
  });

  it("should emit update:show with false when the 'track vessel' button is clicked", async () => {
    const { emitted, getByText } = renderWithSetup(VesselFormModal, {
      props: { show: true },
    });

    const nameInput = document.querySelector('.mock-input') as HTMLInputElement;
    const latitudeInput = document.querySelector(
      '.mock-input-number'
    ) as HTMLInputElement;
    const longitudeInput = document.querySelectorAll('.mock-input-number')[1];

    await fireEvent.update(nameInput, mockVessel.name);
    await fireEvent.update(latitudeInput, mockVessel.latitude.toString());
    await fireEvent.update(longitudeInput, mockVessel.longitude.toString());

    const trackButton = getByText('Track Vessel');
    await fireEvent.click(trackButton);

    await vi.waitFor(() => {
      expect(emitted()).toHaveProperty('update:show');
      expect(emitted()['update:show'][0]).toEqual([false]);
    });
  });

  it("should emit update:show with false when the 'cancel' button is clicked", () => {
    const { emitted, getByText } = renderWithSetup(VesselFormModal, {
      props: { show: true },
    });

    const cancelButton = getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(emitted()).toHaveProperty('update:show');
    expect(emitted()['update:show'][0]).toEqual([false]);
  });
});
