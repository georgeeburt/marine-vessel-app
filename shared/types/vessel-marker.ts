import type { Vessel } from './vessel';

export interface VesselMarker extends Vessel {
  marker: google.maps.marker.AdvancedMarkerElement;
}
