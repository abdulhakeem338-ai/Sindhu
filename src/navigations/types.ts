import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Signup: undefined;
  Home: undefined;
};

export type NavigationProp = StackNavigationProp<RootStackParamList>;

export interface ScreenProps {
  navigation: NavigationProp;
} 