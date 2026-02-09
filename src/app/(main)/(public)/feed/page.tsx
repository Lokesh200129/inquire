"use client"
import PostCard from '@/components/post-card'
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { AvatarImage } from '@/components/ui/avatar';
import { AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useUserStore } from '@/store/useUserStore';
import AuthWrapper from '@/components/check-authenticate';
import { useModalStore } from '@/store/useModalStore';
import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useRef } from 'react';
import api from '@/lib/axios'
import { Loader2 } from 'lucide-react';

const Page = () => {
    const { user } = useUserStore();
    const setPostModal = useModalStore((state) => state.setPostModal);
    const observerTarget = useRef(null);

    const fetchQuestions = async ({ pageParam = 1 }) => {
        const res = await api.get(`/fetch-question?page=${pageParam}&limit=10`);
        const data = await res.data.data
        return data;
    }

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['questions', 'feed'],
        queryFn: fetchQuestions,
        getNextPageParam: (lastPage) => lastPage.nextPage,
        initialPageParam: 1,
        staleTime: 5 * 60 * 1000,
    });

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            { threshold: 1.0 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }
        return () => {
            if (observerTarget.current) {
                observer.unobserve(observerTarget.current);
            }
        };
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    return (
        <div className="max-w-7xl mx-auto py-4 ">
            <div className="w-full px-4 md:w-1/2 mx-auto flex flex-col gap-3">
                <AuthWrapper>
                    <Card className="w-full max-w-2xl mb-6 shadow-sm border-none bg-card px-4 flex flex-row items-center gap-4 sticky top-0 self-start">
                        <Avatar className="size-9 shrink-0">
                            <AvatarImage src={user?.profileImage} />
                            <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                        </Avatar>

                        <Button
                            variant="secondary"
                            className="flex-1 justify-start text-muted-foreground rounded-full h-10 px-6 font-normal border-none bg-muted/50"
                            onClick={() => setPostModal(true)}
                        >
                            What is your question?
                        </Button>

                        <Button
                            className="rounded-full px-6 h-10 font-medium shadow-none bg-black/80"
                            onClick={() => setPostModal(true)}
                        >
                            Post
                        </Button>
                    </Card>
                </AuthWrapper>

                {/* Render all pages */}
                {data?.pages.map((page, pageIndex) => (
                    <div key={pageIndex}>
                        {page.question?.map((item: TPost, idx: number) => (
                            <div key={item._id || idx} >
                                <PostCard post={item} isProfile={false} />
                            </div>
                        ))}
                    </div>
                ))}

                {/* Loading indicator for next page */}
                <div ref={observerTarget} className="py-8 flex justify-center">
                    {isFetchingNextPage && (
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    )}
                    {!hasNextPage && data?.pages[0]?.questions?.length > 0 && (
                        <p className="text-sm ">No more questions to load</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Page