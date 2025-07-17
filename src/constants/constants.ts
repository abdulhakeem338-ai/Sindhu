// Try to import from @env, fallback to default values if not available
let BASE_URL: string;
let API_TIMEOUT: number;

try {
  const env = require('@env');
  BASE_URL = env.API_BASE_URL || 'http://192.168.1.31:3000';
  API_TIMEOUT = parseInt(env.API_TIMEOUT || '10000', 10);
} catch (error) {
  // Fallback values when @env is not available
  BASE_URL = 'http://192.168.1.31:3000';
  API_TIMEOUT = 10000;
  console.warn('Environment variables not found, using default values. Make sure to create a .env file.');
}

const API = {
  BASE_URL: BASE_URL,
  TIMEOUT: API_TIMEOUT,
  ENDPOINTS: {
    SIGN_UP: '/authentication/signup',
    LOGIN: '/authentication/login',
  },
};

const SCREENS = {
  LOGIN: 'Login',
  SIGNUP: 'Signup',
  HOME: 'Home',
};

const COLORS = {
  // Primary colors
  primary: '#6366F1',
  secondary: '#8B5CF6',
  secondaryDark: '#7C3AED',
  
  // Background colors
  background: '#0F172A',
  backgroundLight: '#1E293B',
  surface: '#334155',
  
  // Text colors
  textPrimary: '#F8FAFC',
  textSecondary: '#CBD5E1',
  textMuted: '#64748B',
  
  // Status colors
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',
  
  // Border and divider colors
  border: '#475569',
  
  // Gradient colors
  gradientStart: '#6366F1',
  gradientEnd: '#8B5CF6',
  
  // Social login colors
  google: {
    color: '#DB4437',
    backgroundColor: '#FFFFFF',
    textColor: '#333333',
  },
  apple: {
    color: '#FFFFFF',
    backgroundColor: '#000000',
    textColor: '#FFFFFF',
  },
  facebook: {
    color: '#FFFFFF',
    backgroundColor: '#1877F2',
    textColor: '#FFFFFF',
  },
  
  // Transparent colors
  whiteTransparent10: 'rgba(255, 255, 255, 0.1)',
  whiteTransparent20: 'rgba(255, 255, 255, 0.2)',
};

const GRADIENT = {
  COLORS: {
    PRIMARY: [COLORS.gradientStart, COLORS.gradientEnd],
    SECONDARY: [COLORS.secondary, COLORS.secondaryDark],
    DISABLED: [COLORS.textMuted, COLORS.textMuted],
  },
  POSITION: {
    DIAGONAL: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
    HORIZONTAL: { start: { x: 0, y: 0 }, end: { x: 1, y: 0 } },
    VERTICAL: { start: { x: 0, y: 0 }, end: { x: 0, y: 1 } },
  },
};

const FONTS = {
  REGULAR: 'SF Pro Rounded Regular',
  LIGHT: 'SF Pro Rounded Light',
  MEDIUM: 'SF Pro Rounded Medium',
  BOLD: 'SF Pro Rounded Bold',
  SEMIBOLD: 'SF Pro Rounded Semibold',
  HEAVY: 'SF Pro Rounded Heavy',
  EXTRA_BOLD: 'SF Pro Rounded Extra Bold',
  EXTRA_LIGHT: 'SF Pro Rounded Ultralight',
  THIN: 'SF Pro Rounded Thin',
};

const FONT_SIZES = {
  XS: 12,
  SM: 14,
  BASE: 16,
  LG: 18,
  XL: 20,
  XXL: 24,
  XXXL: 32,
  DISPLAY: 48,
};

const SPACING = {
  XS: 4,
  SM: 8,
  BASE: 16,
  LG: 24,
  XL: 32,
  XXL: 48,
  XXXL: 64,
};

const BORDER_RADIUS = {
  SM: 4,
  BASE: 8,
  LG: 12,
  XL: 16,
  XXL: 24,
  FULL: 9999,
};

const COMMON_DATA = {
  APP_NAME: 'Sindhu',
  VERSION: '1.0.0',
};

const SOCIAL_DETAIL = {
  GOOGLE: {
    name: 'Google',
    icon: 'logo-google',
    ...COLORS.google,
  },
  APPLE: {
    name: 'Apple',
    icon: 'logo-apple',
    ...COLORS.apple,
  },
  FACEBOOK: {
    name: 'Facebook',
    icon: 'logo-facebook',
    ...COLORS.facebook,
  },
};

const CONFIG = {
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 500,
  NETWORK_TIMEOUT: 10000,
};

const ACTIONS = {
  APP: {
    SET_USER: 'set_user',
    SET_TOKEN: 'set_token',
    SET_LOGOUT: 'set_logout',
  },
  CACHE: {
    GET_DEVICES_INFO: 'get_devices_info',
  },
};

export {
  API,
  SCREENS,
  COLORS,
  FONTS,
  FONT_SIZES,
  SPACING,
  BORDER_RADIUS,
  COMMON_DATA,
  SOCIAL_DETAIL,
  CONFIG,
  ACTIONS,
  GRADIENT,
};
