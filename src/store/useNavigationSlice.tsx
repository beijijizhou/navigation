
import { StateCreator } from 'zustand';
import { locationType, originLocationType } from '../Type';
import { calculateDistanceToCurrentEndLocation } from '../utils/broadCastUtil/calculation';
export enum NavigationStatus {
  NotStarted = 'not started',
  InProgress = 'in progress',
  Completed = 'completed',
}
export interface NavigationSlice {
  origin: originLocationType;
  destination: locationType;
  navigationServiceStatus: NavigationStatus;
  stepIndex: number;
  legs: google.maps.DirectionsLeg | undefined;
  currentEndLocation: originLocationType;
  distanceToCurrentEndLocation: number,
  setOrigin: (newOrigin: originLocationType) => void;
  setDestination: (newDestination: locationType) => void;
  setNavigationServiceStatus: (status: NavigationStatus) => void;
  setStepIndex: (newIndex: number) => void;
  setLegs: (legs: google.maps.DirectionsLeg) => void;
  setCurrentEndLocation: (location: originLocationType) => void;
}

export const createNavigationSlice: StateCreator<NavigationSlice, [], []> = (set, get) => ({
  origin: null,
  destination: "",
  stepIndex: 0,
  navigationServiceStatus: NavigationStatus.NotStarted,
  legs: undefined,
  currentEndLocation: undefined,
  distanceToCurrentEndLocation: 0,
  setOrigin: (newOrigin: originLocationType) => {
    set({ origin: newOrigin })
    const { currentEndLocation } = get()
    if (currentEndLocation) {
      const distance = calculateDistanceToCurrentEndLocation(currentEndLocation, newOrigin as google.maps.LatLngLiteral);
      set({ distanceToCurrentEndLocation: distance });
    }
  },
  setDestination: (newDestination: locationType) => { set({ destination: newDestination }) },
  setNavigationServiceStatus: (newStatus: NavigationStatus) => set({ navigationServiceStatus: newStatus }),
  setStepIndex: (newIndex: number) => set({ stepIndex: newIndex }),
  setLegs: (legs) => set({ legs }),
  setCurrentEndLocation: (location) => set({ currentEndLocation: location }),
});
