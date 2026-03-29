import { useQuery } from '@tanstack/react-query';
import { getPostComments, getCommentReplies } from '@/apis/comments';

export const usePostComments = (postId: string, limit: number = 20, skip: number = 0) => {
    return useQuery({
        queryKey: ['comments', postId, limit, skip],
        queryFn: () => getPostComments(postId, limit, skip),
        enabled: !!postId,
    });
};

export const useCommentReplies = (commentId: string, limit: number = 10, skip: number = 0) => {
    return useQuery({
        queryKey: ['replies', commentId, limit, skip],
        queryFn: () => getCommentReplies(commentId, limit, skip),
        enabled: !!commentId,
    });
};
