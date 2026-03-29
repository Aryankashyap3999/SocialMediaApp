import axios from '@/config/axiosConfig';

export interface CreateCommentData {
    content: string;
    parentComment?: string;
}

export const createComment = async (postId: string, data: CreateCommentData) => {
    const response = await axios.post(`/comments/post/${postId}`, data);
    return response.data;
};

export const getPostComments = async (postId: string, limit: number = 20, skip: number = 0) => {
    const response = await axios.get(`/comments/post/${postId}?limit=${limit}&skip=${skip}`);
    return response.data;
};

export const getCommentById = async (commentId: string) => {
    const response = await axios.get(`/comments/${commentId}`);
    return response.data;
};

export const getCommentReplies = async (commentId: string, limit: number = 10, skip: number = 0) => {
    const response = await axios.get(`/comments/${commentId}/replies?limit=${limit}&skip=${skip}`);
    return response.data;
};

export const updateComment = async (commentId: string, content: string) => {
    const response = await axios.put(`/comments/${commentId}`, { content });
    return response.data;
};

export const deleteComment = async (commentId: string) => {
    const response = await axios.delete(`/comments/${commentId}`);
    return response.data;
};
