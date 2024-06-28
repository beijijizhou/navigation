import { create} from 'zustand';
import { createDestinationSlice, DestinationSlice} from './useDestinationSlice';

const useStore = create<DestinationSlice>()((...a) => ({
  ...createDestinationSlice(...a),
  
}))
export default useStore;

