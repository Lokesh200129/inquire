"use client";
import { useCurrentUser } from "@/hooks/auth/use-current-user";

export default function ClientProvider({ children }: { children: React.ReactNode }) {
    useCurrentUser();
    return <>{children}</>;
}