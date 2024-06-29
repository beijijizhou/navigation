import { create} from 'zustand';
import { createDestinationSlice, DestinationSlice} from './useDestinationSlice';
import { GoogleMapsSlice, createGoogleMapsSlice } from './useGoogleMapsSlice';
const useStore = create<DestinationSlice & GoogleMapsSlice>()((...a) => ({
  ...createDestinationSlice(...a),
  ...createGoogleMapsSlice(...a)
}))
export default useStore;
// const useStore = create((...a) => ({
//   ...createDestinationSlice(...a),
//   ...createGoogleMapsSlice(...a)
// }))
// export default useStore;

