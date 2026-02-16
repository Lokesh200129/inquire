
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { MessageSquare, ThumbsUp, UserPlus, Bell, Bookmark, Award } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Notifications",
    description: "Stay updated with the latest interactions, replies, and activity on your profile and posts.",
};

const NOTIFICATIONS = [
    {
        id: "1",
        user: { name: "Sarah Chen", image: "https://github.com/shadcn.png" },
        content: "answered your question about 'Next.js 14 Server Components'",
        time: "2m ago",
        isUnread: true,
        icon: <MessageSquare className="text-blue-500" size={14} />
    },
    {
        id: "2",
        user: { name: "Alex Rivera", image: "https://github.com/shadcn.png" },
        content: "upvoted your insight on 'Database Indexing'",
        time: "15m ago",
        isUnread: true,
        icon: <ThumbsUp className="text-gray-500" size={14} />
    },
    {
        id: "3",
        user: { name: "Dr. James Wilson", image: "https://github.com/shadcn.png" },
        content: "started following your knowledge journey",
        time: "1h ago",
        isUnread: false,
        icon: <UserPlus className="text-gray-500" size={14} />
    },
    {
        id: "4",
        user: { name: "Inquire Team", image: "/logo.png" },
        content: "Your 'Contextual Authority' badge has been upgraded to Silver!",
        time: "5h ago",
        isUnread: false,
        icon: <Bell className="text-yellow-600" size={14} />
    },
    {
        id: "5",
        user: { name: "Lokesh Pal", image: "https://github.com/shadcn.png" },
        content: "saved your post 'Optimizing TanStack Query' to their collection",
        time: "8h ago",
        isUnread: false,
        icon: <Bookmark className="text-gray-500" size={14} />
    },
    {
        id: "6",
        user: { name: "Community Bot", image: "/logo.png" },
        content: "congratulations! You reached a 7-day streak of sharing knowledge.",
        time: "1d ago",
        isUnread: false,
        icon: <Award className="text-orange-500" size={14} />
    }
];

export default function NotificationList() {
    return (
        <div className="w-full mx-auto  mt-4">
            <h1 className="text-xl font-bold text-gray-900 mb-6">Notifications</h1>

            <div className="divide-y divide-gray-100 border-t border-gray-100 p-4  bg-white rounded-lg">
                {NOTIFICATIONS.map((notif) => (
                    <div
                        key={notif.id}
                        className={cn(
                            "flex items-start gap-4 py-4 transition-colors",
                            notif.isUnread ? "bg-blue-50/30" : "bg-transparent"
                        )}
                    >
                        <div className="relative shrink-0">
                            <Avatar className="h-10 w-10 border border-gray-100">
                                <AvatarImage src={notif.user.image} />
                                <AvatarFallback className="bg-gray-100 text-gray-600">
                                    {notif.user.name[0]}
                                </AvatarFallback>
                            </Avatar>
                            <div className="absolute -bottom-1 -right-1 bg-white border border-gray-100 p-1 rounded-full shadow-sm">
                                {notif.icon}
                            </div>
                        </div>

                        <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-800 leading-normal">
                                <span className="font-semibold text-gray-900">{notif.user.name}</span>{" "}
                                {notif.content}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                        </div>

                        {notif.isUnread && (
                            <div className="mt-2 h-2 w-2 rounded-full bg-blue-600 shrink-0" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}