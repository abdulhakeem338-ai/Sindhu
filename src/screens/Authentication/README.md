# Authentication Screens

This directory contains beautiful and modern authentication screens for the Sindhu React Native app.

## Screens

### 1. Welcome Screen (`Welcome.tsx`)
- **Purpose**: Initial landing screen for new users
- **Features**:
  - Animated entrance effects
  - Beautiful gradient background
  - Feature highlights with icons
  - Call-to-action buttons for signup and login
  - Responsive design with floating background elements

### 2. Signup Screen (`Signup.tsx`)
- **Purpose**: User registration with comprehensive form validation
- **Features**:
  - Full name, email, password, and confirm password fields
  - Real-time form validation with error messages
  - Password strength requirements
  - Social login options (Google, Apple, Facebook)
  - Loading states and success/error handling
  - Navigation to login screen

### 3. Login Screen (`Login.tsx`)
- **Purpose**: User authentication with email and password
- **Features**:
  - Email and password fields with validation
  - "Forgot Password" functionality
  - Social login options (Google, Apple, Facebook)
  - Loading states and error handling
  - Navigation to signup screen

## Components

### Reusable Components

#### AuthInput
- **Location**: `../../components/AuthInput.tsx`
- **Features**:
  - Floating label animation
  - Icon support
  - Password visibility toggle
  - Error state handling
  - Focus/blur animations
  - Customizable keyboard types

#### GradientButton
- **Location**: `../../components/GradientButton.tsx`
- **Features**:
  - Gradient background support
  - Multiple variants (primary, secondary, outline)
  - Loading states with spinner
  - Icon support (left/right positioning)
  - Different sizes (small, medium, large)
  - Disabled state handling

#### SocialLoginButton
- **Location**: `../../components/SocialLoginButton.tsx`
- **Features**:
  - Support for Google, Apple, and Facebook
  - Brand-specific colors and icons
  - Consistent styling with the app theme
  - Disabled state handling

## Theme System

### Colors (`../../constants/constants.ts`)
- **Primary**: Indigo gradient (#6366F1 to #EC4899)
- **Background**: Dark slate theme (#0F172A)
- **Text**: High contrast white and gray variants
- **Status**: Success, error, warning, and info colors

### Typography
- **Font Sizes**: xs (12) to 5xl (48)
- **Font Weights**: normal (400) to extrabold (800)
- **Consistent spacing and line heights**

### Spacing & Layout
- **Spacing Scale**: xs (4) to 3xl (64)
- **Border Radius**: sm (4) to full (9999)
- **Shadows**: Multiple elevation levels with proper iOS/Android support

## Features

### Form Validation
- **Real-time validation** with immediate feedback
- **Comprehensive error messages** for better UX
- **Password strength requirements** (uppercase, lowercase, numbers)
- **Email format validation** with regex patterns
- **Field-specific error clearing** on user input

### Animations
- **Smooth transitions** between screens
- **Floating label animations** on input focus
- **Loading state animations** with spinners
- **Entrance animations** on welcome screen
- **Button press feedback** with opacity changes

### Accessibility
- **Proper keyboard handling** with KeyboardAvoidingView
- **Safe area support** for different device sizes
- **Touch target sizes** following accessibility guidelines
- **Color contrast** meeting WCAG standards
- **Screen reader support** with proper labels

### Social Integration
- **Google Sign-In** ready for implementation
- **Apple Sign-In** support for iOS
- **Facebook Login** integration ready
- **Consistent branding** across all providers

## Usage

### Navigation
```typescript
// Navigate to Welcome screen
navigation.navigate('Welcome');

// Navigate to Signup screen
navigation.navigate('Signup');

// Navigate to Login screen
navigation.navigate('Login');
```

### Form Handling
```typescript
// Example form data structure
interface SignupFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Example error structure
interface SignupErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}
```

### API Integration
The screens are designed to work with any authentication API. Simply replace the simulated API calls with your actual authentication endpoints.

## Dependencies

- `react-native-linear-gradient`: For beautiful gradient backgrounds
- `react-native-vector-icons`: For consistent iconography
- `react-native-safe-area-context`: For proper safe area handling
- `@react-navigation/stack`: For screen navigation

## Customization

### Colors
Modify the `COLORS` object in `../../constants/constants.ts` to match your brand colors.

### Typography
Update the `FONTS` object to use your preferred font family and sizes.

### Components
All components are highly customizable through props and style overrides.

## Future Enhancements

- [ ] Biometric authentication support
- [ ] Two-factor authentication (2FA)
- [ ] Email verification flow
- [ ] Password reset screen
- [ ] Account deletion flow
- [ ] Multi-language support
- [ ] Dark/light theme toggle
- [ ] Accessibility improvements
- [ ] Performance optimizations 