import { StateCreator } from 'zustand';

export interface GoogleMapsSlice {
  map: google.maps.Map | null;
  mapsLib: google.maps.MapsLibrary | null;
  routesLib: google.maps.RoutesLibrary | null;
  directionsRenderers: google.maps.DirectionsRenderer | null;
  currentDirectionsRoute: google.maps.DirectionsRoute | null;
  latLngLiteralArray: google.maps.LatLngLiteral[];
  setMap: (newMap: google.maps.Map) => void;
  setMapsLib: (mapsLib: google.maps.MapsLibrary) => void;
  setRoutesLib: (routesLib: google.maps.RoutesLibrary) => void;
  setDirectionsRenderers: (renderer: google.maps.DirectionsRenderer) => void;
  setCurrentDirectionsRoute: (route: google.maps.DirectionsRoute) => void;
  setLatLngLiteralArray: (array: google.maps.LatLngLiteral[]) => void;
  
}

export const createGoogleMapsSlice: StateCreator<GoogleMapsSlice, [], []> = (set) => ({
  map: null,
  mapsLib: null,
  routesLib: null,
  directionsRenderers: null,
  currentDirectionsRoute: null,
  latLngLiteralArray: [],
  currentPosition: null,
  
  setMap: (newMap: google.maps.Map) => set({ map: newMap }),
  setMapsLib: (mapsLib: google.maps.MapsLibrary) => set({ mapsLib }),
  setRoutesLib: (routesLib: google.maps.RoutesLibrary) => set({ routesLib }),
  setDirectionsRenderers: (renderer: google.maps.DirectionsRenderer) => set({ directionsRenderers: renderer }),
  setCurrentDirectionsRoute: (route: google.maps.DirectionsRoute) => set({ currentDirectionsRoute: route }),
  setLatLngLiteralArray: (array: google.maps.LatLngLiteral[]) => set({ latLngLiteralArray: array }),
  
});

