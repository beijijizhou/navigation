/* eslint-disable @typescript-eslint/no-unused-vars */
import { StateCreator } from 'zustand';
import { Geometry, LandMarkGeometry, LandmarkType, originLocationType, } from '../Type';
import { NavigationSlice } from './useNavigationSlice';
import { getIntersectedSideWalkGeometry, isPointIntersectingMultiPolygon, plotGeometry } from '../utils/geometryUtil';
import { getSidewalkFeaturesInRange } from '../apis/fetchData';
import { plotSideWalkInMarkers } from '../utils/plot';
export interface LandMarksSlice {
    currentSideWalkGeometry: Geometry | undefined,
    sideWalkGeometryArray: Geometry[] | undefined;
    landMarksGeometryArray: LandMarkGeometry[] | undefined;
    geometryArray: Geometry[] | undefined;
    setGeometryArray: (newGeometryArray: Geometry[]) => void;
    updateLandmarks: (origin: originLocationType) => Promise<void>;
    updateGeometry: (origin: originLocationType) => Promise<void>;
}

export const createLandMarksSlice: StateCreator<LandMarksSlice & NavigationSlice, [], [], LandMarksSlice> = (set, get) => ({
    currentSideWalkGeometry: undefined,
    geometryArray: undefined,
    sideWalkGeometryArray: undefined,
    landMarksGeometryArray: undefined,
    setGeometryArray: (newGeometryArray: Geometry[]) => {
        const newSideWalkGeometryArray = []
        const newlandMarksGeometryArray = []
        for (const geometry of newGeometryArray) {

            if (geometry.landmarkType === LandmarkType.Sidewalk) {
                newSideWalkGeometryArray.push(geometry);
                // plotGeometry(geometry)
                // plotSideWalkInMarkers(geometry.coordinates[0][0])
            }
            else if (geometry.landmarkType !== LandmarkType.Building) {
                newlandMarksGeometryArray.push(geometry as unknown as LandMarkGeometry);
            }
        }

        set({ sideWalkGeometryArray: newSideWalkGeometryArray, landMarksGeometryArray: newlandMarksGeometryArray });
        set({ currentSideWalkGeometry: getIntersectedSideWalkGeometry() })

    },
    updateGeometry: async (origin) => {
        const { setGeometryArray, currentSideWalkGeometry } = get()
        if (currentSideWalkGeometry && isPointIntersectingMultiPolygon(origin, currentSideWalkGeometry)) return
        if (!currentSideWalkGeometry || !getIntersectedSideWalkGeometry()) {

            const newGeometryArray = await getSidewalkFeaturesInRange(origin as google.maps.LatLngLiteral)
            setGeometryArray(newGeometryArray)
            console.log(newGeometryArray.length)
        }



    },
    updateLandmarks: async (origin) => {
        const { updateGeometry } = get()
        await updateGeometry(origin)
        const { currentSideWalkGeometry } = get()
        console.log(currentSideWalkGeometry)
    },
});