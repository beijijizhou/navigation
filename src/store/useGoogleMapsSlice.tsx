
import { StateCreator } from 'zustand';
import { location } from '../Type';

export interface GoogleMapsSlice {
    Map: google.maps.Map | null;
    setMap: (newMap: google.maps.Map) => void;
    currentPosition: location | null;
}

export const createGoogleMapsSlice: StateCreator<GoogleMapsSlice, [], []> = (set) => ({
    Map: null,
    currentPosition: null,
    setMap: (newMap: google.maps.Map) => set({ Map: newMap }),
    setCurrentPosition: (newPosition: location) => set({ currentPosition: newPosition }),
});
