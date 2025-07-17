import { StyleSheet, Text } from 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NetworkStatusBanner from './components/NetworkStatusBanner/NetworkStatusBanner';
import StackNavigator from './navigations/StackNavigator';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <NetworkStatusBanner />
          <StackNavigator />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
