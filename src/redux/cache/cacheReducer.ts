import { PayloadAction } from '@reduxjs/toolkit';
import { ACTIONS } from '../../constants/constants';

interface AppState {
  devicesInfo: Record<string, any> | null;
}

const initialState: AppState = {
  devicesInfo: null,
};

const cacheReducer = (state = initialState, action: PayloadAction<any>) => {
  switch (action.type) {
    case ACTIONS.CACHE.GET_DEVICES_INFO:
      return { ...state, devicesInfo: action.payload };
    default:
      return state;
  }
};
export default cacheReducer;
