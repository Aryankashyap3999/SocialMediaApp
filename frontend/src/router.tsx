import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthLayout, MainLayout } from '@components/layouts';
import { SignInContainer, SignUpContainer } from '@pages/auth';
import { ForgotPasswordPage } from '@pages/auth/ForgotPasswordPage';
import { DiscoverPage } from '@pages/discover';
import { HomePage } from '@pages/home';
import { MessagesPage } from '@pages/messages';
import { NotificationsPage } from '@pages/notifications';
import { ProfilePage } from '@pages/profile';
import { SettingsPage } from '@pages/settings';
import { StoriesPage } from '@pages/stories';
import { BookmarksPage } from './pages/bookmarks/BookmarksPage';
import { useAuth } from '@/hooks/context/useAuth';

/**
 * Application Router Configuration
 * 
 * Route structure:
 * - /home - Main feed page with MainLayout
 * - /discover - Discover/explore content
 * - /stories - Stories/reels content
 * - /messages - Direct messages
 * - /notifications - User notifications
 * - /profile - User profile
 * - /auth/signin - Sign in page with AuthLayout
 * - /auth/signup - Sign up page with AuthLayout
 * - / - Redirect to home
 * 
 * Layout integration:
 * - Auth routes use AuthLayout for centered form display
 * - Main routes use MainLayout with sidebar navigation
 */

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { auth } = useAuth();
    if (!auth.token) {
        return <Navigate to="/auth/signin" replace />;
    }
    return <>{children}</>;
};

export const Router = () => {
    return (
        <Routes>
            {/* Redirect root to home */}
            <Route path="/" element={<Navigate to="/home" replace />} />

            {/* Main App Routes */}
            <Route path="/home" element={<ProtectedRoute><MainLayout><HomePage /></MainLayout></ProtectedRoute>} />
            <Route path="/discover" element={<ProtectedRoute><MainLayout><DiscoverPage /></MainLayout></ProtectedRoute>} />
            <Route path="/stories" element={<ProtectedRoute><MainLayout><StoriesPage /></MainLayout></ProtectedRoute>} />
            <Route path="/messages" element={<ProtectedRoute><MainLayout><MessagesPage /></MainLayout></ProtectedRoute>} />
            <Route path="/notifications" element={<ProtectedRoute><MainLayout><NotificationsPage /></MainLayout></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><MainLayout><ProfilePage /></MainLayout></ProtectedRoute>} />
            <Route path="/profile/:userId" element={<ProtectedRoute><MainLayout><ProfilePage /></MainLayout></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><MainLayout><SettingsPage /></MainLayout></ProtectedRoute>} />
            <Route path="/bookmarks" element={<ProtectedRoute><MainLayout><BookmarksPage /></MainLayout></ProtectedRoute>} />

            {/* Auth Routes */}
            <Route path="/auth/signin" element={<AuthLayout><SignInContainer /></AuthLayout>} />
            <Route path="/auth/signup" element={<AuthLayout><SignUpContainer /></AuthLayout>} />
            <Route path="/forgot-password" element={<AuthLayout><ForgotPasswordPage /></AuthLayout>} />
        </Routes>
    )
}

