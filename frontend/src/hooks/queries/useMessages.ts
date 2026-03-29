import { useQuery } from '@tanstack/react-query';
import { getUserConversations, getConversationMessages } from '@/apis/conversations';

export const useConversations = (limit: number = 20, skip: number = 0) => {
    return useQuery({
        queryKey: ['conversations', limit, skip],
        queryFn: () => getUserConversations(limit, skip),
        refetchInterval: 10000, // Refetch every 10 seconds for real-time updates
    });
};

export const useMessages = (conversationId: string, limit: number = 50, skip: number = 0) => {
    return useQuery({
        queryKey: ['messages', conversationId, limit, skip],
        queryFn: () => getConversationMessages(conversationId, limit, skip),
        enabled: !!conversationId,
        refetchInterval: 5000, // Refetch every 5 seconds for real-time updates
    });
};
