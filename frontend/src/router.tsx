import { Route, Routes } from 'react-router-dom';
import { AuthLayout } from '@components/layouts';
import { SignInContainer, SignUpContainer } from '@pages/auth';

/**
 * Application Router Configuration
 * 
 * Route structure:
 * - /auth/signin - Sign in page with AuthLayout
 * - /auth/signup - Sign up page (full page layout)
 * - / - Redirect to signin
 * - * - Catch all redirect to signin
 * 
 * Layout integration:
 * - Auth routes use AuthLayout for centered form display
 * 
 * Note: RouterProvider is configured in main.tsx
 */

export const Router = () => {
    return (
        <Routes>
            <Route path="/auth/signin" element={<AuthLayout><SignInContainer /></AuthLayout>} />
            <Route path="/auth/signup" element={<AuthLayout><SignUpContainer /></AuthLayout>} />
        </Routes>
    )
}

