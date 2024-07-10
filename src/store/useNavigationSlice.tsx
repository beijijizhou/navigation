
import { StateCreator } from 'zustand';
import { locationType, originLocationType } from '../Type';
export enum NavigationStatus {
  NotStarted = 'not started',
  InProgress = 'in progress',
  Completed = 'completed',
}
export interface NavigationSlice {
  origin: originLocationType;
  destination: locationType;
  navigationServiceStatus: NavigationStatus;
  setOrigin: (newOrigin: originLocationType) => void;
  setDestination: (newDestination: locationType) => void;
  setNavigationServiceStatus:(status: NavigationStatus) => void;
}

export const createNavigationSlice: StateCreator<NavigationSlice, [], []> = (set) => ({
  origin: null,
  destination: "",
  navigationServiceStatus: NavigationStatus.NotStarted,
  setOrigin: (newOrigin: originLocationType) => set({ origin: newOrigin }),
  setDestination: (newDestination: locationType) => set({ destination: newDestination }),
  setNavigationServiceStatus:(newStatus: NavigationStatus) => set({navigationServiceStatus: newStatus})
});
