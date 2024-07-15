
import { StateCreator } from 'zustand';
import { locationType, originLocationType } from '../Type';
import { calculateDistanceToCurrentEndLocation, createDurationTableInSecs, calculateDurationToCurrentEndLocation, calculateRemainingTime,convertTime } from '../utils/broadCastUtil/calculation';
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
  durationTable: Array<number> | undefined;
  remainingTime: string | undefined;
  setOrigin: (newOrigin: originLocationType) => void;
  setDestination: (newDestination: locationType) => void;
  setNavigationServiceStatus: (status: NavigationStatus) => void;
  setStepIndex: (newIndex: number) => void;
  setLegs: (legs: google.maps.DirectionsLeg) => void;
  setCurrentEndLocation: (location: originLocationType) => void;
  setDurationTable: (table: Array<number>) => void;
  setRemainingTime: (time: string) => void;
}

export const createNavigationSlice: StateCreator<NavigationSlice, [], []> = (set, get) => ({
  origin: null,
  destination: "",
  stepIndex: 0,
  navigationServiceStatus: NavigationStatus.NotStarted,
  legs: undefined,
  currentEndLocation: undefined,
  distanceToCurrentEndLocation: 0,
  durationTable: undefined,
  remainingTime: undefined,
  setOrigin: (newOrigin: originLocationType) => {
    set({ origin: newOrigin })
    const { currentEndLocation, durationTable, stepIndex } = get()
    if (currentEndLocation) {
      const distance = calculateDistanceToCurrentEndLocation(currentEndLocation, newOrigin as google.maps.LatLngLiteral);
      set({ distanceToCurrentEndLocation: distance });
      const seconds = calculateDurationToCurrentEndLocation(distance);
      const remainingTime = convertTime(calculateRemainingTime(stepIndex, seconds, durationTable!))

      set({remainingTime})
    }
  },
  setDestination: (newDestination: locationType) => { set({ destination: newDestination }) },
  setNavigationServiceStatus: (newStatus: NavigationStatus) => set({ navigationServiceStatus: newStatus }),
  setStepIndex: (newIndex: number) => set({ stepIndex: newIndex }),

  setLegs: (legs) => {
    const durationTable = createDurationTableInSecs(legs);
    set({ legs, durationTable })
  },
  setCurrentEndLocation: (location) => set({ currentEndLocation: location }),
  setDurationTable: (table: Array<number>) => set({ durationTable: table }),
  setRemainingTime: (newRemainingTime: string) => set({ remainingTime: newRemainingTime }),
});
