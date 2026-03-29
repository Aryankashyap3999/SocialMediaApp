import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createComment, updateComment, deleteComment } from '@/apis/comments';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import type { CreateCommentData } from '@/apis/comments';

export const useCreateComment = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ postId, data }: { postId: string; data: CreateCommentData }) => 
            createComment(postId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments'] });
            queryClient.invalidateQueries({ queryKey: ['post'] });
            toast.success('Comment added successfully!');
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error?.response?.data?.message || 'Failed to add comment');
        }
    });
};

export const useUpdateComment = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ commentId, content }: { commentId: string; content: string }) => 
            updateComment(commentId, content),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments'] });
            toast.success('Comment updated successfully!');
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error?.response?.data?.message || 'Failed to update comment');
        }
    });
};

export const useDeleteComment = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (commentId: string) => deleteComment(commentId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments'] });
            queryClient.invalidateQueries({ queryKey: ['post'] });
            toast.success('Comment deleted successfully!');
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error?.response?.data?.message || 'Failed to delete comment');
        }
    });
};
