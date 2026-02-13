"use client";
import Link from "next/link";
import Image from "next/image";
import logo from '../../../../../public/logo.png';
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useLogout } from '@/hooks/auth/use-logout'
import { useState } from "react";
import {
    TextAlignEnd,
    Layers2,
    UserPlus,
    LogIn,
    LogOut,
    User,
    X
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/hooks/auth/use-current-user";

const STYLES = {
    text: {
        primary: "text-white",
        secondary: "text-gray-300",
        muted: "text-gray-600",
    },
    gradient: {
        primary: "bg-gradient-to-r from-purple-400 to-pink-400",
        hover: "hover:from-purple-500/10 hover:to-pink-500/10",
    },
    border: "border-white/10",
    hover: "hover:bg-white/5",
    transition: "transition-all duration-300",
} as const;

const Navbar = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const { data: userData } = useCurrentUser();
    const isLoggedIn = !!userData;

    const { mutate: logout } = useLogout();

    const isFeedPage = pathname === "/feed";
    if (isFeedPage) return null;

    const navItems = [
        { name: 'Feed', to: '/feed', icon: Layers2 },
        ...(!isLoggedIn ? [
            { name: 'Create Profile', to: '/auth/signup', icon: UserPlus },
            { name: 'Login', to: '/auth/login', icon: LogIn }
        ] : [
            { name: 'Profile', to: `/profile/${userData?._id}`, icon: User }
        ])
    ];

    const UserAvatar = ({ size = "size-10" }: { size?: string }) => (
        <Avatar className={cn(size, "shrink-0 ring-2 ring-purple-400/20", STYLES.transition, "group-hover:ring-purple-400/50")}>
            <AvatarImage src={userData?.profileImage} />
            <AvatarFallback className={cn(STYLES.gradient.primary, STYLES.text.primary)}>
                {userData?.name?.charAt(0) || "U"}
            </AvatarFallback>
        </Avatar>
    );

    return (
        <div className="sticky top-8 z-50">
            <nav className={cn(
                "bg-black/70 backdrop-blur-lg border shadow-lg w-[95%] mx-auto container h-16 flex justify-between items-center px-6 rounded-full",
                STYLES.border,
                STYLES.transition
            )}>

                {/* Logo */}
                <Link href={'/'} className="flex items-center group">
                    <Image
                        src={logo}
                        alt="logo"
                        className={cn("size-12 md:size-16 mt-1 invert", STYLES.transition, "group-hover:scale-110 group-hover:rotate-12")}
                    />
                    <span className={`${STYLES.text.primary} text-xl md:text-2xl font-bold ml-2`}>
                        Inquire
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex gap-2 px-4 items-center">
                    {navItems.map((item, idx) => {
                        const isActive = pathname === item.to;
                        return (
                            <Link
                                key={idx}
                                href={item.to}
                                className={cn(
                                    "relative px-5 py-2 rounded-full font-medium",
                                    STYLES.transition,
                                    isActive
                                        ? `${STYLES.text.primary} border-transparent`
                                        : `${STYLES.text.secondary} hover:${STYLES.text.primary} bg-gradient-to-r ${STYLES.gradient.hover}`
                                )}
                            >
                                {item.name}
                                {isActive && (
                                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
                                )}
                            </Link>
                        );
                    })}

                    {isLoggedIn && (
                        <>
                            <Separator orientation="vertical" className={cn("h-6 mx-2", STYLES.border)} />
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className={cn("flex items-center gap-2 px-4 py-2 rounded-full", STYLES.hover, STYLES.transition)}
                                    >
                                        <UserAvatar size="size-8" />
                                        <span className={cn("text-sm font-medium", STYLES.text.secondary, "hover:text-white", STYLES.transition)}>
                                            {userData?.name}
                                        </span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className={cn("w-56 bg-black/95 backdrop-blur-xl", STYLES.border)}
                                    align="end"
                                >
                                    <DropdownMenuLabel className={STYLES.text.primary}>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator className={STYLES.border} />
                                    <DropdownMenuItem asChild>
                                        <Link
                                            href={`/profile/${userData?._id}`}
                                            className={cn("cursor-pointer", STYLES.text.secondary, "hover:text-white focus:text-white focus:bg-white/5")}
                                        >
                                            <User className="mr-2 h-4 w-4" />
                                            <span>Profile</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator className={STYLES.border} />
                                    <DropdownMenuItem
                                        onClick={() => logout()}
                                        className="cursor-pointer text-red-400 hover:text-red-300 focus:text-red-300 focus:bg-red-500/10"
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Logout</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <Button
                    variant="ghost"
                    size="icon"
                    className={cn("md:hidden rounded-full", STYLES.hover, STYLES.transition)}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? (
                        <X strokeWidth={3} size={32} className="text-zinc-200" />
                    ) : (
                        <TextAlignEnd strokeWidth={3} size={32} className="text-zinc-200" />
                    )}
                </Button>

                {/* Mobile Menu Dropdown */}
                {isOpen && (
                    <div className={cn(
                        "absolute top-20 right-0 w-72 bg-black/80 backdrop-blur-xl rounded-3xl p-6 flex flex-col gap-2 animate-in fade-in zoom-in-95 md:hidden z-50 shadow-lg border",
                        STYLES.border
                    )}>
                        {navItems.map((item, idx) => {
                            const isActive = pathname === item.to;

                            return (
                                <Link
                                    key={idx}
                                    href={item.to}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "px-4 py-3 text-base font-normal text-gray-200 border-b border-transparent transition-all duration-200",
                                        "hover:text-white hover:border-gray-600",
                                        isActive && "text-white border-white"
                                    )}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}

                        {isLoggedIn && (
                            <>
                                <Separator className={cn("my-2", STYLES.border)} />
                                <Link
                                    href={`/profile/${userData?._id}`}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-xl transition-colors"
                                >
                                    <UserAvatar />
                                    <div>
                                        <p className="text-sm font-semibold text-white">{userData?.name}</p>
                                        <p className="text-xs text-gray-500">View Profile</p>
                                    </div>
                                </Link>

                                <Button
                                    variant="ghost"
                                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10 px-4 py-3 rounded-xl text-sm font-medium w-full justify-start gap-3 transition-colors"
                                    onClick={() => logout()}
                                >
                                    <LogOut size={18} />
                                    Logout
                                </Button>
                            </>
                        )}
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Navbar;