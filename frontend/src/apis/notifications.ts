import axios from '@/config/axiosConfig';

export const getNotifications = async (limit: number = 20, skip: number = 0) => {
    const response = await axios.get(`/notifications?limit=${limit}&skip=${skip}`);
    return response.data;
};

export const getUnreadNotifications = async () => {
    const response = await axios.get('/notifications/unread');
    return response.data;
};

export const getUnreadCount = async () => {
    const response = await axios.get('/notifications/unread/count');
    return response.data;
};

export const markNotificationAsRead = async (notificationId: string) => {
    const response = await axios.patch(`/notifications/${notificationId}/read`);
    return response.data;
};

export const markAllNotificationsAsRead = async () => {
    const response = await axios.patch('/notifications/read-all');
    return response.data;
};

export const deleteNotification = async (notificationId: string) => {
    const response = await axios.delete(`/notifications/${notificationId}`);
    return response.data;
};

export const deleteAllNotifications = async () => {
    const response = await axios.delete('/notifications');
    return response.data;
};
