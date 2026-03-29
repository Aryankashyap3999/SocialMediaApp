import axios from '@/config/axiosConfig';

export interface CreateStoryData {
    media: {
        type: 'image' | 'video';
        url: string;
        duration?: number;
    };
    caption?: string;
}

export const createStory = async (data: CreateStoryData) => {
    const response = await axios.post('/stories', data);
    return response.data;
};

export const getActiveStories = async (limit: number = 20, skip: number = 0) => {
    const response = await axios.get(`/stories?limit=${limit}&skip=${skip}`);
    return response.data;
};

export const getUserStories = async (userId: string) => {
    const response = await axios.get(`/stories/user/${userId}`);
    return response.data;
};

export const getStoryById = async (storyId: string) => {
    const response = await axios.get(`/stories/${storyId}`);
    return response.data;
};

export const viewStory = async (storyId: string) => {
    const response = await axios.post(`/stories/${storyId}/view`);
    return response.data;
};

export const deleteStory = async (storyId: string) => {
    const response = await axios.delete(`/stories/${storyId}`);
    return response.data;
};
