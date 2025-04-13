export interface Vessel {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export interface NewVessel extends Omit<Vessel, 'id'> {};
