// utils/NetworkService.ts
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { Alert } from 'react-native';

class NetworkService {
  private isConnected: boolean | null = null;
  private subscribers: Array<(isConnected: boolean) => void> = [];

  constructor() {
    this.initialize();
  }

  private initialize(): void {
    // Subscribe to network state changes
    NetInfo.addEventListener((state: NetInfoState) => this.handleConnectivityChange(state));

    // Get initial network state
    NetInfo.fetch().then((state: NetInfoState) => {
      this.handleConnectivityChange(state);
    });
  }

  private handleConnectivityChange(state: NetInfoState): void {
    this.isConnected = state.isConnected && (state.isInternetReachable ?? false);
    this.notifySubscribers();
  }

  private notifySubscribers(): void {
    this.subscribers.forEach((callback: (isConnected: boolean) => void) => {
      if (this.isConnected !== null) {
        callback(this.isConnected);
      }
    });
  }

  public async getNetworkState(): Promise<boolean> {
    const state: NetInfoState = await NetInfo.fetch();
    return (state.isConnected ?? false) && (state.isInternetReachable ?? false);
  }

  public subscribe(callback: (isConnected: boolean) => void): () => void {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  public async checkNetworkConnection(): Promise<boolean> {
    try {
      const state: NetInfoState = await NetInfo.fetch();
      const isConnected: boolean = (state.isConnected ?? false) && (state.isInternetReachable ?? false);

      if (!isConnected) {
        Alert.alert('No Internet Connection', 'Please check your internet connection and try again.');
      }

      return isConnected;
    } catch (error) {
      console.error('Network check failed:', error);
      
      Alert.alert('Error', 'Failed to check network connection');
      return false;
    }
  }
}

export const networkService = new NetworkService();