import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { signUpRequest } from '@/apis/auth';

export const useSignUp = () => {
    const { isSuccess, error, isPending, mutateAsync: signUpMutation } = useMutation({
        mutationFn: signUpRequest,
        onSuccess: (data) => {
            console.log('Sign up successfully: ', data);
            toast.success('Successfully signed up! Please check your email to verify your account.');
        },
        onError: (error) => {
            console.log('Failed to signup ', error);
            const errorMessage = error instanceof Error ? error.message : 'Error, signup failed';
            toast.error(errorMessage);
        }
    });

    return {
        isSuccess,
        isPending,
        error,
        signUpMutation
    };
};
