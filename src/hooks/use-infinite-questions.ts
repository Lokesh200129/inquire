import { useInfiniteQuery, InfiniteData } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import api from '@/lib/axios';

export const useInfiniteQuestions = (): TInfiniteQuestionsReturn => {
    const observerTarget = useRef<HTMLDivElement>(null);

    const fetchQuestions = async ({ pageParam = 1, tag = '' }): Promise<TPaginatedResponse> => {
        const response = await api<TApiResponse<TPaginatedResponse>>({
            url: `/fetch-question?page=${pageParam}&limit=10&tag=${tag}`,
            method: "GET"
        });
        return response.data;
    };

    const queryResults = useInfiniteQuery<TPaginatedResponse, Error, InfiniteData<TPaginatedResponse>, [string, string], number>({
        queryKey: ['questions', 'feed'],
        queryFn: fetchQuestions,
        getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
        initialPageParam: 1,
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