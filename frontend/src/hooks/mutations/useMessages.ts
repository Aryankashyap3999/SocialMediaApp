import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sendMessage, deleteMessage, markConversationAsRead, createConversation } from '@/apis/conversations';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

export const useSendMessage = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ conversationId, content }: { conversationId: string; content: string }) => 
            sendMessage(conversationId, content),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['messages'] });
            queryClient.invalidateQueries({ queryKey: ['conversations'] });
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error?.response?.data?.message || 'Failed to send message');
        }
    });
};

export const useDeleteMessage = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (messageId: string) => deleteMessage(messageId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['messages'] });
            toast.success('Message deleted successfully!');
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error?.response?.data?.message || 'Failed to delete message');
        }
    });
};

export const useMarkConversationAsRead = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (conversationId: string) => markConversationAsRead(conversationId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['conversations'] });
            queryClient.invalidateQueries({ queryKey: ['messages'] });
        },
        onError: (error: AxiosError<{ message: string }>) => {
            console.error('Failed to mark conversation as read:', error);
        }
    });
};

export const useCreateConversation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (otherUserId: string) => createConversation(otherUserId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['conversations'] });
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error?.response?.data?.message || 'Failed to start conversation');
        }
    });
};
