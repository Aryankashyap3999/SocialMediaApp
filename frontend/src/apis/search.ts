import axiosInstance from '@/config/axiosConfig';

export const search = (q: string, type: 'all' | 'users' | 'posts' = 'all', limit = 20, skip = 0) =>
    axiosInstance.get('/search', { params: { q, type, limit, skip } }).then(r => r.data);
