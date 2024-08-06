/* eslint-disable @typescript-eslint/no-unused-vars */
import { StateCreator } from 'zustand';
import { Geometry, LandmarkType } from '../Type';
import { NavigationSlice } from './useNavigationSlice';
import { getCurrentSideWalk } from '../utils/geometryUtil';
export interface LandMarksSlice {
    currentSideWalks: Geometry | undefined,
    sideWalkGeometryArray: Geometry[] | undefined;
    landMarksGeometryArray: Geometry[] | undefined;
    geometryArray : Geometry[] | undefined;
    setGeometryArray: (newGeometryArray: Geometry[]) => void;
}

export const createLandMarksSlice: StateCreator<LandMarksSlice & NavigationSlice, [], [], LandMarksSlice> = (set) => ({
    currentSideWalks: undefined,
    geometryArray: undefined,
    sideWalkGeometryArray: undefined,
    landMarksGeometryArray: undefined,
    setGeometryArray: (newGeometryArray: Geometry[]) => {
        const newSideWalkGeometryArray = []
        const newlandMarksGeometryArray = []
        for (const geometry of newGeometryArray) {
            if (geometry.landmarkType === LandmarkType.Sidewalk) {
                newSideWalkGeometryArray.push(geometry);
            }
            if (geometry.landmarkType !== LandmarkType.Building) {
                newlandMarksGeometryArray.push(geometry);
            }
        }

        set({ sideWalkGeometryArray: newSideWalkGeometryArray, landMarksGeometryArray: newlandMarksGeometryArray });
        const currentSideWalks = getCurrentSideWalk()
        
        if (currentSideWalks) {
            set({ currentSideWalks: currentSideWalks })
        }
    },

});