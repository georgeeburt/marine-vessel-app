/// <reference types="@types/google.maps" />
import { vi } from "vitest";

export const createMockGoogleMarker = () =>
  ({
    setMap: vi.fn(),
    position: { lat: 0, lng: 0 },
  }) as unknown as google.maps.marker.AdvancedMarkerElement;