// app/questions/page.tsx
"use client"
import PostCard from '@/components/post-card'
import { Card } from '@/components/ui/card';
import CustomUserAvatar from '@/components/user-avatar'
import { Button } from '@/components/ui/button';
import AuthWrapper from '@/components/check-authenticate';
import { useModalStore } from '@/store/useModalStore';
import { Loader2 } from 'lucide-react';
import { useInfiniteQuestions } from '@/hooks/useInfiniteQuestions';
import { useCurrentUser } from '@/hooks/auth/use-current-user';

const Page = () => {
    const { data: user } = useCurrentUser();
    const setPostModal = useModalStore((state) => state.setPostModal);
    const {
        data,
        isFetchingNextPage,
        hasNextPage,
        observerTarget,
    } = useInfiniteQuestions();

    return (
        <div className="py-4">
            <div className="w-full mx-auto flex flex-col gap-3">
                <AuthWrapper>
                    <Card className="w-full shadow-sm border-none bg-card px-4 flex flex-row items-center gap-4 sticky top-0 self-start">
                        <CustomUserAvatar src={user?.profileImage} name={user?.name} size="md" />

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

                {/* Render all pages - Updated nesting to page?.data?.question */}
                {data?.pages.map((page, pageIndex) => (
                    <div key={pageIndex} className="flex flex-col gap-3">
                        {page?.question?.map((item, idx: number) => (
                            <div key={item._id || idx} >
                                <PostCard post={item} isProfile={false} />
                            </div>
                        ))}
                    </div>
                ))}

                <div ref={observerTarget} className="py-8 flex justify-center">
                    {isFetchingNextPage && (
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    )}

                    {/* Updated path for empty check */}
                    {!hasNextPage && data?.pages && data.pages[0]?.question?.length > 0 && (
                        <p className="text-sm ">No more questions to load</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Page;