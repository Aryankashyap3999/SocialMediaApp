import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createStory, deleteStory, viewStory } from '@/apis/stories';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

export const useCreateStory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createStory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['stories'] });
            queryClient.invalidateQueries({ queryKey: ['userStories'] });
            toast.success('Story created successfully');
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error.response?.data?.message || 'Failed to create story');
        },
    });
};

export const useDeleteStory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteStory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['stories'] });
            queryClient.invalidateQueries({ queryKey: ['userStories'] });
            toast.success('Story deleted successfully');
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error.response?.data?.message || 'Failed to delete story');
        },
    });
};

export const useViewStory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: viewStory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['stories'] });
        },
        onError: (error: AxiosError<{ message: string }>) => {
            console.error('Failed to mark story as viewed:', error);
        },
    });
};
