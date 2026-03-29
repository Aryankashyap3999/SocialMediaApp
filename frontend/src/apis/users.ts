import axios from '@/config/axiosConfig';

export interface UpdateProfileData {
    name?: string;
    username?: string;
    bio?: string;
    avatarUrl?: string;
}

export const getCurrentUser = async () => {
    const response = await axios.get('/users/me');
    return response.data;
};

export const getUserById = async (userId: string) => {
    const response = await axios.get(`/users/${userId}`);
    return response.data;
};

export const updateCurrentUser = async (data: UpdateProfileData) => {
    const response = await axios.put('/users/me', data);
    return response.data;
};

export const getAllUsers = async () => {
    const response = await axios.get('/users');
    return response.data;
};
