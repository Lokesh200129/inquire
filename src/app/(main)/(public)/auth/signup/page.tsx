"use client";
import AuthCard from "../components/auth-card";
import { useSignup } from "@/hooks/auth/use-signup";
import { useCurrentUser } from "@/hooks/auth/use-current-user"; // Import your query hook
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const SignupPage = () => {
    const router = useRouter();
    const { data: user, isLoading: isAuthLoading } = useCurrentUser();
    const isAuthenticated = !!user;

    const { mutate: signupAction } = useSignup();

    useEffect(() => {

        if (!isAuthLoading && isAuthenticated) {
            router.replace('/feed');
        }
    }, [isAuthenticated, isAuthLoading, router]);
    if (isAuthLoading) return null;

    return (
        <div className="flex justify-center items-center h-170">
            <AuthCard
                mode='signup'
                authAction={signupAction}
            />
        </div>
    );
};

export default SignupPage;