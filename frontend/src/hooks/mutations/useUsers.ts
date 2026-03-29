import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCurrentUser } from '@/apis/users';
import type { UpdateProfileData } from '@/apis/users';
import { useAuth } from '@/hooks/context/useAuth';
import { toast } from 'sonner';
import type { AxiosError } from 'axios';

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    const { auth, setAuth } = useAuth();

    return useMutation({
        mutationFn: (data: UpdateProfileData) => updateCurrentUser(data),
        onSuccess: (response, variables) => {
            // 1. Merge updated fields into the auth context so every component
            //    that reads auth.user (header, sidebar, compose box, etc.) updates
            //    immediately without a page refresh.
            if (auth.user) {
                const updatedUser = {
                    ...auth.user,
                    ...(variables.name      !== undefined && { name:      variables.name }),
                    ...(variables.username  !== undefined && { username:  variables.username }),
                    ...(variables.bio       !== undefined && { bio:       variables.bio }),
                    ...(variables.avatarUrl !== undefined && { avatarUrl: variables.avatarUrl }),
                    // Also pick up any fields returned by the server
                    ...(response?.data?.name      !== undefined && { name:      response.data.name }),
                    ...(response?.data?.username  !== undefined && { username:  response.data.username }),
                    ...(response?.data?.bio       !== undefined && { bio:       response.data.bio }),
                    ...(response?.data?.avatarUrl !== undefined && { avatarUrl: response.data.avatarUrl }),
                };
                setAuth({ ...auth, user: updatedUser });
            }

            // 2. Invalidate every cache that could show this user's name / avatar:
            //    - their own profile page
            //    - the global feed (post author fields)
            //    - every user list (search, discover, followers, following, trending)
            const userId = auth.user?._id;
            queryClient.invalidateQueries({ queryKey: ['currentUser'] });
            if (userId) {
                queryClient.invalidateQueries({ queryKey: ['user', userId] });
                queryClient.invalidateQueries({ queryKey: ['userPosts', userId] });
            }
            // Broad invalidations so follower/following cards, search and
            // discover pages all show fresh data after the update.
            queryClient.invalidateQueries({ queryKey: ['feed'] });
            queryClient.invalidateQueries({ queryKey: ['allUsers'] });
            queryClient.invalidateQueries({ queryKey: ['trending'] });
            queryClient.invalidateQueries({ queryKey: ['search'] });
            queryClient.invalidateQueries({ queryKey: ['followers'] });
            queryClient.invalidateQueries({ queryKey: ['following'] });

            toast.success('Profile updated successfully!');
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error?.response?.data?.message || 'Failed to update profile');
        },
    });
};
