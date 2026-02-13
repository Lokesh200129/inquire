"use client";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const SIZES = {
    xs: "h-6 w-6 text-[10px]",
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
    xl: "h-16 w-16 text-lg",
    xxl: "size-24 text-2xl"
} as const;

const COLORS = [
    "from-red-500 to-pink-500", "from-blue-500 to-cyan-500",
    "from-green-500 to-emerald-500", "from-purple-500 to-violet-500",
    "from-orange-500 to-amber-500", "from-indigo-500 to-blue-500",
    "from-pink-500 to-rose-500", "from-teal-500 to-cyan-500",
    "from-yellow-500 to-orange-500", "from-fuchsia-500 to-pink-500",
];

export default function UserAvatar({ src, name, size = "md", className }: {
    src?: string | null;
    name?: string;
    size?: keyof typeof SIZES;
    className?: string;
}) {
    const initials = name?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "U";
    const colorIndex = name ? (name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % COLORS.length) : 0;

    return (
        <Avatar className={cn(SIZES[size], "shrink-0 border border-gray-100", className)}>
            {src?.trim() ? (
                <Image
                    src={src}
                    alt={name || "User"}
                    width={100}
                    height={100}
                    className="aspect-square h-full w-full object-cover"
                />
            ) : (
                <AvatarFallback className={cn("bg-linear-to-br text-white font-semibold", COLORS[colorIndex])}>
                    {initials}
                </AvatarFallback>
            )}
        </Avatar>
    );
}