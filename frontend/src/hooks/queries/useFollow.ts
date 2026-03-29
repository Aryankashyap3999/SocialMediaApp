import { useQuery } from '@tanstack/react-query';
import { getFollowers, getFollowing, getFollowStats, checkFollowingStatus } from '@/apis/follow';

export const useFollowers = (userId: string, limit: number = 20, skip: number = 0) => {
    return useQuery({
        queryKey: ['followers', userId, limit, skip],
        queryFn: () => getFollowers(userId, limit, skip),
        enabled: !!userId,
    });
};

export const useFollowing = (userId: string, limit: number = 20, skip: number = 0) => {
    return useQuery({
        queryKey: ['following', userId, limit, skip],
        queryFn: () => getFollowing(userId, limit, skip),
        enabled: !!userId,
    });
};

export const useFollowStats = (userId: string) => {
    return useQuery({
        queryKey: ['followStats', userId],
        queryFn: () => getFollowStats(userId),
        enabled: !!userId,
    });
};

export const useFollowingStatus = (userId: string) => {
    return useQuery({
        queryKey: ['followingStatus', userId],
        queryFn: () => checkFollowingStatus(userId),
        enabled: !!userId,
    });
};
