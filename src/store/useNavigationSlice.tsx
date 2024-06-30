
import { StateCreator } from 'zustand';
import { location } from '../Type';

export interface NavigationSlice {
  origin: location;
  destination: location;
  setOrigin: (newOrigin: location) => void;
  setDestination: (newDestination: location) => void;
}

export const createNavigationSlice: StateCreator<NavigationSlice, [], []> = (set) => ({
  origin: "",
  destination: "",
  setOrigin: (newOrigin: location) => set({ destination: newOrigin }),
  setDestination: (newDestination: location) => set({ destination: newDestination }),
});
