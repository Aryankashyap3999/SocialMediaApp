import type { User } from './types';

/**
 * User session management utilities
 * TODO: Replace with proper auth context/store
 */

// Session storage key
const SESSION_KEY = 'aptoodate_current_user';

// Initialize currentUser from localStorage (persists across refresh)
let currentUser: (User & { password: string; email: string }) | null = (() => {
  try {
    const stored = localStorage.getItem(SESSION_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.warn('Failed to restore session:', e);
  }
  return null;
})();

/**
 * Set the current user after successful sign-in
 * Persists to localStorage for session persistence
 */
export function setCurrentUser(user: (User & { password: string; email: string }) | null) {
  currentUser = user;
  try {
    if (user) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(SESSION_KEY);
    }
  } catch (e) {
    console.warn('Failed to persist session:', e);
  }
}

/**
 * Get the current user
 */
export function getCurrentUser() {
  return currentUser;
}