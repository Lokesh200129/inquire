
import { useInfiniteQuery, InfiniteData } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import api from '@/lib/axios';

export const useUserQuestions = (userId?: string): TUserQuestionsReturn => {
    const observerTarget = useRef<HTMLDivElement>(null);

    const fetchMyQuestions = async ({ pageParam = 1 }): Promise<TPaginatedResponse> => {
        if (!userId) {
            return {
                question: [],
                nextPage: null,
                totalPages: 0
            };
        }

        const res = await api<TApiResponse<TPaginatedResponse>>({
            url: `/fetch-question?page=${pageParam}&limit=10&userId=${userId}`,
            method: "GET"
        });
        return res.data;
    };

    const queryResults = useInfiniteQuery<TPaginatedResponse, Error, InfiniteData<TPaginatedResponse>, [string, string, string | undefined], number>({
        queryKey: ['questions', 'profile', userId],
        queryFn: fetchMyQuestions,
        getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
        initialPageParam: 1,
        enabled: !!userId,
        staleTime: 5 * 60 * 1000,
    });

    const { fetchNextPage, hasNextPage, isFetchingNextPage } = queryResults;

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            { threshold: 1.0 }
        );

        const currentTarget = observerTarget.current;
        if (currentTarget) observer.observe(currentTarget);

        return () => {
            if (currentTarget) observer.unobserve(currentTarget);
        };
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    return {
        ...queryResults,
        data: queryResults.data as TInfiniteQuestionsData | undefined,
        observerTarget
    };
};