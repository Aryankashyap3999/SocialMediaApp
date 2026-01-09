import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthLayout, MainLayout } from '@components/layouts';
import { SignInContainer, SignUpContainer } from '@pages/auth';
import { HomePage } from '@pages/home';
import { ProfilePage } from '@pages/profile';

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
            <Route path="/discover" element={<MainLayout><div className="p-8"><h1 className="text-2xl font-bold">Discover</h1><p className="text-gray-500 mt-2">Explore trending content</p></div></MainLayout>} />
            <Route path="/stories" element={<MainLayout><div className="p-8"><h1 className="text-2xl font-bold">Stories</h1><p className="text-gray-500 mt-2">Watch stories from people you follow</p></div></MainLayout>} />
            <Route path="/messages" element={<MainLayout><div className="p-8"><h1 className="text-2xl font-bold">Messages</h1><p className="text-gray-500 mt-2">Your direct messages</p></div></MainLayout>} />
            <Route path="/notifications" element={<MainLayout><div className="p-8"><h1 className="text-2xl font-bold">Notifications</h1><p className="text-gray-500 mt-2">Stay updated with your activity</p></div></MainLayout>} />
            <Route path="/profile" element={<MainLayout><ProfilePage /></MainLayout>} />
            <Route path="/profile/:userId" element={<MainLayout><ProfilePage /></MainLayout>} />
            <Route path="/settings" element={<MainLayout><div className="p-8"><h1 className="text-2xl font-bold">Settings</h1><p className="text-gray-500 mt-2">Manage your preferences</p></div></MainLayout>} />
            
            {/* Auth Routes */}
            <Route path="/auth/signin" element={<AuthLayout><SignInContainer /></AuthLayout>} />
            <Route path="/auth/signup" element={<AuthLayout><SignUpContainer /></AuthLayout>} />
        </Routes>
    )
}

