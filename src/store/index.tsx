import { create } from 'zustand';
import { createNavigationSlice, NavigationSlice } from './useNavigationSlice';
import { GoogleMapsSlice, createGoogleMapsSlice } from './useGoogleMapsSlice';
import { LandMarksSlice, createLandMarksSlice } from './useLandMarksSlice';

const useStore = create<NavigationSlice & GoogleMapsSlice & LandMarksSlice>()((...a) => ({
  ...createNavigationSlice(...a),
  ...createGoogleMapsSlice(...a),
  ...createLandMarksSlice(...a),
}))
export default useStore;


