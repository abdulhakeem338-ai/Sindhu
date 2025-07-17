# Navigation System

This directory contains the navigation configuration for the Sindhu React Native app.

## Navigation Structure

### Stack Navigator (`StackNavigator.tsx`)
The main navigation container that manages the authentication flow and main app screens.

### Navigation Flow

```
Welcome Screen (Initial)
    ├── "Get Started" → Signup Screen
    └── "Sign In" → Login Screen

Login Screen
    ├── Successful Login → Home Screen
    └── "Sign Up" → Signup Screen

Signup Screen
    ├── Successful Signup → Home Screen
    └── "Sign In" → Login Screen

Home Screen
    └── "Logout" → Welcome Screen
```

## Screen Configuration

### Welcome Screen
- **Route Name**: `Welcome`
- **Initial Route**: Yes
- **Gesture Enabled**: No (prevents swipe back)
- **Purpose**: Landing page for new users

### Login Screen
- **Route Name**: `Login`
- **Gesture Enabled**: Yes (horizontal swipe)
- **Purpose**: User authentication

### Signup Screen
- **Route Name**: `Signup`
- **Gesture Enabled**: Yes (horizontal swipe)
- **Purpose**: User registration

### Home Screen
- **Route Name**: `Home`
- **Gesture Enabled**: No (prevents swipe back to auth)
- **Purpose**: Main app screen after authentication

## Navigation Features

### Transitions
- **Card Style Interpolator**: Custom slide animation from right to left
- **Background Color**: Consistent dark theme (#0F172A)
- **Status Bar**: Light content with dark background

### Gesture Handling
- **Welcome Screen**: No gestures (initial screen)
- **Auth Screens**: Horizontal swipe gestures enabled
- **Home Screen**: No gestures (prevents accidental logout)

### Type Safety
- **TypeScript Support**: Full type safety with `ScreenProps` interface
- **Navigation Types**: Properly typed navigation parameters
- **Route Names**: Type-safe route navigation

## Usage Examples

### Basic Navigation
```typescript
// Navigate to a screen
navigation.navigate('Login');

// Navigate with parameters (if needed)
navigation.navigate('Home', { userId: '123' });
```

### Screen Props Interface
```typescript
import { ScreenProps } from '../navigations/types';

const MyScreen: React.FC<ScreenProps> = ({ navigation }) => {
  // navigation is properly typed
  return (
    // Your screen content
  );
};
```

## Adding New Screens

### 1. Create the Screen Component
```typescript
import React from 'react';
import { ScreenProps } from '../navigations/types';

const NewScreen: React.FC<ScreenProps> = ({ navigation }) => {
  return (
    // Your screen content
  );
};

export default NewScreen;
```

### 2. Add to Navigation Types
```typescript
// In src/navigations/types.ts
export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  NewScreen: { param1?: string }; // Add your screen with params
};
```

### 3. Add to Stack Navigator
```typescript
// In src/navigations/StackNavigator.tsx
import NewScreen from '../screens/NewScreen';

// Add inside Stack.Navigator
<Stack.Screen 
  name="NewScreen" 
  component={NewScreen}
  options={{
    gestureEnabled: true,
    gestureDirection: 'horizontal',
  }}
/>
```

## Best Practices

### Navigation Patterns
- **Consistent Naming**: Use descriptive, consistent route names
- **Type Safety**: Always use TypeScript interfaces for navigation
- **Gesture Control**: Disable gestures where appropriate (initial/final screens)
- **Transition Consistency**: Use consistent animations across the app

### Screen Organization
- **Authentication Screens**: Grouped in `/screens/Authentication/`
- **Main App Screens**: Grouped in `/screens/Home/` or feature-specific folders
- **Navigation Types**: Centralized in `/navigations/types.ts`

### Performance Considerations
- **Lazy Loading**: Consider lazy loading for large screens
- **Memory Management**: Proper cleanup in screen unmount
- **Gesture Performance**: Optimize gesture handling for smooth animations

## Future Enhancements

- [ ] Tab Navigator for main app sections
- [ ] Drawer Navigator for settings/menu
- [ ] Deep linking support
- [ ] Authentication state management
- [ ] Screen persistence
- [ ] Analytics integration
- [ ] Error boundary integration 