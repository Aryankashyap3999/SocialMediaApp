import { useMutation, useQueryClient } from '@tanstack/react-query';
import { bookmarkPost, unbookmarkPost } from '@/apis/bookmarks';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

export const useBookmarkPost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (postId: string) => bookmarkPost(postId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
            queryClient.invalidateQueries({ queryKey: ['bookmarkStatus'] });
            toast.success('Drop saved to bookmarks');
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error?.response?.data?.message || 'Failed to bookmark');
        }
    });
};

export const useUnbookmarkPost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (postId: string) => unbookmarkPost(postId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
            queryClient.invalidateQueries({ queryKey: ['bookmarkStatus'] });
            toast.success('Bookmark removed');
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error?.response?.data?.message || 'Failed to remove bookmark');
        }
    });
};
