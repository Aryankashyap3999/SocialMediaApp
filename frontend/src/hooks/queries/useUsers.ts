import { useQuery } from '@tanstack/react-query';
import { getCurrentUser, getUserById, getAllUsers } from '@/apis/users';

export const useCurrentUser = () => {
    return useQuery({
        queryKey: ['currentUser'],
        queryFn: getCurrentUser,
        staleTime: 1000 * 60 * 5,
    });
};

export const useUserById = (userId: string) => {
    return useQuery({
        queryKey: ['user', userId],
        queryFn: () => getUserById(userId),
        enabled: !!userId,
    });
};

export const useAllUsers = () => {
    return useQuery({
        queryKey: ['allUsers'],
        queryFn: getAllUsers,
        staleTime: 1000 * 60 * 5,
    });
};
