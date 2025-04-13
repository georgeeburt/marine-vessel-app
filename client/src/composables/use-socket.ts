import { io } from 'socket.io-client';
import { useVesselStore } from '@/stores/vessel-store';
import type { Vessel } from '@shared/types/vessel';

export const useSocket = () => {
  const socket = io(import.meta.env.VITE_SOCKET_URL);
  const vesselStore = useVesselStore();

  const listenToVesselEvents = () => {
    socket.on('vessel:add', (vessel) => {
      vesselStore.addVessel(vessel);
    });

    socket.on('vessel:update', (updatedVessel) => {
      vesselStore.updateVessel(updatedVessel);
    });

    socket.on('vessel:delete', (vesselId) => {
      vesselStore.deleteVessel(vesselId);
    });
  }

  const emitAddVessel = (vesselData: Vessel) => {
    socket.emit('vessel:add', vesselData);
  };

  const emitUpdateVessel = (vesselData: Vessel) => {
    socket.emit('vessel:update', vesselData);
  };

  const emitDeleteVessel = (vesselData: Vessel) => {
    socket.emit('vessel:delete', vesselData);
  };
  const disconnect = () => {
    socket.disconnect();
  }
  return {
    listenToVesselEvents,
    emitAddVessel,
    emitUpdateVessel,
    emitDeleteVessel,
    disconnect
  }
}
