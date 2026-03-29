import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { signInRequest } from '@/apis/auth';
import { useAuth } from '@/hooks/context/useAuth';

export const useSignIn = () => {
    const { setAuth } = useAuth();
    const { isSuccess, error, isPending, mutateAsync: signInMutation } = useMutation({
        mutationFn: signInRequest,
        onSuccess: (response) => {
            console.log('Sign in successfully: ', response?.data);
            toast.success('Successfully signed in');

            const userObject = JSON.stringify(response?.data);
            console.log('User object is: ', userObject);
            localStorage.setItem('user', userObject);
            localStorage.setItem('token', response.data?.token);

            setAuth({
                user: response.data,
                token: response.data.token,
                isLoading: false
            });
        },
        onError: (error: unknown) => {
            // Extract the actual message from the backend response body
            const axiosError = error as { response?: { data?: { message?: string } }; message?: string };
            const errorMessage =
                axiosError?.response?.data?.message ||
                (error instanceof Error ? error.message : 'Sign in failed. Please try again.');
            toast.error(errorMessage);
        }
    });

    return {
        isSuccess,
        isPending,
        error,
        signInMutation
    };
};
