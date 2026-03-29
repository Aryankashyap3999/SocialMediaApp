import axiosInstance from '@/config/axiosConfig';

export const bookmarkPost = (postId: string) =>
    axiosInstance.post(`/bookmarks/${postId}`).then(r => r.data);

export const unbookmarkPost = (postId: string) =>
    axiosInstance.delete(`/bookmarks/${postId}`).then(r => r.data);

export const getUserBookmarks = (limit = 20, skip = 0) =>
    axiosInstance.get('/bookmarks', { params: { limit, skip } }).then(r => r.data);

export const checkBookmark = (postId: string) =>
    axiosInstance.get(`/bookmarks/check/${postId}`).then(r => r.data);
