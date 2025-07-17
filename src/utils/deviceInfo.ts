import DeviceInfo from 'react-native-device-info';
import { Platform } from 'react-native';
import { getDevicesInfo } from '../redux/cache/cacheAction';
import type { AppDispatch } from '../redux/store';

interface DeviceInfoData {
  id: string;
  name: string;
  type: string;
  token: string;
  isEmulator: boolean;
  manufacturer: string;
  appVersion: string;
  brand?: string;
}

type DeviceInfoError = {
  message: string;
  code: string;
  timestamp: string;
};

export const fetchAndStoreDeviceInfo = async (dispatch: AppDispatch) => {
  try {
    const [
      id,
      name,
      token,
      isEmulator,
      manufacturer,
      appVersion,
      brand,
    ] = await Promise.all([
      DeviceInfo.getDeviceId(),
      DeviceInfo.getDeviceName(),
      DeviceInfo.getUniqueId(),
        DeviceInfo.isEmulator(),
      DeviceInfo.getManufacturer(),
      DeviceInfo.getVersion(),
      DeviceInfo.getBrand(), 
    ]);

    const deviceData: DeviceInfoData = {
      id,
      name,
      type: Platform.OS,
      token,
      isEmulator,
      manufacturer,
      appVersion,
      brand,
    };

    if (deviceData.token && deviceData.id) {
      dispatch(getDevicesInfo(deviceData));
    } else {
      throw new Error('Invalid device information');
    }
  } catch (error: any) {
    const errorInfo: DeviceInfoError = {
      message: error instanceof Error ? error.message : 'Unknown error',
      code: 'DEVICE_INFO_FETCH_FAILED',
      timestamp: new Date().toISOString(),
    };

    console.error('Device info fetch failed:', errorInfo);
    
    dispatch({ 
      type: 'DEVICE_INFO_ERROR', 
      payload: errorInfo 
    });
  }
};

let deviceInfoPromise: Promise<void> | null = null;

const getDeviceInfoOnce = (dispatch: AppDispatch) => {
  if (!deviceInfoPromise) {
    deviceInfoPromise = fetchAndStoreDeviceInfo(dispatch)
      .finally(() => { deviceInfoPromise = null; });
  }
  return deviceInfoPromise;
};

export default getDeviceInfoOnce;


