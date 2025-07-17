import { useState, useEffect } from 'react';
import { networkService } from './NetworkService';

export const useNetworkStatus = (): boolean => {
  const [isConnected, setIsConnected] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = networkService.subscribe((connected: boolean) => {
      setIsConnected(connected);
    });

    return () => unsubscribe();
  }, []);

  return isConnected;
};
