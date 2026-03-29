import { useQuery } from '@tanstack/react-query';
import { getNotifications, getUnreadNotifications, getUnreadCount } from '@/apis/notifications';

export const useNotifications = (limit: number = 20, skip: number = 0) => {
    return useQuery({
        queryKey: ['notifications', limit, skip],
        queryFn: () => getNotifications(limit, skip),
        refetchInterval: 30000, // Refetch every 30 seconds
    });
};

export const useUnreadNotifications = () => {
    return useQuery({
        queryKey: ['unreadNotifications'],
        queryFn: () => getUnreadNotifications(),
        refetchInterval: 30000, // Refetch every 30 seconds
    });
};

export const useUnreadCount = () => {
    return useQuery({
        queryKey: ['unreadCount'],
        queryFn: () => getUnreadCount(),
        refetchInterval: 30000, // Refetch every 30 seconds
    });
};
