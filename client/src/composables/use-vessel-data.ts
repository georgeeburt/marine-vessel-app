import { useVesselStore } from '../stores/vessel-store';

export const useVesselData = async () => {
  const vesselStore = useVesselStore();

  try {
    const response = await fetch(import.meta.env.VITE_API_URL + '/api/vessels');
    const data = await response.json();

    vesselStore.vessels = data;
  } catch (error) {
    console.error('Error fetching vessel data:', error);
    throw new Error('Failed to fetch vessel data');
  }
};
