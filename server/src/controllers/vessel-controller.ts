import { Request, Response } from 'express';
import { getAllVessels } from '../services/vessel-service';

export const getVesselsController = async (req: Request, res: Response) => {
  try {
    const vessels = await getAllVessels();
    res.status(200).json(vessels);
  } catch (error) {
    console.error('Error retrieving vessels:', error);
    res.status(500).json({ error: 'Unable to retrieve vessels' });
  }
};
