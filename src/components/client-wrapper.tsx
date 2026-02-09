"use client";
import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useUserStore } from "@/store/useUserStore";

export default function ClientProvider({ children }: { children: React.ReactNode }) {
    const { fetchCurrentUser } = useAuth();
    const isAuthenticated = useUserStore((state) => state.isAuthenticated);
    useEffect(() => {
        if (!isAuthenticated) {
            fetchCurrentUser();
        }
    }, []);

    return <>{children}</>;
}