import { useMutation, useQueryClient } from '@tanstack/react-query';
import { likePost, unlikePost } from '@/apis/likes';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

export const useLikePost = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (postId: string) => likePost(postId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['feed'] });
            queryClient.invalidateQueries({ queryKey: ['post'] });
            queryClient.invalidateQueries({ queryKey: ['likes'] });
            queryClient.invalidateQueries({ queryKey: ['userPosts'] });
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error?.response?.data?.message || 'Failed to like post');
        }
    });
};

export const useUnlikePost = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (postId: string) => unlikePost(postId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['feed'] });
            queryClient.invalidateQueries({ queryKey: ['post'] });
            queryClient.invalidateQueries({ queryKey: ['likes'] });
            queryClient.invalidateQueries({ queryKey: ['userPosts'] });
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error?.response?.data?.message || 'Failed to unlike post');
        }
    });
};
