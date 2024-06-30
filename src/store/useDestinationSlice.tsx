
import { StateCreator } from 'zustand';
import { location } from '../Type';

export interface DestinationSlice {
  destination: location;
  setDestination: (newDestination: location) => void;
}

export const createDestinationSlice: StateCreator<DestinationSlice, [], []> = (set) => ({
  destination: "",
  setDestination: (newDestination: location) => set({ destination: newDestination }),
});
