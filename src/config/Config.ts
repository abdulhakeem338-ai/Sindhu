// Try to import from @env, fallback to default values if not available
let env: any = {};

try {
  env = require('@env');
} catch (error) {
  console.warn('Environment variables not found, using default values. Make sure to create a .env file.');
}

// Extract environment variables with fallbacks
const {
  APP_NAME = 'Sindhu',
  APP_VERSION = '1.0.0',
  APP_ENV = 'development',
  API_BASE_URL = 'https://api.sindhu.com',
  API_TIMEOUT = '10000',
  API_VERSION = 'v1',
  AUTH_TOKEN_KEY = 'sindhu_auth_token',
  AUTH_REFRESH_TOKEN_KEY = 'sindhu_refresh_token',
  AUTH_EXPIRY_KEY = 'sindhu_token_expiry',
  GOOGLE_CLIENT_ID = '',
  GOOGLE_CLIENT_SECRET = '',
  FACEBOOK_APP_ID = '',
  FACEBOOK_CLIENT_TOKEN = '',
  APPLE_CLIENT_ID = '',
  FIREBASE_API_KEY = '',
  FIREBASE_AUTH_DOMAIN = '',
  FIREBASE_PROJECT_ID = '',
  FIREBASE_STORAGE_BUCKET = '',
  FIREBASE_MESSAGING_SENDER_ID = '',
  FIREBASE_APP_ID = '',
  SENTRY_DSN = '',
  MIXPANEL_TOKEN = '',
  ANALYTICS_ENABLED = 'true',
  FEATURE_SOCIAL_LOGIN = 'true',
  FEATURE_PUSH_NOTIFICATIONS = 'true',
  FEATURE_BIOMETRIC_AUTH = 'false',
  FEATURE_DARK_MODE = 'true',
  CACHE_EXPIRY_TIME = '3600000',
  CACHE_MAX_SIZE = '50',
  NETWORK_TIMEOUT = '10000',
  NETWORK_RETRY_ATTEMPTS = '3',
  STORAGE_USER_DATA_KEY = 'sindhu_user_data',
  STORAGE_SETTINGS_KEY = 'sindhu_settings',
  STORAGE_CACHE_KEY = 'sindhu_cache',
  DEBUG_MODE = 'true',
  LOG_LEVEL = 'debug',
  SHOW_DEBUG_MENU = 'true',
  BUILD_NUMBER = '1',
  BUNDLE_IDENTIFIER = 'com.sindhu.app',
} = env;

export interface AppConfig {
  // App Configuration
  app: {
    name: string;
    version: string;
    environment: 'development' | 'staging' | 'production';
  };

  // API Configuration
  api: {
    baseUrl: string;
    timeout: number;
    version: string;
  };

  // Authentication Configuration
  auth: {
    tokenKey: string;
    refreshTokenKey: string;
    expiryKey: string;
  };

  // Social Login Configuration
  social: {
    google: {
      clientId: string;
      clientSecret: string;
    };
    facebook: {
      appId: string;
      clientToken: string;
    };
    apple: {
      clientId: string;
    };
  };

  // Firebase Configuration
  firebase: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
  };

  // Analytics & Monitoring
  analytics: {
    sentryDsn: string;
    mixpanelToken: string;
    enabled: boolean;
  };

  // Feature Flags
  features: {
    socialLogin: boolean;
    pushNotifications: boolean;
    biometricAuth: boolean;
    darkMode: boolean;
  };

  // Cache Configuration
  cache: {
    expiryTime: number;
    maxSize: number;
  };

  // Network Configuration
  network: {
    timeout: number;
    retryAttempts: number;
  };

  // Storage Keys
  storage: {
    userDataKey: string;
    settingsKey: string;
    cacheKey: string;
  };

  // Debug Configuration
  debug: {
    mode: boolean;
    logLevel: string;
    showDebugMenu: boolean;
  };

  // Build Configuration
  build: {
    number: string;
    bundleIdentifier: string;
  };
}

class ConfigService {
  private config: AppConfig;

  constructor() {
    this.config = {
      app: {
        name: APP_NAME,
        version: APP_VERSION,
        environment: (APP_ENV as 'development' | 'staging' | 'production'),
      },
      api: {
        baseUrl: API_BASE_URL,
        timeout: parseInt(API_TIMEOUT, 10),
        version: API_VERSION,
      },
      auth: {
        tokenKey: AUTH_TOKEN_KEY,
        refreshTokenKey: AUTH_REFRESH_TOKEN_KEY,
        expiryKey: AUTH_EXPIRY_KEY,
      },
      social: {
        google: {
          clientId: GOOGLE_CLIENT_ID,
          clientSecret: GOOGLE_CLIENT_SECRET,
        },
        facebook: {
          appId: FACEBOOK_APP_ID,
          clientToken: FACEBOOK_CLIENT_TOKEN,
        },
        apple: {
          clientId: APPLE_CLIENT_ID,
        },
      },
      firebase: {
        apiKey: FIREBASE_API_KEY,
        authDomain: FIREBASE_AUTH_DOMAIN,
        projectId: FIREBASE_PROJECT_ID,
        storageBucket: FIREBASE_STORAGE_BUCKET,
        messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
        appId: FIREBASE_APP_ID,
      },
      analytics: {
        sentryDsn: SENTRY_DSN,
        mixpanelToken: MIXPANEL_TOKEN,
        enabled: ANALYTICS_ENABLED === 'true',
      },
      features: {
        socialLogin: FEATURE_SOCIAL_LOGIN === 'true',
        pushNotifications: FEATURE_PUSH_NOTIFICATIONS === 'true',
        biometricAuth: FEATURE_BIOMETRIC_AUTH === 'true',
        darkMode: FEATURE_DARK_MODE === 'true',
      },
      cache: {
        expiryTime: parseInt(CACHE_EXPIRY_TIME, 10),
        maxSize: parseInt(CACHE_MAX_SIZE, 10),
      },
      network: {
        timeout: parseInt(NETWORK_TIMEOUT, 10),
        retryAttempts: parseInt(NETWORK_RETRY_ATTEMPTS, 10),
      },
      storage: {
        userDataKey: STORAGE_USER_DATA_KEY,
        settingsKey: STORAGE_SETTINGS_KEY,
        cacheKey: STORAGE_CACHE_KEY,
      },
      debug: {
        mode: DEBUG_MODE === 'true',
        logLevel: LOG_LEVEL,
        showDebugMenu: SHOW_DEBUG_MENU === 'true',
      },
      build: {
        number: BUILD_NUMBER,
        bundleIdentifier: BUNDLE_IDENTIFIER,
      },
    };
  }

  /**
   * Get the entire configuration object
   */
  getConfig(): AppConfig {
    return this.config;
  }

  /**
   * Get app configuration
   */
  getAppConfig() {
    return this.config.app;
  }

  /**
   * Get API configuration
   */
  getApiConfig() {
    return this.config.api;
  }

  /**
   * Get authentication configuration
   */
  getAuthConfig() {
    return this.config.auth;
  }

  /**
   * Get social login configuration
   */
  getSocialConfig() {
    return this.config.social;
  }

  /**
   * Get Firebase configuration
   */
  getFirebaseConfig() {
    return this.config.firebase;
  }

  /**
   * Get analytics configuration
   */
  getAnalyticsConfig() {
    return this.config.analytics;
  }

  /**
   * Get feature flags
   */
  getFeatures() {
    return this.config.features;
  }

  /**
   * Get cache configuration
   */
  getCacheConfig() {
    return this.config.cache;
  }

  /**
   * Get network configuration
   */
  getNetworkConfig() {
    return this.config.network;
  }

  /**
   * Get storage keys
   */
  getStorageKeys() {
    return this.config.storage;
  }

  /**
   * Get debug configuration
   */
  getDebugConfig() {
    return this.config.debug;
  }

  /**
   * Get build configuration
   */
  getBuildConfig() {
    return this.config.build;
  }

  /**
   * Check if a feature is enabled
   */
  isFeatureEnabled(feature: keyof AppConfig['features']): boolean {
    return this.config.features[feature];
  }

  /**
   * Check if running in development mode
   */
  isDevelopment(): boolean {
    return this.config.app.environment === 'development';
  }

  /**
   * Check if running in production mode
   */
  isProduction(): boolean {
    return this.config.app.environment === 'production';
  }

  /**
   * Check if debug mode is enabled
   */
  isDebugMode(): boolean {
    return this.config.debug.mode;
  }

  /**
   * Generate API URL with version
   */
  getApiUrl(endpoint: string): string {
    const baseUrl = this.config.api.baseUrl.replace(/\/$/, '');
    const version = this.config.api.version;
    const cleanEndpoint = endpoint.replace(/^\//, '');
    return `${baseUrl}/${version}/${cleanEndpoint}`;
  }
}

// Export singleton instance
export const Config = new ConfigService(); 