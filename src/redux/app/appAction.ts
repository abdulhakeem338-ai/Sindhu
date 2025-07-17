import { ACTIONS } from "../../constants/constants";

const setUser = (data: Record<string, any> | null) => {
  return {
    type: ACTIONS.APP.SET_USER,
    payload: data,
  };
};

const setToken = (data: string | null) => {
  return {
    type: ACTIONS.APP.SET_TOKEN,
    payload: data,
  };
};

export { setUser, setToken }; 