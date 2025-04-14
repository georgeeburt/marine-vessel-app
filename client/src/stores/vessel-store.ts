import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Vessel } from '@shared/types/vessel';

export const useVesselStore = defineStore('vessel', () => {
  const vessels = ref<Vessel[]>([]);

  const addVessel = (vessel: Vessel) => {
    vessels.value.push(vessel);
  };

  const updateVessel = (updatedVessel: Vessel) => {
    const index = vessels.value.findIndex((vessel) => vessel.id === updatedVessel.id);
    if (index !== -1) vessels.value[index] = updatedVessel;
  };

  const deleteVessel = (vesselId: number) => {
    vessels.value = vessels.value.filter((vessel) => vessel.id !== vesselId);
  };

  return {
    vessels,
    addVessel,
    updateVessel,
    deleteVessel,
  };
});
