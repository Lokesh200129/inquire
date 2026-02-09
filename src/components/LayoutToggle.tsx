"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar";

interface LayoutWrapperProps {
    children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
    const pathname = usePathname();
    const isFeedPage = pathname === "/feed";

    return (
        <div className={`min-h-screen flex ${isFeedPage ? "flex-row" : "flex-col"}`}>
            <Navbar isSidebar={isFeedPage} />
            <main className="flex-1">
                {children}
            </main>
        </div>
    );
}