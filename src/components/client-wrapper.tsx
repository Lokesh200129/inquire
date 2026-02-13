"use client";
import { useCurrentUser } from "@/hooks/auth/use-current-user";
// import GlobalLoader from "./global-loader";

export default function ClientProvider({ children }: { children: React.ReactNode }) {
    useCurrentUser();
    return <>{children}</>;
}