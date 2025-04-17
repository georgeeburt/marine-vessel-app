import { io } from 'socket.io-client';
import { map } from '@/components/map/map-instance';
import { useVesselStore } from '@/stores/vessel-store';
import { useMarkerStore } from '@/stores/marker-store';
import type { Vessel, NewVessel } from '@shared/types/vessel';

export const useSocket = () => {
  const socket = io(import.meta.env.VITE_API_URL);
  const vesselStore = useVesselStore();
  const markerStore = useMarkerStore();

  const listenToVesselEvents = () => {
    socket.on('vessel:add', (vessel) => {
      vesselStore.addVessel(vessel);
    });

    socket.on('vessel:update', (updatedVessel) => {
      vesselStore.updateVessel(updatedVessel);
      const existingMarker = markerStore.markers.find(
        (marker) => marker.id === updatedVessel.id
      );

      if (existingMarker) {
        existingMarker.marker.position = {
          lat: updatedVessel.latitude,
          lng: updatedVessel.longitude,
        };
        markerStore.updateMarker({
          ...updatedVessel,
          marker: existingMarker.marker,
        });
      }

      markerStore.updateMarker({
        ...updatedVessel,
        marker: new google.maps.marker.AdvancedMarkerElement({
          position: { lat: updatedVessel.latitude, lng: updatedVessel.longitude },
          map: map.value,
          title: updatedVessel.name,
        }),
      });
    });

    socket.on('vessel:delete', (vesselId) => {
      vesselStore.deleteVessel(vesselId);
      markerStore.deleteMarker(vesselId);
    });
  };

  const emitAddVessel = (vesselData: NewVessel) => {
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
  };

  return {
    listenToVesselEvents,
    emitAddVessel,
    emitUpdateVessel,
    emitDeleteVessel,
    disconnect,
  };
};
