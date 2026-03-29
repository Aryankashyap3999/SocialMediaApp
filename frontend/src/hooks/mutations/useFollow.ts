import { useMutation, useQueryClient } from '@tanstack/react-query';
import { followUser, unfollowUser } from '@/apis/follow';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

export const useFollowUser = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (userId: string) => followUser(userId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['followers'] });
            queryClient.invalidateQueries({ queryKey: ['following'] });
            queryClient.invalidateQueries({ queryKey: ['followStats'] });
            queryClient.invalidateQueries({ queryKey: ['followingStatus'] });
            queryClient.invalidateQueries({ queryKey: ['users'] });
            toast.success('User followed successfully!');
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error?.response?.data?.message || 'Failed to follow user');
        }
    });
};

export const useUnfollowUser = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (userId: string) => unfollowUser(userId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['followers'] });
            queryClient.invalidateQueries({ queryKey: ['following'] });
            queryClient.invalidateQueries({ queryKey: ['followStats'] });
            queryClient.invalidateQueries({ queryKey: ['followingStatus'] });
            queryClient.invalidateQueries({ queryKey: ['users'] });
            toast.success('User unfollowed successfully!');
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error?.response?.data?.message || 'Failed to unfollow user');
        }
    });
};
