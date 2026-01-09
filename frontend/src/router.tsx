import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthLayout, MainLayout } from '@components/layouts';
import { SignInContainer, SignUpContainer } from '@pages/auth';
import { DiscoverPage } from '@pages/discover';
import { HomePage } from '@pages/home';
import { MessagesPage } from '@pages/messages';
import { NotificationsPage } from '@pages/notifications';
import { ProfilePage } from '@pages/profile';
import { SettingsPage } from '@pages/settings';

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

export const Router = () => {
    return (
        <Routes>
            {/* Redirect root to home */}
            <Route path="/" element={<Navigate to="/home" replace />} />
            
            {/* Main App Routes */}
            <Route path="/home" element={<MainLayout><HomePage /></MainLayout>} />
            <Route path="/discover" element={<MainLayout><DiscoverPage /></MainLayout>} />
            <Route path="/stories" element={<MainLayout><div className="p-8"><h1 className="text-2xl font-bold">Stories</h1><p className="text-gray-500 mt-2">Watch stories from people you follow</p></div></MainLayout>} />
            <Route path="/messages" element={<MainLayout><MessagesPage /></MainLayout>} />
            <Route path="/notifications" element={<MainLayout><NotificationsPage /></MainLayout>} />
            <Route path="/profile" element={<MainLayout><ProfilePage /></MainLayout>} />
            <Route path="/profile/:userId" element={<MainLayout><ProfilePage /></MainLayout>} />
            <Route path="/settings" element={<MainLayout><SettingsPage /></MainLayout>} />
            
            {/* Auth Routes */}
            <Route path="/auth/signin" element={<AuthLayout><SignInContainer /></AuthLayout>} />
            <Route path="/auth/signup" element={<AuthLayout><SignUpContainer /></AuthLayout>} />
        </Routes>
    )
}

