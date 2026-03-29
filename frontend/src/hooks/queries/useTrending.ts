import { useQuery } from '@tanstack/react-query';
import { getTrendingPosts, getTrendingTags, getTrendingUsers, getBoostedPosts } from '@/apis/trending';

export const useTrendingPosts = (limit = 20) =>
    useQuery({
        queryKey: ['trending', 'posts', limit],
        queryFn: () => getTrendingPosts(limit),
        staleTime: 1000 * 60 * 2, // 2 minutes
    });

export const useTrendingTags = (limit = 20) =>
    useQuery({
        queryKey: ['trending', 'tags', limit],
        queryFn: () => getTrendingTags(limit),
        staleTime: 1000 * 60 * 5,
    });

export const useTrendingUsers = (limit = 10) =>
    useQuery({
        queryKey: ['trending', 'users', limit],
        queryFn: () => getTrendingUsers(limit),
        staleTime: 1000 * 60 * 5,
    });

export const useBoostedPosts = (limit = 10) =>
    useQuery({
        queryKey: ['trending', 'boosted', limit],
        queryFn: () => getBoostedPosts(limit),
        staleTime: 1000 * 60,
    });
