import { useQuery } from '@tanstack/react-query';
import { getFeed, getPostById, getUserPosts } from '@/apis/posts';

export const useFeed = (limit: number = 20, skip: number = 0) => {
    return useQuery({
        queryKey: ['feed', limit, skip],
        queryFn: () => getFeed(limit, skip),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

export const usePost = (postId: string) => {
    return useQuery({
        queryKey: ['post', postId],
        queryFn: () => getPostById(postId),
        enabled: !!postId,
    });
};

export const useUserPosts = (userId: string, limit: number = 20, skip: number = 0) => {
    return useQuery({
        queryKey: ['userPosts', userId, limit, skip],
        queryFn: () => getUserPosts(userId, limit, skip),
        enabled: !!userId,
    });
};
