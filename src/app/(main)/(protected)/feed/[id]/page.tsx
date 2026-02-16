"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import PostImageCarousel from "@/components/carousel";
import {
    ArrowBigUp,
    ArrowBigDown,
    MessageSquare,
    Share2,
    Clock,
    User as UserIcon,
    ChevronLeft
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CustomUserAvatar from "@/components/user-avatar";
import { useSingleQuestion } from "@/hooks/use-single-question";
import GlobalLoader from "@/components/global-loader";

export default function QuestionDetailView() {
    const { id } = useParams();
    // const { data: post, isLoading, error } = useSingleQuestion(id as string);
    const { data: post, isLoading, } = useSingleQuestion(id as string) as { data: TPost, isLoading: boolean };

    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const openCarousel = (index: number) => {
        setActiveIndex(index);
        setIsGalleryOpen(true);
    };

    if (isLoading) return <GlobalLoader />;
    if (!post) return <div className="p-10 text-center">Question not found.</div>;
    console.log(post)
    return (
        <div className="flex-1 max-w-3xl mx-auto w-full p-4 space-y-6">
            {/* 1. Header Navigation */}
            <div className="flex items-center gap-2 mb-6">
                <Button variant="ghost" size="sm" onClick={() => window.history.back()} className="rounded-full gap-2">
                    <ChevronLeft size={16} className=" bg-gray-200 rounded-full " /> Back
                </Button>
            </div>

            {/* 2. Author Information */}
            <div className="flex items-center justify-between border-b pb-6">
                <div className="flex items-center gap-4">
                    <CustomUserAvatar src={post.author.profileImage} name={post.author.name} size="lg" />
                    <div>
                        <h1 className="font-bold text-lg leading-none">{post.author.name}</h1>
                        <p className="text-sm text-muted-foreground mt-1">{post.author.occupation || "Member"}</p>
                    </div>
                </div>
                <div className="text-right hidden sm:block">
                    <div className="flex items-center gap-2 text-muted-foreground text-[10px] uppercase tracking-wider font-semibold">
                        <Clock size={10} />
                        {formatDistanceToNow(new Date(post.createdAt))} ago
                    </div>
                </div>
            </div>

            {/* 3. Content Section */}
            <div className="space-y-4">
                <h2 className="text-3xl font-extrabold tracking-tight text-foreground ">
                    {post.title}
                </h2>

                <div
                    className="prose prose-zinc dark:prose-invert max-w-none text-base leading-relaxed whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
            </div>

            {/* 4. Multiple Image Grid (Fixed Indices) */}
            {post.questionImage && post.questionImage.length > 0 && post.questionImage?.some((img: string) => img && img.trim() !== '') && (
                <div className="relative w-full rounded-2xl overflow-hidden border bg-muted aspect-video shadow-sm">
                    <div className={cn(
                        "grid h-full w-full-0.5 bg-border",
                        post.questionImage.length === 1 ? "grid-cols-1" : "grid-cols-2"
                    )}>
                        {/* 1st Image (Full left or Solo) */}
                        <div className="relative h-full w-full bg-muted overflow-hidden" onClick={() => openCarousel(0)}>
                            <Image
                                src={post.questionImage[0]}
                                alt="Detail 1"
                                fill
                                className="object-cover hover:scale-105 cursor-pointer transition-transform duration-500"
                            />
                        </div>

                        {post.questionImage.length > 1 && (
                            <div className={cn("grid-0.5", post.questionImage.length === 2 ? "grid-cols-1" : "grid-rows-2")}>
                                <div className="relative h-full w-full bg-muted overflow-hidden" onClick={() => openCarousel(1)}>
                                    <Image src={post.questionImage[1]} alt="Detail 2" fill className="object-cover hover:scale-105 cursor-pointer transition-transform duration-500" />
                                </div>
                                {post.questionImage.length === 3 && (
                                    <div className="relative h-full w-full bg-muted overflow-hidden" onClick={() => openCarousel(2)}>
                                        <Image src={post.questionImage[2]} alt="Detail 3" fill className="object-cover hover:scale-105 cursor-pointer transition-transform duration-500" />
                                    </div>
                                )}
                                {post.questionImage.length === 4 && (
                                    <div className="grid grid-cols-2-0.5 h-full w-full">
                                        <div className="relative h-full w-full bg-muted overflow-hidden" onClick={() => openCarousel(2)}>
                                            <Image src={post.questionImage[2]} alt="Detail 3" fill className="object-cover hover:scale-105 cursor-pointer transition-transform duration-500" />
                                        </div>
                                        <div className="relative h-full w-full bg-muted overflow-hidden" onClick={() => openCarousel(3)}>
                                            <Image src={post.questionImage[3]} alt="Detail 4" fill className="object-cover hover:scale-105 cursor-pointer transition-transform duration-500" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* 5. Tags */}
            <div className="flex flex-wrap gap-2 py-2">
                {post.tags?.map((tag: string) => (
                    <Badge key={tag} variant="secondary" className="px-4 py-1 text-xs rounded-full border-none bg-primary/5 text-primary">
                        #{tag}
                    </Badge>
                ))}
            </div>

            {/* 6. Interaction Footer */}
            <div className="flex items-center justify-between border-y py-4 sticky bottom-0 bg-neutral-100">
                <div className="flex items-center gap-4">
                    <div className="flex items-center bg-muted/50 rounded-full border p-1">
                        <Button variant="ghost" size="sm" className="rounded-full h-9 px-4 gap-2 hover:bg-primary/10">
                            <ArrowBigUp className="size-6" />
                            <span className="font-bold">{post.upvotes.length}</span>
                        </Button>
                        <div className="w-px h-5 bg-border mx-1" />
                        <Button variant="ghost" size="sm" className="rounded-full h-9 px-4 hover:bg-destructive/10">
                            <ArrowBigDown className="size-6" />
                        </Button>
                    </div>
                    <Button variant="ghost" className="gap-2 text-muted-foreground rounded-full h-11 px-6">
                        <MessageSquare className="size-5" />
                        <span className="font-bold">{post.answerCount} Answers</span>
                    </Button>
                </div>
                <Button variant="outline" size="icon" className="rounded-full size-11">
                    <Share2 className="size-5" />
                </Button>
            </div>

            <PostImageCarousel
                images={post.questionImage!}
                isVisible={isGalleryOpen}
                initialIndex={activeIndex}
                onClose={() => setIsGalleryOpen(false)}
            />
        </div>
    );
}