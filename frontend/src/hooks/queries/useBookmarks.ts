import { useQuery } from '@tanstack/react-query';
import { getUserBookmarks, checkBookmark } from '@/apis/bookmarks';

export const useUserBookmarks = (limit = 20, skip = 0) =>
    useQuery({
        queryKey: ['bookmarks', limit, skip],
        queryFn: () => getUserBookmarks(limit, skip),
    });

export const useCheckBookmark = (postId: string) =>
    useQuery({
        queryKey: ['bookmarkStatus', postId],
        queryFn: () => checkBookmark(postId),
        enabled: !!postId,
        staleTime: 1000 * 60,
    });
