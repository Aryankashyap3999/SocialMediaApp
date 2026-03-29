import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignInCard } from './SignInCard';
import { useSignIn } from '@/hooks/mutations/useSignIn';

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
  const { signInMutation, isPending, isSuccess } = useSignIn();

  // Form state
  const [formData, setFormData] = useState<SignInFormData>({
    email: '',
    password: '',
  });

  // UI state
  const [errors, setErrors] = useState<SignInErrors>({});
  const [rememberMe, setRememberMe] = useState(false);

  // Navigate to home on successful signin
  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate('/home');
      }, 500);
    }
  }, [isSuccess, navigate]);

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

    // Password validation - minimum 4 characters only
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 4) {
      newErrors.password = 'Password must be at least 4 characters';
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

    setErrors({});

    try {
      await signInMutation({
        email: formData.email,
        password: formData.password
      });
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } }; message?: string };
      setErrors({
        general:
          axiosError?.response?.data?.message ||
          (error instanceof Error ? error.message : 'Failed to sign in. Please try again.'),
      });
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
      isLoading={isPending}
      isSuccess={isSuccess}
      errors={errors}
      rememberMe={rememberMe}
      onForgotPassword={handleForgotPassword}
      onSignUp={handleSignUp}
    />
  );
};

SignInContainer.displayName = 'SignInContainer';
