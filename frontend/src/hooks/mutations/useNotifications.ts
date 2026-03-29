import { useMutation, useQueryClient } from '@tanstack/react-query';
import { markNotificationAsRead, markAllNotificationsAsRead, deleteNotification, deleteAllNotifications } from '@/apis/notifications';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

export const useMarkNotificationAsRead = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: markNotificationAsRead,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
            queryClient.invalidateQueries({ queryKey: ['unreadNotifications'] });
            queryClient.invalidateQueries({ queryKey: ['unreadCount'] });
        },
        onError: (error: AxiosError<{ message: string }>) => {
            console.error('Failed to mark notification as read:', error);
        },
    });
};

export const useMarkAllNotificationsAsRead = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: markAllNotificationsAsRead,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
            queryClient.invalidateQueries({ queryKey: ['unreadNotifications'] });
            queryClient.invalidateQueries({ queryKey: ['unreadCount'] });
            toast.success('All notifications marked as read');
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error.response?.data?.message || 'Failed to mark all as read');
        },
    });
};

export const useDeleteNotification = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteNotification,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
            queryClient.invalidateQueries({ queryKey: ['unreadNotifications'] });
            queryClient.invalidateQueries({ queryKey: ['unreadCount'] });
            toast.success('Notification deleted');
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error.response?.data?.message || 'Failed to delete notification');
        },
    });
};

export const useDeleteAllNotifications = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteAllNotifications,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
            queryClient.invalidateQueries({ queryKey: ['unreadNotifications'] });
            queryClient.invalidateQueries({ queryKey: ['unreadCount'] });
            toast.success('All notifications deleted');
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error.response?.data?.message || 'Failed to delete all notifications');
        },
    });
};
