import axios from '@/config/axiosConfig';

export interface CreatePostData {
    content: string;
    type: 'post' | 'story' | 'reel' | 'poll' | 'live';
    visibility: 'public' | 'private' | 'followers';
    media?: {
        type: 'image' | 'video';
        url: string;
        aspectRatio?: string;
        duration?: string;
    };
    tags?: string[];
}

export interface UpdatePostData {
    content?: string;
    visibility?: 'public' | 'private' | 'followers';
}

export const createPost = async (data: CreatePostData) => {
    const response = await axios.post('/posts', data);
    console.log('Create Post Response:', response); 
    return response.data;
};

export const getFeed = async (limit: number = 20, skip: number = 0) => {
    const response = await axios.get(`/posts/feed?limit=${limit}&skip=${skip}`);
    return response.data;
};

export const getPostById = async (postId: string) => {
    const response = await axios.get(`/posts/${postId}`);
    return response.data;
};

export const getUserPosts = async (userId: string, limit: number = 20, skip: number = 0) => {
    const response = await axios.get(`/posts/user/${userId}?limit=${limit}&skip=${skip}`);
    return response.data;
};

export const updatePost = async (postId: string, data: UpdatePostData) => {
    const response = await axios.put(`/posts/${postId}`, data);
    return response.data;
};

export const deletePost = async (postId: string) => {
    const response = await axios.delete(`/posts/${postId}`);
    return response.data;
};
