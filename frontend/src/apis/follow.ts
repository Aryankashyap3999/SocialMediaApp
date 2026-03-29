import axios from '@/config/axiosConfig';

export const followUser = async (userId: string) => {
    const response = await axios.post(`/follow/${userId}`);
    return response.data;
};

export const unfollowUser = async (userId: string) => {
    const response = await axios.delete(`/follow/${userId}`);
    return response.data;
};

export const getFollowers = async (userId: string, limit: number = 20, skip: number = 0) => {
    const response = await axios.get(`/follow/followers/${userId}?limit=${limit}&skip=${skip}`);
    return response.data;
};

export const getFollowing = async (userId: string, limit: number = 20, skip: number = 0) => {
    const response = await axios.get(`/follow/following/${userId}?limit=${limit}&skip=${skip}`);
    return response.data;
};

export const getFollowStats = async (userId: string) => {
    const response = await axios.get(`/follow/stats/${userId}`);
    return response.data;
};

export const checkFollowingStatus = async (userId: string) => {
    const response = await axios.get(`/follow/check/${userId}`);
    return response.data;
};
