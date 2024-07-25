
import { StateCreator } from 'zustand';
import { locationType, originLocationType, LookUpTableType, Geometry } from '../Type';
import * as NavigationUtils from '../utils/navigationUtil/navigation';
import { getSidewalkFeaturesInRange } from '../apis/fetchData';
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
  distanceTable: Array<number> | undefined;
  remainingTime: string | undefined;
  remainingDistance: number;
  geometryArray: Geometry[] | undefined;
  setOrigin: (newOrigin: originLocationType) => void;
  setDestination: (newDestination: locationType) => void;
  setNavigationServiceStatus: (status: NavigationStatus) => void;
  setStepIndex: (newIndex: number) => void;
  setLegs: (legs: google.maps.DirectionsLeg) => void;
  setCurrentEndLocation: (location: originLocationType) => void;
  setDurationTable: (table: Array<number>) => void;
  setRemainingTime: (time: string) => void;
  setRemainingDistance: (distance: number) => void;
  setDistanceToCurrentEndLocation: (distance: number) => void;
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
  distanceTable: undefined,
  remainingTime: undefined,
  remainingDistance: 0,
  geometryArray: undefined,
  setOrigin: async (newOrigin: originLocationType) => {
    set({ origin: newOrigin })
    const { geometryArray, currentEndLocation, durationTable, stepIndex, legs, setDistanceToCurrentEndLocation, distanceTable } = get()
    if (!geometryArray) {
      const newGeometryArray = await getSidewalkFeaturesInRange(newOrigin as google.maps.LatLngLiteral)
      set({ geometryArray: newGeometryArray })
    }

    if (currentEndLocation && NavigationStatus.InProgress) {
      const distance = NavigationUtils.calculateDistanceToCurrentEndLocation(currentEndLocation, newOrigin as google.maps.LatLngLiteral);
      setDistanceToCurrentEndLocation(distance)
      const seconds = NavigationUtils.calculateDurationToCurrentEndLocation(distance);
      const remainingTime = NavigationUtils.convertTime(NavigationUtils.calculateRemaining(stepIndex, seconds, durationTable!))
      const remainingDistance = NavigationUtils.calculateRemaining(stepIndex, seconds, distanceTable!)
      set({ remainingTime, remainingDistance })
      if (distance < 5) {
        const newIndex = stepIndex + 1

        if (newIndex == legs!.steps.length) {
          set({ navigationServiceStatus: NavigationStatus.Completed })
          return
        }

        const currentEndLocation = NavigationUtils.getEndLocation(legs!, newIndex)
        set({ currentEndLocation, stepIndex: newIndex, })
      }
    }

  },
  setDestination: (newDestination: locationType) => {
    set({ destination: newDestination, navigationServiceStatus: NavigationStatus.NotStarted })
  },
  setNavigationServiceStatus: (newStatus: NavigationStatus) => set({ navigationServiceStatus: newStatus }),
  setStepIndex: (newIndex: number) => set({ stepIndex: newIndex }),

  setLegs: (legs) => {
    const durationTable = NavigationUtils.createLookUpTable(legs, LookUpTableType.Time);
    const distanceTable = NavigationUtils.createLookUpTable(legs, LookUpTableType.Distance);
    set({ legs, durationTable, distanceTable })
  },
  setCurrentEndLocation: (location) => set({ currentEndLocation: location }),
  setDurationTable: (table: Array<number>) => set({ durationTable: table }),
  setRemainingTime: (newRemainingTime: string) => set({ remainingTime: newRemainingTime }),
  setRemainingDistance: (newDistance: number) => set({ remainingDistance: newDistance }),

  setDistanceToCurrentEndLocation: (newDistance: number) => set({ distanceToCurrentEndLocation: newDistance }),
});
