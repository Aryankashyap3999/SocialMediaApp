import axiosInstance from '@/config/axiosConfig';

export const getTrendingPosts = (limit = 20) =>
    axiosInstance.get('/trending/posts', { params: { limit } }).then(r => r.data);

export const getTrendingTags = (limit = 20) =>
    axiosInstance.get('/trending/tags', { params: { limit } }).then(r => r.data);

export const getTrendingUsers = (limit = 10) =>
    axiosInstance.get('/trending/users', { params: { limit } }).then(r => r.data);

export const getBoostedPosts = (limit = 10) =>
    axiosInstance.get('/trending/boosted', { params: { limit } }).then(r => r.data);
