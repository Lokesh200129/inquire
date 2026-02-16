"use client"
import PostCard from '@/components/post-card';
import { Loader2 } from 'lucide-react';
import { useInfiniteQuestions } from '@/hooks/use-infinite-questions';
import GlobalLoader from '@/components/global-loader';

export default function Page() {

    const {
        data,
        isFetchingNextPage,
        hasNextPage,
        observerTarget,
        isLoading
    } = useInfiniteQuestions();
    if (isLoading) return <GlobalLoader />

    return (
        <div className="py-4 w-full">
            <div className=" mx-auto flex flex-col gap-3">
                <h1 className="font-bold text-xl tracking-tight px-4">Discover</h1>

                {data?.pages.map((page, pageIndex) => (
                    <div key={pageIndex} className="flex flex-col gap-3">
                        {page?.question?.map((item: TPost, idx: number) => (
                            <div key={item._id || `${pageIndex}-${idx}`}>
                                <PostCard post={item} isProfile={false} />
                            </div>
                        ))}
                    </div>
                ))}

                {/* 4. Infinite Scroll Trigger */}
                <div ref={observerTarget} className="py-8 flex justify-center">
                    {isFetchingNextPage && (
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    )}

                    {!hasNextPage && data?.pages && data.pages[0].question?.length > 0 && (
                        <p className="text-sm text-muted-foreground">No more questions to load</p>
                    )}
                </div>
            </div>
        </div>
    );
};

