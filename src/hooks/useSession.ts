import { useAppSelector } from '../redux/hooks';
import { SessionManager } from '../utils/sessionManager';

/**
 * Custom hook for session management
 * Provides easy access to authentication state and user data
 */
export const useSession = () => {
  const appState = useAppSelector((state) => state.appState);
  
  const user = appState?.user || null;
  const token = appState?.token || null;
  
  const isAuthenticated = !!(user && token);
  const hasValidSession = !!(user && token);
  const hasToken = !!(token && token.trim().length > 0);
  
  const userId = user?.id || null;
  const userEmail = user?.email || null;
  const userName = user?.name || null;

  return {
    // Authentication status
    isAuthenticated,
    hasValidSession,
    hasToken,
    
    // User data
    user,
    userId,
    userEmail,
    userName,
    
    // Token
    token,
    
    // Utility functions
    getSessionInfo: SessionManager.getSessionInfo,
    logSessionInfo: SessionManager.logSessionInfo,
  };
};

export default useSession; 