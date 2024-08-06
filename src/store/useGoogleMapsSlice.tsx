import { StateCreator } from 'zustand';

export interface GoogleMapsSlice {
  map: google.maps.Map | null;
  mapsLib: google.maps.MapsLibrary | null;
  routesLib: google.maps.RoutesLibrary | null;
  markerLib: google.maps.MarkerLibrary | null;
  directionsRenderers: google.maps.DirectionsRenderer | null;
  currentDirectionsRoute: google.maps.DirectionsRoute | null;
  latLngLiteralArray: google.maps.LatLngLiteral[];
  zoomLevel: number;

  setDirectionsRenderers: (renderer: google.maps.DirectionsRenderer) => void;
  setCurrentDirectionsRoute: (route: google.maps.DirectionsRoute) => void;
  setLatLngLiteralArray: (array: google.maps.LatLngLiteral[]) => void;
  setZoomLevel: (level: number) => void;

}

export const createGoogleMapsSlice: StateCreator<GoogleMapsSlice, [], []> = (set) => ({
  map: null,
  mapsLib: null,
  routesLib: null,
  markerLib: null,
  directionsRenderers: null,
  currentDirectionsRoute: null,
  latLngLiteralArray: [],
  currentPosition: null,
  zoomLevel: 15,
  setDirectionsRenderers: (renderer: google.maps.DirectionsRenderer) => set({ directionsRenderers: renderer }),
  setCurrentDirectionsRoute: (route: google.maps.DirectionsRoute) => set({ currentDirectionsRoute: route }),
  setLatLngLiteralArray: (array: google.maps.LatLngLiteral[]) => set({ latLngLiteralArray: array }),
  setZoomLevel: (level) => set({ zoomLevel: level }),

});

