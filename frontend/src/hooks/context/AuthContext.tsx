import { createContext, useState } from 'react';
import type { ReactNode } from 'react';

interface User {
    username: string;
    email: string;
    avatarUrl: string;
    _id: string;
    name?: string;
    bio?: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
}

interface AuthContextType {
    auth: AuthState;
    setAuth: (auth: AuthState) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextProviderProps {
    children: ReactNode;
}

const getInitialAuthState = (): AuthState => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (user && token) {
        try {
            return {
                user: JSON.parse(user),
                token: token,
                isLoading: false
            };
        } catch {
            return {
                user: null,
                token: null,
                isLoading: false
            };
        }
    }
    
    return {
        user: null,
        token: null,
        isLoading: false,
    };
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [auth, setAuth] = useState<AuthState>(getInitialAuthState);

    const handleSetAuth = (next: AuthState) => {
        setAuth(next);
        if (next.user) {
            localStorage.setItem('user', JSON.stringify(next.user));
        }
        if (next.token) {
            localStorage.setItem('token', next.token);
        }
    };

    async function logout() {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setAuth({
            user: null,
            token: null,
            isLoading: false
        });
    }

    return (
        <AuthContext.Provider value={{ auth, setAuth: handleSetAuth, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
