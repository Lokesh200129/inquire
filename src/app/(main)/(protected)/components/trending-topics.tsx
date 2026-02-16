"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useInfiniteQuestions } from "@/hooks/use-infinite-questions";
import GlobalLoader from "@/components/global-loader";
import Link from "next/link";
interface TrendingItem {
    tag: string;
    post: TPost;
}
import PostImage from "./post-image";

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
            <div className="space-y-4 overflow-auto">
                {trendingContent.map(({ tag, post }) => (
                    <Link
                        href={`/feed/${post._id}`}
                        key={tag}
                        className="group flex gap-3 p-2 rounded-xl bg-white hover:bg-muted/50 transition-colors border border-transparent hover:border-border"
                    >
                        {/* Image on the Left */}
                        <div className="relative size-30 shrink-0 overflow-hidden rounded-lg border bg-muted">
                            {hasValidImage(post) && post.questionImage ? (
                                <Image
                                    src={post?.questionImage[0]}
                                    alt={tag}
                                    fill
                                    className="object-cover transition-transform group-hover:scale-110"
                                />
                            ) : <PostImage post={post} className="size-30" />}
                        </div>

                        {/* Title on the Right */}
                        <div className=" flex-1 ">
                            <div className="flex justify-start flex-col gap-2  ">
                                <Button
                                    key={tag}
                                    variant="secondary"
                                    size="sm"
                                    className="bg-primary/5  border-none hover:bg-primary/10 transition-colors rounded-full px-3 text-[11px]  w-fit"
                                >
                                    #{tag}
                                </Button>
                                <h2 className="uppercase font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                                    {post.title}
                                </h2>
                                <div className="line-clamp-2 capitalize text-sm" dangerouslySetInnerHTML={{ __html: post.content }} />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}