import React from 'react';

export interface AuthLayoutProps {
  children: React.ReactNode;
  backgroundImage?: string;
}

/**
 * AuthLayout
 * 
 * Structure:
 * ┌─────────────────────────────────────┐
 * │  Logo  │                             │
 * │        │     Form Content            │
 * │        │     (Login/Signup/etc)      │
 * │        │                             │
 * └─────────────────────────────────────┘
 * 
 * Used for: Login, Signup, Verification screens
 * 
 * @example
 * <AuthLayout>
 *   <LoginForm />
 * </AuthLayout>
 */
export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  backgroundImage,
}) => {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-primary to-secondary"
      style={
        backgroundImage
          ? { backgroundImage: `url(${backgroundImage})` }
          : undefined
      }
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Content container */}
      <div className="relative w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Logo section (optional) */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">Aptoodate</h1>
            <p className="text-text-secondary">Real India. Real Identity.</p>
          </div>

          {/* Form content */}
          {children}
        </div>

        {/* Footer text */}
        <div className="text-center mt-6 text-white text-sm">
          <p>© 2026 Aptoodate. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

AuthLayout.displayName = 'AuthLayout';
