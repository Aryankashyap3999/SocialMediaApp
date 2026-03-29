import axiosInstance from '@/config/axiosConfig';

export const echoPost = (postId: string) =>
    axiosInstance.post(`/echo/${postId}`).then(r => r.data);

export const undoEcho = (echoId: string) =>
    axiosInstance.delete(`/echo/${echoId}`).then(r => r.data);

export const boostPost = (postId: string, tier: 'pulse' | 'flash' | 'broadcast', hours = 24) =>
    axiosInstance.post(`/echo/${postId}/boost`, { tier, hours }).then(r => r.data);
