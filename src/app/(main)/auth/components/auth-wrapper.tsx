"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/auth/use-current-user";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const router = useRouter();
    const { data: user, isLoading } = useCurrentUser();

    useEffect(() => {
        // Agar loading khatam ho gayi hai aur user nahi mila
        if (!isLoading && !user) {
            router.replace("/auth/login");
        }
    }, [user, isLoading, router]);

    // Jab tak check ho raha hai, tab tak kuch mat dikhao (ya spinner dikhao)
    if (isLoading || !user) {
        return (
            <div className="h-screen w-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary"></div>
            </div>
        );
    }

    return <>{children}</>;
};

export default ProtectedRoute;