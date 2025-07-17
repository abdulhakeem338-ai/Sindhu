# Environment Variables Setup Guide

## Quick Fix for @env Error

The app is now configured to work without a `.env` file using fallback values. However, to use custom environment variables, follow these steps:

## 1. Create .env File

Copy the example file and create your `.env` file:

```bash
# Copy the example file (if it exists)
cp env.example .env

# Or create a new .env file manually
touch .env
```

## 2. Add Your Environment Variables

Add the following to your `.env` file:

```env
# App Configuration
APP_NAME=Sindhu
APP_VERSION=1.0.0
APP_ENV=development

# API Configuration
API_BASE_URL=https://api.sindhu.com
API_TIMEOUT=10000
API_VERSION=v1

# Authentication
AUTH_TOKEN_KEY=sindhu_auth_token
AUTH_REFRESH_TOKEN_KEY=sindhu_refresh_token
AUTH_EXPIRY_KEY=sindhu_token_expiry

# Social Login (Replace with your actual values)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_CLIENT_TOKEN=your_facebook_client_token
APPLE_CLIENT_ID=your_apple_client_id

# Firebase Configuration (Replace with your actual values)
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=123456789
FIREBASE_APP_ID=your_firebase_app_id

# Feature Flags
FEATURE_SOCIAL_LOGIN=true
FEATURE_PUSH_NOTIFICATIONS=true
FEATURE_BIOMETRIC_AUTH=false
FEATURE_DARK_MODE=true

# Debug Configuration
DEBUG_MODE=true
LOG_LEVEL=debug
SHOW_DEBUG_MENU=true
```

## 3. Restart Metro Bundler

After creating the `.env` file, restart your Metro bundler:

```bash
# Stop the current Metro bundler (Ctrl+C)
# Then restart
npm start
# or
npx react-native start
```

## 4. Verify Setup

The app should now work without the `@env` error. You should see a warning message in the console if the `.env` file is not found, but the app will continue to work with default values.

## Important Notes

- The `.env` file is automatically ignored by Git (it's in `.gitignore`)
- Never commit sensitive information like API keys to version control
- The app will work with default values even without a `.env` file
- You can customize any of the environment variables as needed

## Troubleshooting

If you still see the `@env` error:

1. Make sure the `.env` file is in the root directory of your project
2. Restart the Metro bundler completely
3. Clear Metro cache: `npx react-native start --reset-cache`
4. Check that the babel configuration is correct in `babel.config.js`

## Using Environment Variables in Code

```typescript
import { Config } from '../config/Config';

// Get API configuration
const apiConfig = Config.getApiConfig();
console.log(apiConfig.baseUrl); // Your API_BASE_URL from .env

// Check feature flags
if (Config.isFeatureEnabled('socialLogin')) {
  // Social login is enabled
}

// Get storage keys
const storageKeys = Config.getStorageKeys();
``` 