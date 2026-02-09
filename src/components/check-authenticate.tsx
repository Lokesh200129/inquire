"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";
import { toast } from "sonner";

interface AuthWrapperProps {
    children: React.ReactNode;
    destinationPath?: string;
}

const AuthWrapper = ({
    children,
    destinationPath = "/auth/login"
}: AuthWrapperProps) => {
    const router = useRouter();
    const isAuthenticated = useUserStore((state) => state.isAuthenticated);

    const handleClick = (e: React.MouseEvent) => {
        if (!isAuthenticated) {
            toast.error('Please login')

            e.preventDefault();
            e.stopPropagation();
            router.push(destinationPath);
        }
    };

    return (
        <div onClickCapture={handleClick} className="inline-block w-full relative">
            {children}
        </div>
    );
};

export default AuthWrapper;