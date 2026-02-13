// import { useInfiniteQuery } from '@tanstack/react-query';
// import { useEffect, useRef } from 'react';
// import api from '@/lib/axios';

// export const useInfiniteQuestions = (): TInfiniteQuestionsReturn => {
//     const observerTarget = useRef<HTMLDivElement>(null);

//     const fetchQuestions = async ({ pageParam }: { pageParam: number }) => {
//         const res = await api({
//             url: `/fetch-question?page=${pageParam}&limit=10`,
//             method: "GET"
//         });
//         return res;
//     };

//     const queryResults = useInfiniteQuery({
//         queryKey: ['questions', 'feed'],
//         queryFn: fetchQuestions,
//         getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.currentPage + 1 : undefined,
//         initialPageParam: 1,
//         staleTime: 5 * 60 * 1000,
//     });

//     const { fetchNextPage, hasNextPage, isFetchingNextPage } = queryResults;

//     useEffect(() => {
//         const observer = new IntersectionObserver(
//             (entries) => {
//                 if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
//                     fetchNextPage();
//                 }
//             },
//             { threshold: 1.0 }
//         );

//         const currentTarget = observerTarget.current;

//         if (currentTarget) {
//             observer.observe(currentTarget);
//         }

//         return () => {
//             if (currentTarget) {
//                 observer.unobserve(currentTarget);
//             }
//         };
//     }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

//     return { ...queryResults, observerTarget };
// };
import { useInfiniteQuery, InfiniteData } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import api from '@/lib/axios';

export const useInfiniteQuestions = (): TInfiniteQuestionsReturn => {
    const observerTarget = useRef<HTMLDivElement>(null);

    // 1. Explicitly type the fetch function to return your Paginated Response
    const fetchQuestions = async ({ pageParam = 1 }): Promise<TPaginatedResponse> => {
        const response = await api<TApiResponse<TPaginatedResponse>>({
            url: `/fetch-question?page=${pageParam}&limit=10`,
            method: "GET"
        });
        // Your axios helper returns response.data, so we return the inner 'data' field
        return response.data;
    };

    // 2. Pass types to useInfiniteQuery: <TQueryFnData, TError, TData, TQueryKey, TPageParam>
    const queryResults = useInfiniteQuery<TPaginatedResponse, Error, InfiniteData<TPaginatedResponse>, [string, string], number>({
        queryKey: ['questions', 'feed'],
        queryFn: fetchQuestions,
        // Using your TPaginatedResponse structure (nextPage)
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

    // Cast as TInfiniteQuestionsReturn to satisfy your specific interface requirements
    return {
        ...queryResults,
        data: queryResults.data as TInfiniteQuestionsData | undefined,
        observerTarget
    };
};