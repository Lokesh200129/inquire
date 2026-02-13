
// import { useInfiniteQuery } from '@tanstack/react-query';
// import { useEffect, useRef } from 'react';
// import api from '@/lib/axios';

// export const useInfiniteQuestions = () => {
//     const observerTarget = useRef(null);

//     const fetchQuestions = async ({ pageParam = 1 }) => {
//         const res = await api({
//             url: `/fetch-question?page=${pageParam}&limit=10`,
//             method: "GET"
//         });
//         return res;
//     };

//     const queryResults = useInfiniteQuery({
//         queryKey: ['questions', 'feed'],
//         queryFn: fetchQuestions,
//         getNextPageParam: (lastPage) => lastPage.nextPage,
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

//         if (observerTarget.current) {
//             observer.observe(observerTarget.current);
//         }
//         return () => {
//             if (observerTarget.current) {
//                 observer.unobserve(observerTarget.current);
//             }
//         };
//     }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

//     return { ...queryResults, observerTarget };
// };