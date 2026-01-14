/**
 * Auth Pages Barrel Export
 * 
 * Centralized export for all authentication pages
 * 
 * Pattern: Container/Presentational
 * - SignInContainer: Business logic (state, validation, API, navigation)
 * - SignInCard: Pure UI (receives all data as props)
 * - SignUpContainer: Business logic for registration
 * - SignUpCard: Pure UI for registration
 */

export { SignInContainer } from './SignInContainer';
export { SignInCard } from './SignInCard';
export type { SignInFormData, SignInErrors } from './SignInContainer';

export { SignUpContainer } from './SignUpContainer';
export { SignUpCard } from './SignUpCard';
export type { SignUpFormData, SignUpErrors } from './SignUpContainer';
