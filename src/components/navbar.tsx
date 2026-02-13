// "use client";
// import Link from "next/link";
// import Image from "next/image";
// import logo from '../../public/logo.png';
// import { usePathname } from "next/navigation";
// import { Button } from "./ui/button";
// import { useUserStore } from "@/store/useUserStore";
// import { useAuth } from "@/hooks/auth/use-current-user";
// import { useState } from "react";
// import {
//     Menu,
//     Layers2,
//     UserPlus,
//     LogIn,
//     LogOut,
//     User,
//     Compass,
//     Bell,
//     PlusSquare
// } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
// import { Separator } from "./ui/separator";
// import { cn } from "@/lib/utils";
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from "./ui/dropdown-menu";
// import { motion } from 'framer-motion'
// interface Prop {
//     isSidebar?: boolean;
// }
// import { useModalStore } from "@/store/useModalStore";
// // CSS Variables and Constants
// const STYLES = {
//     text: {
//         primary: "text-white",
//         secondary: "text-gray-300",
//         muted: "text-gray-600",
//     },
//     gradient: {
//         primary: "bg-gradient-to-r from-purple-400 to-pink-400",
//         hover: "hover:from-purple-500/10 hover:to-pink-500/10",
//         active: "from-purple-500/20 to-pink-500/20",
//     },
//     border: "border-white/10",
//     hover: "hover:bg-white/5",
//     transition: "transition-all duration-300",
// } as const;

// const Navbar = ({ isSidebar }: Prop) => {
//     const pathname = usePathname();
//     const userData = useUserStore((state) => state.user);
//     const { logout } = useAuth();
//     const isLoggedIn = !!userData;
//     const [isOpen, setIsOpen] = useState(false);
//     const setPostModal = useModalStore((state) => state.setPostModal);

//     const navItems = [
//         { name: 'Feed', to: '/feed', icon: Layers2 },
//         { name: 'Discover', to: '/discover', icon: Compass },
//         { name: 'Notifications', to: '/notification', icon: Bell },

//         ...(!isLoggedIn ? [
//             { name: 'Create Profile', to: '/auth/signup', icon: UserPlus },
//             { name: 'Login', to: '/auth/login', icon: LogIn }
//         ] : [
//             { name: 'Profile', to: `/profile/${userData?._id}`, icon: User }
//         ])
//     ];
//     const NavLink = ({ item }: { item: typeof navItems[0] }) => {
//         const isActive = pathname === item.to;
//         const Icon = item.icon;

//         return (
//             <Link
//                 href={item.to}
//                 className={cn(
//                     "group relative flex items-center gap-4 px-4 py-3 rounded-xl font-medium",
//                     STYLES.transition,
//                     isActive
//                         ? "border-2 border-gray-600 "
//                         : `${STYLES.text.muted} hover:text-gray-600 ${STYLES.hover}`
//                 )}
//             >
//                 <Icon
//                     className={cn(
//                         "shrink-0",
//                         STYLES.transition,

//                     )}
//                     size={22}
//                 />
//                 <span className="whitespace-nowrap">
//                     {item.name}
//                 </span>
//             </Link>
//         );
//     };

//     const UserAvatar = ({ size = "size-10" }: { size?: string }) => (
//         <Avatar className={cn(size, "shrink-0 ring-2 ring-purple-400/20", STYLES.transition, "group-hover:ring-purple-400/50")}>
//             <AvatarImage src={userData?.profileImage} />
//             <AvatarFallback className={cn(STYLES.gradient.primary, STYLES.text.primary)}>
//                 {userData?.name?.charAt(0) || "U"}
//             </AvatarFallback>
//         </Avatar>
//     );

//     // Sidebar for feed page (always extended)
//     if (isSidebar) {
//         return (
//             <div className="fixed left-0 top-0 h-screen z-50 bg-accent">
//                 <nav className="w-64 h-full flex flex-col">
//                     {/* Logo */}
//                     <div className="py-6 px-4 flex items-center gap-3">
//                         <Link href={'/'} className="flex items-center ">
//                             <Image
//                                 src={logo}
//                                 alt="logo"
//                                 className={cn("size-16 mt-4 ", STYLES.transition, "hover:scale-110")}
//                             />
//                             <span className={cn("text-2xl font-bold  ",)}>
//                                 Inquire
//                             </span>
//                         </Link>
//                     </div>

//                     {/* Navigation Items */}
//                     <div className="flex-1 py-8 px-3 space-y-2">
//                         {navItems.map((item, idx) => (
//                             <NavLink key={idx} item={item} />
//                         ))}
//                         <div className="relative group">
//                             {/* Background Glow Effect - Button ke peeche ki chamak */}
//                             <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

//                             <Button
//                                 onClick={() => setPostModal(true)}
//                                 className="
//           relative mt-6 px-8 py-7 bg-black text-white rounded-lg
//           leading-none flex items-center divide-x divide-gray-600
//           hover:bg-gray-900 transition duration-200
//           border border-white/10
//         "
//                             >
//                                 <span className="flex items-center space-x-5">
//                                     {/* Spinning Icon on Hover */}
//                                     <motion.div
//                                         whileHover={{ rotate: 90, scale: 1.2 }}
//                                         transition={{ type: "spring", stiffness: 150, damping: 20 }}
//                                     >
//                                         <PlusSquare size={24} className="text-blue-400" />
//                                     </motion.div>

//                                     <span className="pr-4 text-gray-100 font-semibold text-lg tracking-tight">
//                                         Ask Question
//                                     </span>
//                                 </span>
//                             </Button>
//                         </div>
//                     </div>

//                     {/* User Section */}
//                     {isLoggedIn && (
//                         <div className="p-4 space-y-3">
//                             <Link
//                                 href={`/profile/${userData?._id}`}
//                                 className={cn("flex items-center gap-3 px-3 py-2 rounded-xl group", STYLES.hover, STYLES.transition)}
//                             >
//                                 <UserAvatar />
//                                 <div>
//                                     <p className="text-sm font-semibold truncate max-w-35 text-gray-600">
//                                         {userData?.name}
//                                     </p>
//                                     <p className={cn("text-xs truncate max-w-35", STYLES.text.muted)}>
//                                         @{userData?.name || 'user'}
//                                     </p>
//                                 </div>
//                             </Link>

//                             <Button
//                                 onClick={logout}
//                                 variant="ghost"
//                                 className={cn(
//                                     "w-full justify-start bg-gradient-to-r from-red-500/10 to-pink-500/10 text-red-400 hover:from-red-500/20 hover:to-pink-500/20 hover:text-red-300 border border-red-500/20 hover:border-red-500/40 rounded-xl",
//                                     STYLES.transition
//                                 )}
//                             >
//                                 <LogOut size={18} className="shrink-0 mr-2" />
//                                 <span>Logout</span>
//                             </Button>
//                         </div>
//                     )}
//                 </nav>
//             </div>
//         );
//     }

//     // Horizontal navbar
//     return (
//         <div className="sticky top-8 z-50">
//             <nav className={cn(
//                 "bg-black/70 backdrop-blur-lg border border-white/10 shadow-2xl w-[95%] mx-auto container h-16 flex justify-between items-center px-6 rounded-full",
//                 STYLES.border,
//                 STYLES.transition
//             )}>
//                 <Link href={'/'} className="flex items-center justify-center group">
//                     <Image
//                         src={logo}
//                         alt="logo"
//                         className={cn("size-16 mt-4 invert ", STYLES.transition, "group-hover:scale-110 group-hover:rotate-12")}
//                     />
//                     <span className={`${STYLES.text.primary} text-2xl`}>
//                         Inquire
//                     </span>
//                 </Link>

//                 <div className="hidden md:flex gap-2 px-4 items-center">
//                     {navItems.map((item, idx) => {
//                         const isActive = pathname === item.to;

//                         return (
//                             <Link
//                                 key={idx}
//                                 href={item.to}
//                                 className={cn(
//                                     "relative px-5 py-2 rounded-full font-medium",
//                                     STYLES.transition,
//                                     isActive
//                                         ? `${STYLES.text.primary} border-transparent`
//                                         : `${STYLES.text.secondary} hover:${STYLES.text.primary} bg-gradient-to-r ${STYLES.gradient.hover}`
//                                 )}
//                             >
//                                 {item.name}
//                                 {isActive && (
//                                     <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
//                                 )}
//                             </Link>
//                         );
//                     })}

//                     {isLoggedIn && (
//                         <>
//                             <Separator orientation="vertical" className={cn("h-6 mx-2", STYLES.border)} />

//                             <DropdownMenu>
//                                 <DropdownMenuTrigger asChild>
//                                     <Button
//                                         variant="ghost"
//                                         className={cn("flex items-center gap-2 px-4 py-2 rounded-full", STYLES.hover, STYLES.transition)}
//                                     >
//                                         <UserAvatar size="size-8" />
//                                         <span className={cn("text-sm font-medium", STYLES.text.secondary, "hover:text-white", STYLES.transition)}>
//                                             {userData?.name}
//                                         </span>
//                                     </Button>
//                                 </DropdownMenuTrigger>
//                                 <DropdownMenuContent
//                                     className={cn("w-56 bg-black/95 backdrop-blur-xl", STYLES.border)}
//                                     align="end"
//                                 >
//                                     <DropdownMenuLabel className={STYLES.text.primary}>My Account</DropdownMenuLabel>
//                                     <DropdownMenuSeparator className={STYLES.border} />
//                                     <DropdownMenuItem asChild>
//                                         <Link
//                                             href={`/profile/${userData?._id}`}
//                                             className={cn("cursor-pointer", STYLES.text.secondary, "hover:text-white focus:text-white focus:bg-white/5")}
//                                         >
//                                             <User className="mr-2 h-4 w-4" />
//                                             <span>Profile</span>
//                                         </Link>
//                                     </DropdownMenuItem>
//                                     <DropdownMenuSeparator className={STYLES.border} />
//                                     <DropdownMenuItem
//                                         onClick={logout}
//                                         className="cursor-pointer text-red-400 hover:text-red-300 focus:text-red-300 focus:bg-red-500/10"
//                                     >
//                                         <LogOut className="mr-2 h-4 w-4" />
//                                         <span>Logout</span>
//                                     </DropdownMenuItem>
//                                 </DropdownMenuContent>
//                             </DropdownMenu>
//                         </>
//                     )}
//                 </div>

//                 <Button
//                     variant="ghost"
//                     size="icon"
//                     className={cn("md:hidden rounded-full", STYLES.hover, STYLES.transition)}
//                     onClick={() => setIsOpen(!isOpen)}
//                 >
//                     <Menu strokeWidth={1.5} size={28} className={STYLES.text.secondary} />
//                 </Button>

//                 {/* Mobile Menu */}
//                 {isOpen && (
//                     <div className={cn(
//                         "absolute top-20 left-0 right-0 w-[95%] mx-auto bg-black/95 backdrop-blur-xl rounded-3xl p-6 flex flex-col gap-4 animate-in fade-in zoom-in-95 md:hidden z-50 shadow-2xl shadow-purple-500/10 border",
//                         STYLES.border
//                     )}>
//                         {navItems.map((item, idx) => {
//                             const isActive = pathname === item.to;
//                             const Icon = item.icon;

//                             return (
//                                 <Link
//                                     key={idx}
//                                     href={item.to}
//                                     onClick={() => setIsOpen(false)}
//                                     className={cn(
//                                         "flex items-center gap-4 px-4 py-3 rounded-xl text-base font-medium",
//                                         STYLES.transition,
//                                         isActive
//                                             ? `${STYLES.text.primary} bg-gradient-to-r ${STYLES.gradient.active} shadow-lg shadow-purple-500/10`
//                                             : `${STYLES.text.muted} hover:${STYLES.text.primary} ${STYLES.hover}`
//                                     )}
//                                 >
//                                     <Icon size={20} className={isActive ? "text-purple-400" : ""} />
//                                     {item.name}
//                                 </Link>
//                             );
//                         })}

//                         {isLoggedIn && (
//                             <>
//                                 <Separator className={cn("my-2", STYLES.border)} />

//                                 <Link
//                                     href={`/profile/${userData?._id}`}
//                                     onClick={() => setIsOpen(false)}
//                                     className={cn("flex items-center gap-3 px-4 py-3 rounded-xl", STYLES.hover, STYLES.transition)}
//                                 >
//                                     <UserAvatar />
//                                     <div>
//                                         <p className={cn("text-sm font-semibold", STYLES.text.primary)}>{userData?.name}</p>
//                                         <p className={cn("text-xs", STYLES.text.muted)}>View Profile</p>
//                                     </div>
//                                 </Link>

//                                 <Button
//                                     variant="ghost"
//                                     className={cn(
//                                         "bg-gradient-to-r from-red-500/10 to-pink-500/10 text-red-400 hover:from-red-500/20 hover:to-pink-500/20 hover:text-red-300 border border-red-500/20 hover:border-red-500/40 px-4 py-3 rounded-xl text-sm font-medium w-full justify-start gap-3",
//                                         STYLES.transition
//                                     )}
//                                     onClick={() => {
//                                         logout();
//                                         setIsOpen(false);
//                                     }}
//                                 >
//                                     <LogOut size={18} />
//                                     Logout
//                                 </Button>
//                             </>
//                         )}
//                     </div>
//                 )}
//             </nav>
//         </div>
//     );
// };

// export default Navbar;