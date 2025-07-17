import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';

// Import authentication screens
import Welcome from '../screens/Authentication/Welcome';
import Login from '../screens/Authentication/Login';
import Signup from '../screens/Authentication/Signup';
import Home from '../screens/Home/Home';
import { COLORS, CONFIG } from '../constants/constants';

// Create the stack navigator
const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: COLORS.background },
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}
      >
        {/* Welcome Screen - Initial landing screen */}
        <Stack.Screen 
          name="Welcome" 
          component={Welcome}
          options={{
            gestureEnabled: false, // Prevent swipe back on welcome screen
          }}
        />
        
        {/* Login Screen */}
        <Stack.Screen 
          name="Login" 
          component={Login}
          options={{
            gestureEnabled: true,
            gestureDirection: 'horizontal',
          }}
        />
        
        {/* Signup Screen */}
        <Stack.Screen 
          name="Signup" 
          component={Signup}
          options={{
            gestureEnabled: true,
            gestureDirection: 'horizontal',
          }}
        />
        
        {/* Home Screen */}
        <Stack.Screen 
          name="Home" 
          component={Home}
          options={{
            gestureEnabled: false, // Prevent swipe back to auth screens
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;