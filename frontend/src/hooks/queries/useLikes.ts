import { useQuery } from '@tanstack/react-query';
import { getPostLikes, getUserLikes, checkLikeStatus } from '@/apis/likes';

export const usePostLikes = (postId: string, limit: number = 20, skip: number = 0) => {
    return useQuery({
        queryKey: ['likes', postId, limit, skip],
        queryFn: () => getPostLikes(postId, limit, skip),
        enabled: !!postId,
    });
};

export const useLikeStatus = (postId: string) => {
    return useQuery({
        queryKey: ['likeStatus', postId],
        queryFn: () => checkLikeStatus(postId),
        enabled: !!postId,
    });
};

export const useUserLikes = (userId: string, limit: number = 20, skip: number = 0) => {
    return useQuery({
        queryKey: ['userLikes', userId, limit, skip],
        queryFn: () => getUserLikes(userId, limit, skip),
        enabled: !!userId,
    });
};
