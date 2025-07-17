declare module '@env' {
  // App Configuration
  export const APP_NAME: string;
  export const APP_VERSION: string;
  export const APP_ENV: string;

  // API Configuration
  export const API_BASE_URL: string;
  export const API_TIMEOUT: string;
  export const API_VERSION: string;

  // Authentication
  export const AUTH_TOKEN_KEY: string;
  export const AUTH_REFRESH_TOKEN_KEY: string;
  export const AUTH_EXPIRY_KEY: string;

  // Social Login
  export const GOOGLE_CLIENT_ID: string;
  export const GOOGLE_CLIENT_SECRET: string;
  export const FACEBOOK_APP_ID: string;
  export const FACEBOOK_CLIENT_TOKEN: string;
  export const APPLE_CLIENT_ID: string;

  // Firebase Configuration
  export const FIREBASE_API_KEY: string;
  export const FIREBASE_AUTH_DOMAIN: string;
  export const FIREBASE_PROJECT_ID: string;
  export const FIREBASE_STORAGE_BUCKET: string;
  export const FIREBASE_MESSAGING_SENDER_ID: string;
  export const FIREBASE_APP_ID: string;

  // Analytics & Monitoring
  export const SENTRY_DSN: string;
  export const MIXPANEL_TOKEN: string;
  export const ANALYTICS_ENABLED: string;

  // Feature Flags
  export const FEATURE_SOCIAL_LOGIN: string;
  export const FEATURE_PUSH_NOTIFICATIONS: string;
  export const FEATURE_BIOMETRIC_AUTH: string;
  export const FEATURE_DARK_MODE: string;

  // Cache Configuration
  export const CACHE_EXPIRY_TIME: string;
  export const CACHE_MAX_SIZE: string;

  // Network Configuration
  export const NETWORK_TIMEOUT: string;
  export const NETWORK_RETRY_ATTEMPTS: string;

  // Storage Keys
  export const STORAGE_USER_DATA_KEY: string;
  export const STORAGE_SETTINGS_KEY: string;
  export const STORAGE_CACHE_KEY: string;

  // Debug Configuration
  export const DEBUG_MODE: string;
  export const LOG_LEVEL: string;
  export const SHOW_DEBUG_MENU: string;

  // Build Configuration
  export const BUILD_NUMBER: string;
  export const BUNDLE_IDENTIFIER: string;
}