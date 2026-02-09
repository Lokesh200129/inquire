"use client"
import { useEffect, useState, useRef } from "react"
import Form from "./components/form"
import Image from "next/image"
import { Pencil, PlusCircle, LayoutGrid, MessageSquare } from "lucide-react"
import { useUserStore } from "@/store/useUserStore"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useParams, useRouter } from "next/navigation"
import PostCard from '@/components/post-card'
import { useUiStore } from "@/store/useUiStore"
import api from '@/lib/axios'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Loader2 } from "lucide-react"
import { useModalStore } from '@/store/useModalStore'
const Page = () => {
    const { user } = useUserStore();
    const { isLoading } = useUiStore();
    const [isEditing, setIsEditing] = useState(false);
    const params = useParams();
    const router = useRouter();
    const observerTarget = useRef(null);
    const userId = user?._id
    const setPostModal = useModalStore((state) => state.setPostModal);


    useEffect(() => {
        if (isLoading) return;
        if (!user) {
            router.push('/');
            return;
        }
        if (params?.userId !== user?._id) {

            router.push('/')
        }
    }, [params.userId, user, isLoading, router]);

    const fetchMyQuestions = async ({ pageParam = 1 }) => {
        const res = await api.get(`/fetch-question?page=${pageParam}&limit=10&userId=${userId}`);
        const data = await res.data.data
        return data || [];
    }

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['questions', 'profile', userId],
        queryFn: fetchMyQuestions,
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
        <main className=" mx-auto px-8  py-12 mt-8 min-h-screen">
            <div className="flex flex-col lg:flex-row gap-10 ">
                <div className="flex-1 w-full space-y-8">
                    <div className="bg-card border rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start justify-between shadow-sm gap-6">
                        {/* Left side: Image and Info */}
                        <div className="flex flex-col md:flex-row items-start gap-6 capitalize md:text-left w-full">
                            <div className="size-24 rounded-full border-2 border-primary/20 overflow-hidden  flex  relative shrink-0 ">
                                {user?.profileImage ? (
                                    <Image src={user.profileImage} alt='profile' fill className="object-cover size-10" />
                                ) : (
                                    <span className="text-xl font-bold text-muted-foreground">
                                        {user?.name?.charAt(0) || "U"}
                                    </span>
                                )}
                            </div>

                            <div className="flex-1 space-y-2 w-full">
                                <div className="flex items-center justify-between md:block">
                                    <div className="space-y-1">
                                        <h1 className="text-xl md:text-2xl font-bold tracking-tight">{user?.name}</h1>
                                        <p className="text-muted-foreground font-medium">{user?.occupation || "Member"}</p>
                                    </div>

                                    <div className="md:hidden">
                                        <Button
                                            variant={isEditing ? "default" : "outline"}
                                            size="icon"
                                            className="rounded-full shrink-0"
                                            onClick={() => setIsEditing(!isEditing)}
                                        >
                                            <Pencil size={18} />
                                        </Button>
                                    </div>
                                </div>

                                <p className="text-sm text-muted-foreground max-w-md mx-auto md:mx-0 line-clamp-2 md:line-clamp-3">
                                    {user?.bio || "No bio added yet."}
                                </p>
                            </div>
                        </div>
                        <Button
                            variant={isEditing ? "default" : "outline"}
                            size="icon"
                            className="hidden md:flex rounded-full shrink-0"
                            onClick={() => setIsEditing(!isEditing)}
                        >
                            <Pencil size={20} />
                        </Button>
                    </div>

                    <Separator className="my-8" />

                    {/* Posts Section */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold flex items-center gap-2">
                                <LayoutGrid size={25} /> Your Questions
                            </h2>
                        </div>
                        {/* Container for Infinite Scroll Pages */}
                        {data?.pages && data.pages[0]?.question?.length > 0 ? data?.pages.map((page, pageIndex) => (
                            <div
                                key={pageIndex}
                                className="w-full grid grid-cols-1 md:grid-cols-2 gap-12"
                            >
                                {page.question?.map((item: TPost, idx: number) => (
                                    <div
                                        key={item._id || `${pageIndex}-${idx}`}
                                    >
                                        <PostCard post={item} isProfile={true} />
                                    </div>
                                ))}
                            </div>
                        )) : (
                            <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed rounded-2xl bg-muted/30 space-y-4">
                                <div className="p-4 bg-background rounded-full shadow-sm">
                                    <MessageSquare className="text-muted-foreground" size={32} />
                                </div>
                                <div className="text-center">
                                    <p className="text-lg font-medium">No posts yet</p>
                                    <p className="text-sm text-muted-foreground">Share your knowledge with the Inquire community.</p>
                                </div>
                                <Button className="gap-2" onClick={() => setPostModal(true)}>
                                    <PlusCircle size={18} /> Create Your First Post
                                </Button>
                            </div>
                        )}
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

                {/* RIGHT SECTION: Conditional Form */}
                {isEditing && (
                    <aside className="w-full lg:w-100 sticky top-20 animate-in slide-in-from-right-5 duration-300">
                        <Form />
                    </aside>
                )}
            </div>
        </main>
    )
}

export default Page;