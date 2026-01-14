import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignUpCard } from './SignUpCard';

export interface SignUpFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignUpErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

/**
 * SignUpContainer
 * 
 * Single responsibility: Manage sign-up business logic
 * - Form state management
 * - Form validation
 * - API integration (placeholder)
 * - Navigation on success
 * - Error handling
 * 
 * Uses Container/Presentational pattern:
 * - Container: All logic and state
 * - Presentational (SignUpCard): Only UI rendering
 */
export const SignUpContainer: React.FC = () => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState<SignUpFormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<SignUpErrors>({});
  const [acceptTerms, setAcceptTerms] = useState(false);

  /**
   * Validate form data
   */
  const validateForm = (): boolean => {
    const newErrors: SignUpErrors = {};

    // Full name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Terms validation
    if (!acceptTerms) {
      newErrors.general = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log('Sign up attempt:', {
        fullName: formData.fullName,
        email: formData.email,
      });

      setIsSuccess(true);
      
      setTimeout(() => {
        navigate('/auth/signin');
      }, 2000);
    } catch (error) {
      setErrors({
        general: error instanceof Error ? error.message : 'Failed to create account. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle input change
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof SignUpErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  /**
   * Handle terms checkbox change
   */
  const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setAcceptTerms(e.target.checked);
    
    if (e.target.checked && errors.general?.includes('terms')) {
      setErrors(prev => ({
        ...prev,
        general: undefined,
      }));
    }
  };

  /**
   * Handle sign in navigation
   */
  const handleSignIn = (): void => {
    navigate('/auth/signin');
  };

  return (
    <SignUpCard
      formData={formData}
      acceptTerms={acceptTerms}
      onInputChange={handleInputChange}
      onTermsChange={handleTermsChange}
      onSubmit={handleSubmit}
      onSignIn={handleSignIn}
      isLoading={isLoading}
      isSuccess={isSuccess}
      errors={errors}
    />
  );
};

SignUpContainer.displayName = 'SignUpContainer';
