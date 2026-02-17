"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  ArrowBigUp,
  ArrowBigDown,
  MessageSquare,
  Share2,
  Trash2,
  ChevronDown,
  ChevronUp,
  Loader2
} from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import CustomUserAvatar from '@/components/user-avatar'
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { useDeletePost } from '@/hooks/use-delete-post'
import { cn } from "@/lib/utils";
import PostImageCarousel from '@/components/carousel'
import { useVote } from "@/hooks/use-vote";
import AuthWrapper from "./check-authenticate";
interface CardProp {
  post: TPost,
  isProfile?: boolean
}

const PostCard = ({ post, isProfile }: CardProp) => {
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { mutate: handleVote } = useVote();


  const onVoteClick = (type: "UP" | "DOWN") => {
    handleVote({ postId: post._id!, voteType: type });
  };
  const openCarousel = (index: number) => {
    setSelectedImageIndex(index);
    setIsCarouselOpen(true);
  };

  const { mutate: deletePost, isPending } = useDeletePost();
  const [isExpanded, setIsExpanded] = useState(false);

  const isLongContent = post.content.length > 200;

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (post._id) {
      deletePost(post._id);
    }
  };
  // console.log(post)
  return (
    <Card className="w-full shadow-none border-none rounded-xl py-6 px-4 mt-4 bg-card ">
      {/* 1. Header: User Details */}
      <CardHeader className="flex flex-row items-center justify-between p-0 mb-4 space-y-0">
        <div className="flex items-center gap-3">
          <CustomUserAvatar src={post?.author?.profileImage} name={post?.author?.name} size="md" />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-base hover:underline cursor-pointer text-foreground">
                {post.author.name}
              </span>
              <span className="text-muted-foreground text-[10px]">•</span>
              <span className="text-muted-foreground text-[10px]">
                {formatDistanceToNow(new Date(post.createdAt))} ago
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {post.author.occupation}
            </p>
          </div>
        </div>

        {/* 3. Delete Button with Loading State */}
        {isProfile && (
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full size-8"
            onClick={handleDeleteClick}
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="size-4 animate-spin text-muted-foreground" />
            ) : (
              <Trash2 className="size-4 text-muted-foreground hover:text-destructive transition-colors" />
            )}
          </Button>
        )}
      </CardHeader>

      <CardContent className="p-0 space-y-3">
        <h2 className="text-xl font-bold leading-tight text-foreground px-0  group-hover/link:text-blue-600 transition-colors mb-2">
          {post.title}
        </h2>

        <div className="relative overflow-hidden">
          <div
            className={cn(
              "prose prose-sm max-w-none text-lg leading-relaxed transition-all duration-500 ease-in-out ", "whitespace-pre-wrap",
              !isExpanded ? "max-h-24 overflow-hidden" : "max-h-auto"
            )}
            style={{
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word'
            }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {!isExpanded && isLongContent && (
            <div className="absolute bottom-0 left-0 w-full h-8 bg-linear-to-t from-card to-transparent" />
          )}
        </div>

        {isLongContent && (
          <button
            onClick={handleToggle}
            className="text-blue-600 text-xs font-bold mt-1 hover:underline flex items-center gap-1 normal-case relative z-10"
          >
            {isExpanded ? (
              <>Show Less <ChevronUp size={14} /></>
            ) : (
              <>See More <ChevronDown size={14} /></>
            )}
          </button>
        )}

        {post.questionImage && post.questionImage?.length > 0 && post.questionImage[0] !== "" && (
          <div className={cn(
            "relative w-full rounded-xl overflow-hidden border bg-muted transition-all duration-500 aspect-video",

          )}>

            <div className={cn(
              "grid h-full w-full gap-0.5 bg-border",
              post.questionImage.length === 1 ? "grid-cols-1" : "grid-cols-2"
            )}>
              {/* 1 Image Logic */}
              {post.questionImage.length === 1 && (
                <div className="relative w-full h-full overflow-hidden bg-muted" onClick={() => openCarousel(0)}>
                  <Image
                    src={post.questionImage[0]}
                    alt="Post media"
                    width={800}
                    height={450}
                    className={cn(
                      "w-full object-cover h-full hover:scale-110 cursor-pointer transition-transform duration-500",
                      isExpanded ? "h-auto" : "h-full"
                    )}
                  />
                </div>
              )}

              {/* 2, 3, 4 Images Logic */}
              {post.questionImage.length > 1 && (
                <>
                  {/* Left Half */}
                  <div className="relative h-full w-full bg-muted overflow-hidden" onClick={() => openCarousel(0)}>
                    <Image
                      src={post.questionImage[0]}
                      alt="Post media 1"
                      fill
                      className="object-cover hover:scale-110 cursor-pointer transition-transform duration-500"
                    />
                  </div>

                  {/* Right Half */}
                  <div className={cn(
                    "grid gap-0.5", // Gap for vertical separation
                    post.questionImage.length === 2 ? "grid-cols-1" : "grid-rows-2"
                  )}>
                    {post.questionImage.length === 2 && (
                      <div className="relative h-full w-full bg-muted overflow-hidden" onClick={() => openCarousel(1)}>
                        <Image src={post.questionImage[1]} alt="Post media 2" fill className="object-cover hover:scale-110 cursor-pointer transition-transform duration-500" />
                      </div>
                    )}

                    {post.questionImage.length === 3 && (
                      <>
                        <div className="relative h-full w-full bg-muted overflow-hidden" onClick={() => openCarousel(1)}>
                          <Image src={post.questionImage[1]} alt="Post media 2" fill className="object-cover hover:scale-110 cursor-pointer transition-transform duration-500" />
                        </div>
                        <div className="relative h-full w-full bg-muted overflow-hidden" onClick={() => openCarousel(2)}>
                          <Image src={post.questionImage[2]} alt="Post media 3" fill className="object-cover hover:scale-110 cursor-pointer transition-transform duration-500" />
                        </div>
                      </>
                    )}

                    {post.questionImage.length === 4 && (
                      <>
                        <div className="relative h-full w-full bg-muted overflow-hidden" onClick={() => openCarousel(1)}>
                          <Image src={post.questionImage[1]} alt="Post media 2" fill className="object-cover hover:scale-110 cursor-pointer transition-transform duration-500" />
                        </div>
                        {/* Horizontal split for the bottom-right quadrant */}
                        <div className="grid grid-cols-2 gap-0.5 h-full w-full">
                          <div className="relative h-full w-full bg-muted overflow-hidden" onClick={() => openCarousel(2)}>
                            <Image src={post.questionImage[2]} alt="Post media 3" fill className="object-cover hover:scale-110 cursor-pointer transition-transform duration-500" />
                          </div>
                          <div className="relative h-full w-full bg-muted overflow-hidden" onClick={() => openCarousel(3)}>
                            <Image src={post.questionImage[3]} alt="Post media 4" fill className="object-cover hover:scale-110 cursor-pointer transition-transform duration-500" />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
        <PostImageCarousel
          images={post.questionImage || []}
          isVisible={isCarouselOpen}
          onClose={() => setIsCarouselOpen(false)}
          initialIndex={selectedImageIndex}
        />
        <div className="flex flex-wrap gap-2 pt-2 normal-case">
          {post?.tags?.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="font-medium px-3 py-0.5 text-[10px] bg-secondary/50 text-secondary-foreground rounded-full border-none"
            >
              #{tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      {/* 3. Footer: Interactions */}
      <CardFooter className="p-0 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <AuthWrapper>
            <div className="flex items-center bg-muted/50 rounded-full border">

              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "rounded-l-full h-8 px-3 gap-1 group",
                  post.userVoteStatus === 'UP' && "text-orange-600 bg-orange-50 hover:bg-orange-100"
                )}
                onClick={() => onVoteClick('UP')}
              >
                <ArrowBigUp className={cn(
                  "size-5 transition-transform group-active:scale-125",
                  post.userVoteStatus === 'UP' && "fill-orange-600"
                )} />
                <span className="text-xs font-semibold">{post.upvotes}</span>
              </Button>

              <div className="w-px h-4 bg-border" />

              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "rounded-r-full h-8 px-2 group",
                  post.userVoteStatus === 'DOWN' && "text-blue-600 bg-blue-50 hover:bg-blue-100"
                )}
                onClick={() => onVoteClick('DOWN')}
              >
                <ArrowBigDown className={cn(
                  "size-5 transition-transform group-active:scale-125",
                  post.userVoteStatus === 'DOWN' && "fill-blue-600"
                )} />
                {/* Usually downvotes are shown as a total or just the icon */}
              </Button>
            </div>
          </AuthWrapper>
          <Button variant="ghost" size="sm" className="rounded-full h-8 gap-2 text-muted-foreground">
            <MessageSquare className="size-4" />
            <span className="text-xs font-medium">{post.answerCount}</span>
          </Button>
        </div>

        <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 text-muted-foreground">
          <Share2 className="size-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PostCard;


