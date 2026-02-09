"use client";
import React from "react";
import Image from "next/image";
import {
  ArrowBigUp,
  ArrowBigDown,
  MessageSquare,
  Share2,
  Trash2
} from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { usePost } from '@/hooks/use-post'
// Inside your component
interface CardProp {
  post: TPost,
  isProfile?: boolean
}

const PostCard = ({ post, isProfile }: CardProp) => {
  const { handleDelete } = usePost();

  return (
    <Card className="w-full shadow-none border-none rounded-xl py-8 px-4 mt-4">
      {/* 1. Header: User Details */}
      <CardHeader className="flex flex-row items-center justify-between p-0 mb-1 space-y-0 capitalize">
        < div className="flex items-center gap-3" >
          <Avatar className="size-9 border">
            <AvatarImage src={post.author.profileImage} alt={post.author.name} />
            <AvatarFallback>{post?.author?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg hover:underline cursor-pointer">
                {post.author.name}
              </span>
              <span className="text-muted-foreground text-xs">•</span>
              <span className="text-muted-foreground text-xs">
                {formatDistanceToNow(new Date(post.createdAt))} ago
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-none">
              {post.author.occupation}
            </p>
          </div>
        </div >
        {isProfile &&
          <Button variant="ghost" size="icon" className="rounded-full size-8" onClick={() => handleDelete(post._id!)}>
            <Trash2 className="size-4 text-muted-foreground" />
          </Button>
        }
      </CardHeader >

      {/* 2. Content: Title and Snippet */}
      < CardContent className="p-0 space-y-3 cursor-pointer capitalize" >
        <h2 className="text-lg font-bold leading-6 hover:text-primary transition-colors px-0">
          {post.title}
        </h2>

        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
          {post.content}
        </p>

        {
          post.questionImage && (
            <div className="relative w-full aspect-video rounded-lg overflow-hidden border">
              <Image
                src={post.questionImage}
                alt="Post media"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )
        }
        {/* tags */}
        <div className="flex flex-wrap gap-2 pt-1 normal-case">
          {post?.tags?.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="font-normal px-2 py-0 text-gray-600"
            >
              #{tag}
            </Badge>
          ))}
        </div>
      </CardContent >

      {/* 3. Footer: Interactions */}
      < CardFooter className="p-0 mt-4 flex items-center justify-between" >
        <div className="flex items-center gap-1">
          {/* Upvote/Downvote Group */}
          <div className="flex items-center bg-muted/50 rounded-full border">
            <Button variant="ghost" size="sm" className="rounded-l-full h-8 px-3 gap-1 hover:bg-primary/10 hover:text-primary group">
              <ArrowBigUp className="size-5 group-active:scale-125 transition-transform" />
              <span className="text-xs font-semibold">{post.upvotes.length}</span>
            </Button>
            <div className="w-px h-4 bg-border" />
            <Button variant="ghost" size="sm" className="rounded-r-full h-8 px-2 hover:bg-destructive/10 hover:text-destructive group">
              <ArrowBigDown className="size-5 group-active:scale-125 transition-transform" />
            </Button>
          </div>

          {/* Comments Link */}
          <Button variant="ghost" size="sm" className="rounded-full h-8 gap-2 text-muted-foreground">
            <MessageSquare className="size-4" />
            <span className="text-xs font-medium">{post.answerCount}</span>
          </Button>
        </div>

        {/* Share Button */}
        <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 text-muted-foreground">
          <Share2 className="size-4" />
        </Button>
      </CardFooter >
    </Card >
  );
};
export default PostCard