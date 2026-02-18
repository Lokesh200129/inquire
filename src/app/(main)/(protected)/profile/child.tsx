"use client"
import { useState } from "react"
import Form from "./components/form"
import CustomUserAvatar from "@/components/user-avatar"
import { Pencil, PlusCircle, LayoutGrid, MessageSquare, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import PostCard from '@/components/post-card'
import MobileForm from "./components/mobile-form"
import { useModalStore } from '@/store/useModalStore'
import { useUserQuestions } from "@/hooks/use-user-question"
import { useCurrentUser } from "@/hooks/auth/use-current-user"
import GlobalLoader from "@/components/global-loader"

const Page = () => {
    const [isEditing, setIsEditing] = useState(false);
    const setPostModal = useModalStore((state) => state.setPostModal);
    const { data: user, isLoading: isAuthLoading } = useCurrentUser();
    const {
        data,
        isFetchingNextPage,
        hasNextPage,
        observerTarget,
        isLoading: isQuestionsLoading
    } = useUserQuestions(user?._id);

    if (isAuthLoading || isQuestionsLoading) {
        return <GlobalLoader />;
    }
    const handleClose = () => {
        setIsEditing(false);
    };
    return (
        <main className="mx-auto mt-3">
            <MobileForm isOpen={isEditing} onClose={handleClose} />
            <div className="flex flex-col lg:flex-row gap-10 relative items-start">
                <div className="flex-1 w-full space-y-8">

                    <div className="bg-card border rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start justify-between shadow-sm gap-6">
                        <div className="flex flex-col md:flex-row items-start gap-6 capitalize md:text-left w-full">
                            <CustomUserAvatar src={user?.profileImage} name={user?.name} size="xxl" />

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

                        {/* Desktop Edit Button */}
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

                        {data?.pages && data.pages[0]?.question?.length > 0 ? (
                            data.pages.map((page, pageIndex) => (
                                <div key={pageIndex} className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                                    {page?.question?.map((item, idx: number) => (
                                        <div key={item._id || `${pageIndex}-${idx}`}>
                                            <PostCard post={item} isProfile={true} />
                                        </div>
                                    ))}
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed rounded-2xl bg-muted/30 space-y-4">
                                <div className="p-4 bg-background rounded-full shadow-sm">
                                    <MessageSquare className="text-muted-foreground" size={32} />
                                </div>
                                <div className="text-center">
                                    <p className="text-lg font-medium">No posts yet</p>
                                    <p className="text-sm text-muted-foreground">Share your knowledge with the community.</p>
                                </div>
                                <Button className="gap-2" onClick={() => setPostModal(true)}>
                                    <PlusCircle size={18} /> Create Your First Post
                                </Button>
                            </div>
                        )}

                        <div ref={observerTarget} className="py-8 flex justify-center">
                            {isFetchingNextPage && <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />}
                            {!hasNextPage && data?.pages && data.pages[0]?.question?.length > 0 && (
                                <p className="text-sm text-muted-foreground">No more questions to load</p>
                            )}
                        </div>
                    </div>
                </div>

                {isEditing && (
                    <aside className="w-full lg:w-100 sticky top-12 animate-in slide-in-from-right-5 duration-300 hidden lg:flex">
                        <Form />
                    </aside>
                )}
            </div>
        </main>
    )
}

export default Page;