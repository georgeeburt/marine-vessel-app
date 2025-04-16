export interface Vessel {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export type NewVessel = Omit<Vessel, 'id'>;
