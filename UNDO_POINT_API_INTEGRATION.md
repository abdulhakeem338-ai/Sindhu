# Undo Point: API Integration for Authentication

## Changes Made

### 1. Updated `src/api/apiService.ts`
- Enhanced error handling for both signup and login methods
- Added proper HTTP headers and timeout configuration
- Improved error messages for different types of failures (network, server, etc.)
- Added support for both 200 and 201 status codes for signup

### 2. Updated `src/screens/Authentication/Signup.tsx`
- Added import for `apiService`
- Replaced simulated API call with actual API service call
- Added proper data mapping (fullName → name)
- Enhanced error handling with specific error messages
- Added response message handling

### 3. Updated `src/screens/Authentication/Login.tsx`
- Added import for `apiService`
- Replaced simulated API call with actual API service call
- Enhanced error handling with specific error messages
- Added response message handling

## API Endpoints Used
- Signup: `POST /authentication/signup`
- Login: `POST /authentication/login`

## Data Format
### Signup Request:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login Request:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

## Expected Response Format
```json
{
  "success": true,
  "message": "User registered successfully.",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## To Revert Changes:
1. Remove the `apiService` import from both Signup.tsx and Login.tsx
2. Restore the original simulated API calls in both files
3. Revert the apiService.ts file to its original state with basic error handling

## Notes
- The API service now properly handles network errors, server errors, and validation errors
- Error messages are more user-friendly and specific
- The integration follows the API collection specification from `api-collection.json`
- Token storage functionality can be added later for persistent authentication 