import axios from '@/config/axiosConfig';

export const createConversation = async (otherUserId: string) => {
    const response = await axios.post('/conversations', { otherUserId });
    return response.data;
};

export const getUserConversations = async (limit: number = 20, skip: number = 0) => {
    const response = await axios.get(`/conversations?limit=${limit}&skip=${skip}`);
    return response.data;
};

export const getConversationById = async (conversationId: string) => {
    const response = await axios.get(`/conversations/${conversationId}`);
    return response.data;
};

export const deleteConversation = async (conversationId: string) => {
    const response = await axios.delete(`/conversations/${conversationId}`);
    return response.data;
};

export const sendMessage = async (conversationId: string, content: string) => {
    const response = await axios.post(`/conversations/${conversationId}/messages`, { content });
    return response.data;
};

export const getConversationMessages = async (conversationId: string, limit: number = 50, skip: number = 0) => {
    const response = await axios.get(`/conversations/${conversationId}/messages?limit=${limit}&skip=${skip}`);
    return response.data;
};

export const markConversationAsRead = async (conversationId: string) => {
    const response = await axios.patch(`/conversations/${conversationId}/read`);
    return response.data;
};

export const deleteMessage = async (messageId: string) => {
    const response = await axios.delete(`/conversations/messages/${messageId}`);
    return response.data;
};
