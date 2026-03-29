import { useQuery } from '@tanstack/react-query';
import { search } from '@/apis/search';

export const useSearch = (q: string, type: 'all' | 'users' | 'posts' = 'all', enabled = true) =>
    useQuery({
        queryKey: ['search', q, type],
        queryFn: () => search(q, type),
        enabled: enabled && q.length >= 2,
        staleTime: 1000 * 30,
    });
