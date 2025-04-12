import { PrismaClient } from '../../prisma/generated/index';

const prisma = new PrismaClient();

export const getAllVessels = async () => {
  try {
    const vessels = await prisma.vessel.findMany();
    return vessels;
  } catch (error) {
    console.error('Error fetching vessels:', error);
    throw new Error('Could not retrieve vessels');
  }
};

export const createVessel = async (name: string, latitude: number, longitude: number) => {
  try {
    const existingVessel = await prisma.vessel.findUnique({
      where: { name },
    });

    if (existingVessel && existingVessel.name === name) {
      throw new Error('A vessel with this name already exists');
    }

    const vessel = await prisma.vessel.create({
      data: {
        name,
        latitude,
        longitude,
      },
    });
    return vessel;
  } catch (error) {
    console.error('Error creating vessel:', error);
    throw new Error('Error creating vessel');
  }
};

export async function updateVessel(
  id: number,
  name: string,
  latitude: number,
  longitude: number
) {
  try {
    const existingVessel = await prisma.vessel.findUnique({
      where: { id },
    });

    if (existingVessel && existingVessel.id !== id) {
      throw new Error('A vessel with this name already exists');
    }

    const updatedVessel = await prisma.vessel.update({
      where: { id },
      data: {
        name,
        latitude,
        longitude,
      },
    });

    return updatedVessel;
  } catch (error) {
    console.error('Error updating vessel:', error);
    throw new Error('Unable to update vessel.');
  }
}

export const deleteVessel = async (id: number) => {
  try {
    return await prisma.vessel.delete({
      where: { id },
    });
  } catch (error: any) {
    console.error('Error deleting vessel:', error);
    throw new Error(error.message || 'Error deleting vessel');
  }
};
