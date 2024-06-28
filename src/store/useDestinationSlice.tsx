
import { StateCreator } from 'zustand';

export interface DestinationSlice {
  destination: string;
  setDestination: (newDestination: string) => void;
}

export const createDestinationSlice: StateCreator<DestinationSlice, [], []> = (set) => ({
  destination: "",
  setDestination: (newDestination: string) => set({ destination: newDestination }),
});
