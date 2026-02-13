"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useInfiniteQuestions } from "@/hooks/useInfiniteQuestions";
import { MessageSquare } from "lucide-react";
import GlobalLoader from "@/components/global-loader";

interface TrendingItem {
    tag: string;
    post: TPost;
}

export default function TrendingTopics() {
    const { data, isLoading } = useInfiniteQuestions();
    let trendingContent: TrendingItem[] = [];
    let uniqueTags: string[] = [];

    if (data) {
        const allPosts = data.pages.flatMap((page) => page.question);

        const allTags = allPosts
            .flatMap((post) => post.tags || [])
            .filter((tag): tag is string => typeof tag === 'string' && tag.length > 0);
        uniqueTags = Array.from(new Set(allTags)).slice(0, 10);

        trendingContent = uniqueTags
            .map((tag) => {
                const representativePost = allPosts.find((post) =>
                    post.tags?.includes(tag)
                );
                return representativePost ? { tag, post: representativePost } : null;
            })
            .filter((item): item is TrendingItem => item !== null);
    }

    if (isLoading) return <GlobalLoader />

    const hasValidImage = (post: TPost): boolean => {
        return (
            Array.isArray(post.questionImage) &&
            post.questionImage.length > 0 &&
            post.questionImage[0].trim() !== ''
        );
    };

    return (
        <div className="py-5 sticky top-8 space-y-6">
            <div>
                <h3 className="font-bold text-xl mb-4 tracking-tight">Trending Topics</h3>
                <div className="flex flex-wrap gap-2">
                    {uniqueTags.length > 0 ? (
                        uniqueTags.map((tag) => (
                            <Button
                                key={tag}
                                variant="secondary"
                                size="sm"
                                className="bg-primary/5 text-primary border-none hover:bg-primary/10 transition-colors rounded-full px-4 font-medium text-[12px]"
                            >
                                #{tag}
                            </Button>
                        ))
                    ) : (
                        <p className="text-sm text-muted-foreground">No tags found yet.</p>
                    )}
                </div>
            </div>

            {/* Trending Cards: 1 post per category */}
            <div className="space-y-4">
                {trendingContent.map(({ tag, post }) => (
                    <div
                        key={tag}
                        className="group flex items-center gap-3 p-2 rounded-xl bg-white hover:bg-muted/50 transition-colors border border-transparent hover:border-border"
                    >
                        {/* Image on the Left */}
                        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border bg-muted">
                            {hasValidImage(post) && post.questionImage ? (
                                <Image
                                    src={post?.questionImage[0]}
                                    alt={tag}
                                    fill
                                    className="object-cover transition-transform group-hover:scale-110"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center bg-muted/50 rounded-lg border border-dashed">
                                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                        <MessageSquare className="size-6 opacity-20" />
                                        <span className="text-[10px] font-medium uppercase tracking-wider opacity-40">
                                            No Image
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Title on the Right */}
                        <div className="min-w-0 flex-1">
                            <p className="text-md font-bold text-primary uppercase tracking-wider">#{tag}</p>
                            <h4 className="text-sm font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                                {post.title}
                            </h4>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}