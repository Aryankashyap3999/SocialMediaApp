import { useMutation, useQueryClient } from '@tanstack/react-query';
import { echoPost, undoEcho, boostPost } from '@/apis/echo';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

export const useEchoPost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (postId: string) => echoPost(postId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['feed'] });
            queryClient.invalidateQueries({ queryKey: ['userPosts'] });
            toast.success('Drop echoed to your profile');
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error?.response?.data?.message || 'Failed to echo drop');
        }
    });
};

export const useUndoEcho = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (echoId: string) => undoEcho(echoId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['feed'] });
            queryClient.invalidateQueries({ queryKey: ['userPosts'] });
            toast.success('Echo removed');
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error?.response?.data?.message || 'Failed to remove echo');
        }
    });
};

export const useBoostPost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ postId, tier, hours }: { postId: string; tier: 'pulse' | 'flash' | 'broadcast'; hours?: number }) =>
            boostPost(postId, tier, hours),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['feed'] });
            queryClient.invalidateQueries({ queryKey: ['userPosts'] });
            toast.success('Signal boosted!', { description: 'Your drop is now amplified' });
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error?.response?.data?.message || 'Failed to boost signal');
        }
    });
};
