import { create } from 'zustand';
import { createNavigationSlice, NavigationSlice } from './useNavigationSlice';
import { GoogleMapsSlice, createGoogleMapsSlice } from './useGoogleMapsSlice';
const useStore = create<NavigationSlice & GoogleMapsSlice>()((...a) => ({
  ...createNavigationSlice(...a),
  ...createGoogleMapsSlice(...a)
}))
export default useStore;


