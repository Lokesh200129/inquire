"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/auth/use-current-user";
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
    const { data: user, isLoading } = useCurrentUser();

    const isAuthenticated = !!user;

    const handleClick = (e: React.MouseEvent) => {
        if (isLoading) return;

        if (!isAuthenticated) {
            toast.error('Please login to continue');

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