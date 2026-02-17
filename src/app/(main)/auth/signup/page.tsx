"use client"
import AuthCard from "../components/auth-card";
import { useSignup } from "@/hooks/auth/use-signup";
import { useCurrentUser } from "@/hooks/auth/use-current-user";
import { useEffect } from "react";
import { useRouter } from "next/navigation";


const SignupPage = () => {
    const router = useRouter();
    const { data: user, isLoading } = useCurrentUser();
    const isAuthenticated = !!user;
    const { mutate: signupAction } = useSignup();

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            router.replace('/feed');
        }
    }, [isAuthenticated, isLoading, router]);

    // Optional: Return null or a loader if checking auth to prevent "flicker"
    if (isLoading) return null;


    return (
        <div className="flex justify-center items-center h-170">
            {/* {
               isAuthLoading ? <loader/> :  user?._id ? <>
                nsvigtre</>: {children}
            } */}
            <AuthCard
                mode='signup'
                authAction={signupAction}
            />
        </div>
    );
};

export default SignupPage;