import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignInCard } from './SignInCard'; 
import { findUserByEmailAndPassword, setCurrentUser } from '../messages/mockData';

export interface SignInFormData {
  email: string;
  password: string;
}

export interface SignInErrors {
  email?: string;
  password?: string;
  general?: string;
}


export const SignInContainer: React.FC = () => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState<SignInFormData>({
    email: '',
    password: '',
  });

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<SignInErrors>({});
  const [rememberMe, setRememberMe] = useState(false);

  /**
   * Validate form data
   * Single responsibility: Validation logic only
   */
  const validateForm = (): boolean => {
    const newErrors: SignInErrors = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   * Single responsibility: Form submission logic only
   */
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    // Validate before submission
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Find user in mock data
      const user = findUserByEmailAndPassword(formData.email, formData.password);
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      if (user) {
        setCurrentUser(user);
        setIsSuccess(true);
        setTimeout(() => {
          navigate('/home');
        }, 500);
      } else {
        setErrors({ general: 'Invalid email or password.' });
        setIsSuccess(false);
      }
    } catch (error) {
      setErrors({
        general: error instanceof Error ? error.message : 'Failed to sign in. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle input change
   * Single responsibility: Form state update only
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof SignInErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  /**
   * Handle checkbox change
   */
  const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setRememberMe(e.target.checked);
  };

  /**
   * Handle forgot password navigation
   */
  const handleForgotPassword = (): void => {
    navigate('/forgot-password');
  };

  /**
   * Handle sign up navigation
   */
  const handleSignUp = (): void => {
    navigate('/auth/signup');
  };

  // Pass all state and callbacks to presentational component
  return (
    <SignInCard
      formData={formData}
      onInputChange={handleInputChange}
      onRememberMeChange={handleRememberMeChange}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isSuccess={isSuccess}
      errors={errors}
      rememberMe={rememberMe}
      onForgotPassword={handleForgotPassword}
      onSignUp={handleSignUp}
    />
  );
};

SignInContainer.displayName = 'SignInContainer';
