"use client";
import Link from "next/link";
import Image from "next/image";
import logo from '../../../../../public/logo.png';
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/auth/use-current-user";
import { useLogout } from "@/hooks/auth/use-logout";
import {
    Layers2,
    LogOut,
    User,
    Compass,
    Bell,
    PlusSquare,
    PlusCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useModalStore } from "@/store/useModalStore";
import CustomUserAvatar from '@/components/user-avatar'
import AuthWrapper from "@/components/check-authenticate";

const STYLES = {
    text: {
        primary: "text-white",
        secondary: "text-gray-300",
        muted: "text-gray-600",
    },
    gradient: {
        primary: "bg-gradient-to-r from-purple-400 to-pink-400",
        hover: "hover:from-purple-500/10 hover:to-pink-500/10",
        active: "from-purple-500/20 to-pink-500/20",
    },
    border: "border-white/10",
    hover: "hover:bg-white/5",
    transition: "transition-all duration-300",
} as const;

const Sidebar = () => {
    const pathname = usePathname();
    const setPostModal = useModalStore((state) => state.setPostModal);
    const { data: userData } = useCurrentUser();
    const { mutate: logout } = useLogout();
   
    const isLoggedIn = !!userData;

    const navItems = [
        { name: 'Feed', to: '/feed', icon: Layers2 },
        { name: 'Discover', to: '/discover', icon: Compass },
        ...(isLoggedIn ? [
            { name: 'Notifications', to: '/notification', icon: Bell },
            { name: 'Profile', to: '/profile', icon: User }
        ] : [])
    ];

    const NavLink = ({ item }: { item: typeof navItems[0] }) => {
        const isExactActive = pathname === item.to;
        const isFeedActive = item.name === 'Feed' && pathname === '/pro-feed';
        const isActive = isExactActive || isFeedActive;
        const Icon = item.icon;

        return (
            <Link
                href={item.to}
                className={cn(
                    "group relative flex items-center gap-4 px-4 py-2 rounded-xl font-medium",
                    STYLES.transition,
                    isActive
                        ? "border-2 border-gray-500 bg-white/5"
                        : `${STYLES.text.muted} hover:text-gray-600 ${STYLES.hover}`
                )}
            >
                <Icon
                    className={cn("shrink-0", STYLES.transition)}
                    size={22}
                />
                <span className="whitespace-nowrap">{item.name}</span>
            </Link>
        );
    };

    return (
        <div className="fixed left-0 top-0 h-screen z-50 bg-accent border-r-2 ">
            <nav className="w-64 h-full flex flex-col">
                {/* Logo */}
                {logo &&
                    <div className="py-3 px-4 flex items-center gap-3">
                        <Link href={'/'} className="flex items-center ">
                            <Image
                                src={logo}
                                alt="logo"
                                className={cn("size-16 mt-4 ", STYLES.transition, "hover:scale-110")}
                            />
                            <span className="text-2xl font-bold tracking-widest">Inquire</span>
                        </Link>
                    </div>
                }
                {/* Navigation Items */}
                <div className="flex-1 py-8 px-3 space-y-2">
                    {navItems.map((item, idx) => (
                        <NavLink key={idx} item={item} />
                    ))}
                    <AuthWrapper>
                        <div className="relative group">
                            <Button
                                onClick={() => setPostModal(true)}
                                className="mt-4 w-full space-x-2 py-2 h-10 flex items-center justify-center bg-zinc-900/90 backdrop-blur-md text-zinc-100 border border-zinc-700/50 rounded-lg shadow-md hover:bg-zinc-800 hover:border-zinc-600 active:scale-95 transition-all duration-200"
                            >
                                <PlusCircle size={20} />
                                <span className="font-medium tracking-tight">Ask Question</span>
                            </Button>
                        </div>
                    </AuthWrapper>
                </div>

                {/* Bottom Section: Profile or Auth Links */}
                <div className="mt-auto p-4 border-t border-gray-100/10">
                    {isLoggedIn ? (
                        <div className="space-y-3">
                            <Link
                                href={`/profile`}
                                className={cn(
                                    "flex items-center gap-4 py-3 rounded-xl group px-2",
                                    STYLES.hover,
                                    STYLES.transition
                                )}
                            >
                                <CustomUserAvatar src={userData?.profileImage} name={userData?.name} size="md" />
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold truncate text-gray-600">
                                        {userData?.name}
                                    </p>
                                    <p className={cn("text-xs truncate", STYLES.text.muted)}>
                                        @{userData?.name?.toLowerCase().replace(/\s+/g, '') || 'user'}
                                    </p>
                                </div>
                            </Link>

                            <Button
                                onClick={() => logout()}
                                variant="ghost"
                                className={cn(
                                    "w-full justify-start gap-4 px-4 py-3 text-red-500 hover:bg-red-50/50 hover:text-red-600 rounded-xl",
                                    STYLES.transition
                                )}
                            >
                                <LogOut size={22} className="shrink-0" />
                                <span className="font-medium">Logout</span>
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-2 px-1">
                            <Link href="/auth/login" className="block w-full">
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start gap-4 px-3 py-3 font-semibold text-gray-700 hover:bg-gray-100 rounded-xl"
                                >
                                    <User size={22} className="shrink-0" />
                                    <span className="text-gray font-semibold">Log In</span>
                                </Button>
                            </Link>
                            <Link href="/auth/signup" className="block w-full">
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start gap-4 px-3 py-3 font-semibold text-gray-700 hover:bg-zinc-100 rounded-xl"
                                >
                                    <PlusSquare size={22} />
                                    <span>Create Account</span>
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;