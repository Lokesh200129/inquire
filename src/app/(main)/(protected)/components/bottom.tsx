"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCurrentUser } from "@/hooks/auth/use-current-user";
import {
    Layers2,
    Compass,
    Bell,
    User,
    PlusCircle,
    LogIn
} from "lucide-react";
import { cn } from "@/lib/utils";
import CustomUserAvatar from "@/components/user-avatar";
import { useModalStore } from "@/store/useModalStore";

const Bottombar = () => {
    const pathname = usePathname();
    const { data: userData } = useCurrentUser();
    const setPostModal = useModalStore((state) => state.setPostModal);
    const isLoggedIn = !!userData;

    const navItems = [
        { name: 'Feed', to: '/feed', icon: Layers2 },
        { name: 'Discover', to: '/discover', icon: Compass },
        { name: 'Post', to: '#', icon: PlusCircle, isAction: true },
        {
            name: 'Notifications',
            to: isLoggedIn ? '/notification' : '/auth/login',
            icon: Bell
        },
        {
            name: 'Profile',
            to: isLoggedIn ? '/profile' : '/auth/login',
            icon: isLoggedIn ? User : LogIn
        },
    ];

    return (
        <nav className="fixed w-full bottom-0 left-0 right-0 z-60 bg-white dark:bg-zinc-950 border-t md:hidden h-16 px-4">
            <div className="flex items-center justify-around h-full">
                {navItems.map((item, idx) => {
                    const isActive = pathname === item.to;
                    const Icon = item.icon;

                    if (item.isAction) {
                        return (
                            <button
                                key={idx}
                                onClick={() => setPostModal(true)}
                                className="flex flex-col items-center justify-center text-zinc-500 active:scale-90 transition-transform"
                            >
                                <PlusCircle size={32} strokeWidth={1.5} className="text-zinc-900 dark:text-zinc-100 mb-4" />
                            </button>
                        );
                    }

                    return (
                        <Link
                            key={idx}
                            href={item.to}
                            className={cn(
                                "flex flex-col items-center justify-center transition-all",
                                isActive ? "text-zinc-900 " : "text-zinc-600"
                            )}
                        >
                            {item.name === 'Profile' && isLoggedIn ? (
                                <div className={cn(
                                    "rounded-full p-0.5 border-2 transition-all",
                                    isActive ? "border-zinc-900 " : "border-transparent"
                                )}>
                                    <CustomUserAvatar src={userData?.profileImage} name={userData?.name} size="xs" />
                                </div>
                            ) : (
                                <Icon size={28} strokeWidth={isActive ? 2 : 1.5} />
                            )}
                            <span className="text-[10px] font-medium mt-0.5">{item.name}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};

export default Bottombar;