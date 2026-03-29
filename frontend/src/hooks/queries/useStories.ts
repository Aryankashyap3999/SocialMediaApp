import { useQuery } from '@tanstack/react-query';
import { getActiveStories, getUserStories } from '@/apis/stories';

export const useActiveStories = (limit: number = 20, skip: number = 0) => {
    return useQuery({
        queryKey: ['stories', limit, skip],
        queryFn: () => getActiveStories(limit, skip),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

export const useUserStories = (userId: string) => {
    return useQuery({
        queryKey: ['userStories', userId],
        queryFn: () => getUserStories(userId),
        enabled: !!userId,
    });
};
