"use client";
import AuthCard from "../components/auth-card";
import { useAuth } from "@/hooks/use-auth";
import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";

const SignupPage = () => {
    const { signup } = useAuth();
    const router = useRouter();
    const isAuthenticated = useUserStore((state) => state.isAuthenticated)

    useEffect(() => {
        if (isAuthenticated) {
            router.replace('/feed')
        }
    }, [])

    return (
        <div className="flex justify-center items-center h-170">
            <AuthCard
                mode='signup'
                authAction={signup}
            />
        </div>
    );
};

export default SignupPage;