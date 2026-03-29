import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost, updatePost, deletePost } from '@/apis/posts';
import type { CreatePostData, UpdatePostData } from '@/apis/posts';
import { toast } from 'sonner';
import type { AxiosError } from 'axios';

export const useCreatePost = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (data: CreatePostData) => createPost(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['feed'] });
            toast.success('Post created successfully!');
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error?.response?.data?.message || 'Failed to create post');
        }
    });
};

export const useUpdatePost = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ postId, data }: { postId: string; data: UpdatePostData }) => 
            updatePost(postId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['feed'] });
            queryClient.invalidateQueries({ queryKey: ['post'] });
            toast.success('Post updated successfully!');
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error?.response?.data?.message || 'Failed to update post');
        }
    });
};

export const useDeletePost = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (postId: string) => deletePost(postId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['feed'] });
            queryClient.invalidateQueries({ queryKey: ['userPosts'] });
            toast.success('Post deleted successfully!');
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error?.response?.data?.message || 'Failed to delete post');
        }
    });
};
