import { ACTIONS } from "../../constants/constants";

const getDevicesInfo = (data: Record<string, any> | null) => {
  return {
      type: ACTIONS.CACHE.GET_DEVICES_INFO,
    payload: data,
  };
};

export { getDevicesInfo };