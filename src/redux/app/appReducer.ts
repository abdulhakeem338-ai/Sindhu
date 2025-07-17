import { PayloadAction } from '@reduxjs/toolkit';
import { ACTIONS } from '../../constants/constants';

interface AppState {
  user: Record<string, any> | null;
  token: string | null;
}

const initialState: AppState = {
  user: null,
  token: null,
};

const appReducer = (state = initialState, action: PayloadAction<any>) => {
  switch (action.type) {
    case ACTIONS.APP.SET_USER:
      return { ...state, user: action.payload };
    case ACTIONS.APP.SET_TOKEN:
      return { ...state, token: action.payload };
    case ACTIONS.APP.SET_LOGOUT:
      return { ...state, user: null, token: null };
    default:
      return state;
  }
};
export default appReducer;
