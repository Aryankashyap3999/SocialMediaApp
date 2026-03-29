import axios from '@/config/axiosConfig';

interface SignUpData {
    email: string;
    password: string;
    username: string;
    bio?: string;
}

interface SignInData {
    email: string;
    password: string;
}

interface VerifyEmailData {
    email: string;
    token: string;
}

export const signUpRequest = async ({ email, password, username, bio }: SignUpData) => {
    try {
        const response = await axios.post('/users/signup', {
            email,
            password,
            username,
            bio: bio || ''
        });
        return response?.data;
    } catch (error) {
        console.log('Error at signup api:', error);
        throw error;
    }
};

export const verifyEmailRequest = async ({ email, token }: VerifyEmailData) => {
    try {
        const response = await axios.post('/users/verify', {
            email,
            token
        });
        return response?.data;
    } catch (error) {
        console.log('Error at verify email api:', error);
        throw error;
    }
};

export const resetPasswordRequest = async ({ email, newPassword }: { email: string; newPassword: string }) => {
    const response = await axios.post('/users/reset-password', { email, newPassword });
    return response?.data;
};

export const signInRequest = async ({ email, password }: SignInData) => {
    try {
        const response = await axios.post('/users/signin', {
            email,
            password
        });
        return response?.data;
    } catch (error) {
        console.log('Error at signin api:', error);
        throw error;
    }
};
