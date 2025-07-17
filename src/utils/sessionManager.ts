import { store } from '../redux/store';
import { RootState } from '../redux/store';

export interface SessionInfo {
  isAuthenticated: boolean;
  user: Record<string, any> | null;
  token: string | null;
  hasValidSession: boolean;
}

/**
 * Session Manager Utility
 * Provides functions to check and manage user authentication state
 */
export class SessionManager {
  /**
   * Get current session information
   */
  static getSessionInfo(): SessionInfo {
    const state = store.getState() as RootState;
    const user = state.appState?.user || null;
    const token = state.appState?.token || null;
    
    return {
      isAuthenticated: !!(user && token),
      user,
      token,
      hasValidSession: !!(user && token),
    };
  }

  /**
   * Check if user is authenticated
   */
  static isAuthenticated(): boolean {
    const session = this.getSessionInfo();
    return session.isAuthenticated;
  }

  /**
   * Get current user data
   */
  static getCurrentUser(): Record<string, any> | null {
    const session = this.getSessionInfo();
    return session.user;
  }

  /**
   * Get current authentication token
   */
  static getCurrentToken(): string | null {
    const session = this.getSessionInfo();
    return session.token;
  }

  /**
   * Check if user has a valid session (both user and token exist)
   */
  static hasValidSession(): boolean {
    const session = this.getSessionInfo();
    return session.hasValidSession;
  }

  /**
   * Get user ID if authenticated
   */
  static getUserId(): string | number | null {
    const user = this.getCurrentUser();
    return user?.id || null;
  }

  /**
   * Get user email if authenticated
   */
  static getUserEmail(): string | null {
    const user = this.getCurrentUser();
    return user?.email || null;
  }

  /**
   * Get user name if authenticated
   */
  static getUserName(): string | null {
    const user = this.getCurrentUser();
    return user?.name || null;
  }

  /**
   * Check if token exists and is not empty
   */
  static hasToken(): boolean {
    const token = this.getCurrentToken();
    return !!(token && token.trim().length > 0);
  }

  /**
   * Log session info for debugging
   */
  static logSessionInfo(): void {
    const session = this.getSessionInfo();
    console.log('Session Info:', {
      isAuthenticated: session.isAuthenticated,
      hasToken: this.hasToken(),
      userId: this.getUserId(),
      userEmail: this.getUserEmail(),
      userName: this.getUserName(),
    });
  }
}

// Export default instance
export default SessionManager; 