
import { StateCreator } from 'zustand';
import { locationType, originLocationType } from '../Type';

export interface NavigationSlice {
  origin: originLocationType
  destination: locationType;
  setOrigin: (newOrigin: originLocationType) => void;
  setDestination: (newDestination: locationType) => void;
}

export const createNavigationSlice: StateCreator<NavigationSlice, [], []> = (set) => ({
  origin: null,
  destination: "",
  setOrigin: (newOrigin: originLocationType) => set({ origin: newOrigin }),
  setDestination: (newDestination: locationType) => set({ destination: newDestination }),
});
