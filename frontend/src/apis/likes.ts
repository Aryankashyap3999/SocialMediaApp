import axios from '@/config/axiosConfig';

export const likePost = async (postId: string) => {
    const response = await axios.post(`/likes/${postId}`);
    return response.data;
};

export const unlikePost = async (postId: string) => {
    const response = await axios.delete(`/likes/${postId}`);
    return response.data;
};

export const getPostLikes = async (postId: string, limit: number = 20, skip: number = 0) => {
    const response = await axios.get(`/likes/post/${postId}?limit=${limit}&skip=${skip}`);
    return response.data;
};

export const getUserLikes = async (userId: string, limit: number = 20, skip: number = 0) => {
    const response = await axios.get(`/likes/user/${userId}?limit=${limit}&skip=${skip}`);
    return response.data;
};

export const checkLikeStatus = async (postId: string) => {
    const response = await axios.get(`/likes/check/${postId}`);
    return response.data;
};
