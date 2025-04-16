import * as VesselService from '../services/vessel-service';
import type { Socket, Server } from 'socket.io';
import type { Vessel } from '../../../shared/types/vessel';

export default function socketHandlers(socket: Socket, io: Server) {
  socket.on('vessel:add', async (vesselData: Vessel) => {
    try {
      const { name, latitude, longitude } = vesselData;
      const newVessel = await VesselService.createVessel(name, latitude, longitude);

      if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
        socket.emit('error', { message: 'Invalid latitude or longitude' });
        return;
      }

      io.emit('vessel:add', newVessel);
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message === 'A vessel with this name already exists') {
          socket.emit('error', { message: 'A vessel with this name already exists' });
          return;
        }
      }
      console.error('Error adding vessel:', error);
      socket.emit('error', { message: 'Failed to add vessel' });
    }
  });

  socket.on('vessel:update', async (vesselData: Vessel) => {
    try {
      const { id, name, latitude, longitude } = vesselData;

      const updatedVessel = await VesselService.updateVessel(
        id,
        name,
        latitude,
        longitude
      );
      if (!updatedVessel) {
        socket.emit('error', { message: 'Vessel not found' });
        return;
      }

      if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
        socket.emit('error', { message: 'Invalid latitude or longitude' });
        return;
      }

      io.emit('vessel:update', updatedVessel);
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message === 'A vessel with this name already exists') {
          socket.emit('error', { message: 'A vessel with this name already exists' });
          return;
        }
      }
      console.error('Error updating vessel:', error);
      socket.emit('error', { message: 'Failed to update vessel' });
    }
  });

  socket.on('vessel:delete', async (vesselData: Vessel) => {
    try {
      const { id } = vesselData;
      const deletedVessel = await VesselService.deleteVessel(id);

      if (!deletedVessel) {
        socket.emit('error', { message: 'Vessel not found' });
        return;
      }

      io.emit('vessel:delete', deletedVessel.id);
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message === 'Vessel not found') {
          socket.emit('error', { message: 'Vessel not found' });
          return;
        }
      }
      console.error('Error deleting vessel:', error);
      socket.emit('error', { message: 'Failed to delete vessel' });
    }
  });
}
