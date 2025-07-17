# Environment Configuration Setup

This document explains how to set up and use environment variables in the Sindhu React Native app.

## 📁 File Structure

```
├── .env                    # Main environment file (gitignored)
├── env.example            # Example environment file
├── env.development        # Development environment
├── env.production         # Production environment
├── babel.config.js        # Babel configuration with dotenv plugin
├── src/
│   ├── types/
│   │   └── env.d.ts       # TypeScript declarations for env vars
│   └── config/
│       ├── Config.ts      # Configuration service
│       └── index.ts       # Config exports
└── tsconfig.json          # TypeScript configuration
```

## 🚀 Quick Setup

### 1. Install Dependencies
```bash
npm install react-native-dotenv --save-dev
```

### 2. Create Environment Files
Copy the example file and create your environment files:
```bash
cp env.example .env
```

### 3. Configure Babel
The `babel.config.js` is already configured with the dotenv plugin.

### 4. Update TypeScript
The `tsconfig.json` is already configured to include type definitions.

## 📝 Environment Variables

### App Configuration
```env
APP_NAME=Sindhu
APP_VERSION=1.0.0
APP_ENV=development
```

### API Configuration
```env
API_BASE_URL=https://api.sindhu.com
API_TIMEOUT=30000
API_VERSION=v1
```

### Authentication
```env
AUTH_TOKEN_KEY=sindhu_auth_token
AUTH_REFRESH_TOKEN_KEY=sindhu_refresh_token
AUTH_EXPIRY_KEY=sindhu_token_expiry
```

### Social Login
```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_CLIENT_TOKEN=your_facebook_client_token
APPLE_CLIENT_ID=your_apple_client_id
```

### Firebase Configuration
```env
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=123456789
FIREBASE_APP_ID=your_firebase_app_id
```

### Analytics & Monitoring
```env
SENTRY_DSN=your_sentry_dsn
MIXPANEL_TOKEN=your_mixpanel_token
ANALYTICS_ENABLED=true
```

### Feature Flags
```env
FEATURE_SOCIAL_LOGIN=true
FEATURE_PUSH_NOTIFICATIONS=true
FEATURE_BIOMETRIC_AUTH=false
FEATURE_DARK_MODE=true
```

### Cache Configuration
```env
CACHE_EXPIRY_TIME=3600000
CACHE_MAX_SIZE=50
```

### Network Configuration
```env
NETWORK_TIMEOUT=10000
NETWORK_RETRY_ATTEMPTS=3
```

### Storage Keys
```env
STORAGE_USER_DATA_KEY=sindhu_user_data
STORAGE_SETTINGS_KEY=sindhu_settings
STORAGE_CACHE_KEY=sindhu_cache
```

### Debug Configuration
```env
DEBUG_MODE=true
LOG_LEVEL=debug
SHOW_DEBUG_MENU=true
```

### Build Configuration
```env
BUILD_NUMBER=1
BUNDLE_IDENTIFIER=com.sindhu.app
```

## 🔧 Usage Examples

### Basic Configuration Access
```typescript
import { Config } from '../config';

// Get app configuration
const appConfig = Config.getAppConfig();
console.log(appConfig.name); // "Sindhu"

// Get API configuration
const apiConfig = Config.getApiConfig();
console.log(apiConfig.baseUrl); // "https://api.sindhu.com"

// Get feature flags
const features = Config.getFeatures();
console.log(features.socialLogin); // true/false
```

### Feature Flag Usage
```typescript
import { Config } from '../config';

const handleSocialLogin = () => {
  if (!Config.isFeatureEnabled('socialLogin')) {
    Alert.alert('Feature Disabled', 'Social login is currently disabled.');
    return;
  }
  // Proceed with social login
};
```

### Environment Checks
```typescript
import { Config } from '../config';

// Check environment
if (Config.isDevelopment()) {
  console.log('Running in development mode');
}

if (Config.isProduction()) {
  console.log('Running in production mode');
}

if (Config.isDebugMode()) {
  console.log('Debug mode enabled');
}
```

### API URL Generation
```typescript
import { Config } from '../config';

// Generate API URLs
const loginUrl = Config.getApiUrl('auth/login');
// Result: "https://api.sindhu.com/v1/auth/login"

const userProfileUrl = Config.getApiUrl('user/profile');
// Result: "https://api.sindhu.com/v1/user/profile"
```

### Storage Key Access
```typescript
import { Config } from '../config';

const storageKeys = Config.getStorageKeys();
AsyncStorage.setItem(storageKeys.userDataKey, userData);
```

## 🔒 Security Best Practices

### 1. Never Commit Sensitive Data
```bash
# Add to .gitignore
.env
.env.local
.env.production
```

### 2. Use Different Keys for Different Environments
```env
# Development
AUTH_TOKEN_KEY=sindhu_dev_auth_token

# Production
AUTH_TOKEN_KEY=sindhu_prod_auth_token
```

### 3. Validate Environment Variables
```typescript
// In Config.ts
if (!API_BASE_URL) {
  throw new Error('API_BASE_URL is required');
}
```

### 4. Use Type Safety
```typescript
// Always use the Config service instead of direct imports
import { Config } from '../config';
// ✅ Good
const apiUrl = Config.getApiConfig().baseUrl;

// ❌ Avoid direct imports
import { API_BASE_URL } from '@env';
const apiUrl = API_BASE_URL;
```

## 🏗️ Environment-Specific Configurations

### Development Environment
- Debug mode enabled
- Shorter cache times
- Development API endpoints
- Detailed logging

### Production Environment
- Debug mode disabled
- Longer cache times
- Production API endpoints
- Error-only logging

### Staging Environment
- Debug mode enabled
- Staging API endpoints
- Detailed logging for testing

## 🔄 Environment Switching

### Using Different Environment Files
```bash
# Development
cp env.development .env

# Production
cp env.production .env

# Staging
cp env.staging .env
```

### Build Scripts
```json
{
  "scripts": {
    "start:dev": "cp env.development .env && react-native start",
    "start:prod": "cp env.production .env && react-native start",
    "build:dev": "cp env.development .env && react-native run-android",
    "build:prod": "cp env.production .env && react-native run-android"
  }
}
```

## 🐛 Troubleshooting

### Common Issues

#### 1. Environment Variables Not Loading
```bash
# Check if .env file exists
ls -la .env

# Restart Metro bundler
npx react-native start --reset-cache
```

#### 2. TypeScript Errors
```bash
# Check if types are properly configured
npx tsc --noEmit

# Restart TypeScript server in your IDE
```

#### 3. Babel Configuration Issues
```bash
# Clear Babel cache
npx react-native start --reset-cache
```

### Debug Environment Variables
```typescript
import { Config } from '../config';

// Log all configuration
console.log('App Config:', Config.getConfig());

// Check specific values
console.log('API URL:', Config.getApiConfig().baseUrl);
console.log('Environment:', Config.getAppConfig().environment);
```

## 📚 Additional Resources

- [react-native-dotenv Documentation](https://github.com/goatandsheep/react-native-dotenv)
- [React Native Environment Variables](https://reactnative.dev/docs/environment-variables)
- [TypeScript Module Declaration](https://www.typescriptlang.org/docs/handbook/modules.html#ambient-modules)

## 🔄 Migration Guide

### From Direct Environment Imports
```typescript
// ❌ Old way
import { API_BASE_URL } from '@env';

// ✅ New way
import { Config } from '../config';
const apiUrl = Config.getApiConfig().baseUrl;
```

### From Hardcoded Values
```typescript
// ❌ Old way
const API_URL = 'https://api.sindhu.com';

// ✅ New way
const apiUrl = Config.getApiConfig().baseUrl;
```

This setup provides a robust, type-safe, and secure way to manage environment variables in your React Native app! 🎉 