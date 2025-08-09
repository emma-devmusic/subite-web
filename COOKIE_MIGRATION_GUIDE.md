# Migration Guide: SessionStorage to Cookies (Client Ecommerce)

## 📋 Overview

This document outlines the migration from `sessionStorage` to cookies for session management in the auction client ecommerce application. This enables session synchronization with the admin dashboard application.

## 🔄 Changes Made

### 1. Created CookieUtils Class (`/src/commons/Classes/CookiesUtils.ts`)

**Features:**
- **Encryption Support**: Encrypted cookie storage for sensitive data
- **Session Management**: Methods for session data, tokens, and user data
- **Standardized Cookie Names**: Same cookie names as dashboard for compatibility:
  - `auction_session` - Session data
  - `auction_token` - Access token  
  - `auction_usid` - User/session ID
  - `auction_user_data` - User data
- **Security Settings**: Secure cookie configuration

### 2. Updated SessionManager Class (`/src/commons/Classes/SessionManager.ts`)

**Key Changes:**
- ✅ Added import for `CookieUtils`
- ✅ Replaced `gettingSessionFromSessionStorage()` with `gettingSessionFromCookies()`
- ✅ Updated `getInstance()` to auto-load from cookies
- ✅ Modified `login()` method to save session data in cookies
- ✅ Updated `logout()` method to clear cookies
- ✅ Replaced all `sessionStorage` calls with cookie operations

### 3. Updated ExecuteApiCall Service (`/src/services/executeApiCall.ts`)

**Changes:**
- ✅ Added import for `CookieUtils`
- ✅ Replaced `sessionStorage.clear()` with `CookieUtils.clearSessionCookies()`

### 4. Created Cookie Synchronization Middleware (`/src/store/middlewares/cookieSync-middleware.ts`)

**Features:**
- **Automatic Synchronization**: Detects cookie changes and updates Redux state
- **Cross-tab Sync**: Handles session changes from other applications/tabs
- **State Validation**: Ensures Redux state matches cookie state
- **Error Handling**: Graceful error handling for cookie operations

### 5. Created Initialization Middleware (`/src/store/middlewares/initialization-middleware.ts`)

**Purpose:**
- Ensures Redux state is synchronized with cookies on application start
- Prevents state loss on page reload
- Executes once during app initialization

### 6. Updated Store Configuration (`/src/store/index.ts`)

**Changes:**
- ✅ Added `initializationMiddleware` as the first middleware
- ✅ Added `cookieSyncMiddleware` as the second middleware
- ✅ Proper middleware order for initialization and synchronization

### 7. Updated Auth Slice (`/src/store/slices/authSlice.ts`)

**Changes:**
- ✅ Added `getInitialAuthState()` function
- ✅ Initialize state from cookies using SessionManager
- ✅ Maintains existing reducers and actions
- ✅ Fallback to default state if cookie loading fails

### 8. Created Cookie Sync Provider (`/src/components/providers/CookieSyncProvider.tsx`)

**Features:**
- React component for application-level cookie synchronization
- Automatic sync between cookies and Redux state
- Cross-tab communication support
- Should wrap the entire application

**Usage:**
```tsx
<CookieSyncProvider>
    <App />
</CookieSyncProvider>
```

### 9. Created useCookieSync Hook (`/src/hooks/useCookieSync.tsx`)

**Capabilities:**
- Real-time cookie state monitoring
- Manual synchronization triggers
- Cross-tab communication support
- Automatic state updates
- Event listeners for window focus/visibility changes

## 🔗 Cross-Application Session Sharing

### Cookie Compatibility
Both applications now use the same cookie structure:
- **Cookie Names**: Identical across both apps
- **Encryption**: Same encryption method and keys
- **Data Structure**: Compatible user data formats
- **Expiration**: Consistent 7-day expiration

### Synchronization Flow
1. **User logs in Dashboard** → Cookies are set
2. **Client app detects cookies** → Auto-login without credentials
3. **User logs out from Client** → Cookies cleared
4. **Dashboard detects change** → Auto-logout

## 🚀 Implementation Status

✅ **Complete Cookie System**: Full migration from sessionStorage  
✅ **Cross-App Compatibility**: Same cookie structure as dashboard  
✅ **Real-time Sync**: Automatic synchronization between applications  
✅ **State Persistence**: Session survives page reloads  
✅ **Error Handling**: Graceful fallbacks and error management  
✅ **Security**: Encrypted sensitive data in cookies  

## 🔧 Next Steps

1. **Test Integration**: Verify session sharing between dashboard and client
2. **Add CookieSyncProvider**: Wrap main App component with provider
3. **Monitor Logs**: Check browser console for sync messages
4. **Validate Flow**: Test login/logout scenarios across both applications

## 📝 Usage Instructions

### To enable full synchronization:

1. Wrap your main App component:
```tsx
import CookieSyncProvider from '@/components/providers/CookieSyncProvider';

function App() {
  return (
    <CookieSyncProvider>
      {/* Your app content */}
    </CookieSyncProvider>
  );
}
```

2. The system will automatically:
   - Load session from cookies on app start
   - Sync with dashboard application
   - Handle cross-tab communication
   - Maintain state across page reloads

## 🐛 Debugging

Console messages will show synchronization status:
- `🚀 Initialization: Restoring session from cookies`
- `🔄 Cookie sync: User authenticated from cookies`
- `🔄 Cookie sync: User logged out from cookies`
- `🔄 CookieSync Provider: Session restored on mount`
