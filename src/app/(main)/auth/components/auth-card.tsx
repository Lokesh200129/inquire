"use client";

import { useState } from "react"; // Added for state management
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react"; // Added Lucide icons

interface authProp {
    mode: 'login' | 'signup';
    authAction: any;
    loading?: boolean;
    error?: string;
}

export default function AuthCard({ mode, authAction, loading, error }: authProp) {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false); // State for visibility
    const isLogin = mode === 'login';
    const title = isLogin ? "Welcome Back" : "Create Account";
    const description = isLogin ? "Log in to your account" : "Join our community today";
    const footerText = isLogin ? "Don't have an account?" : "Already have an account?"
    const footerLink = isLogin ? "/auth/signup" : "/auth/login"
    const footerLinkText = isLogin ? "Sign Up" : "Log In"

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onFormSubmit = async (data: any) => {
        const result = await authAction(data);
        if (result) {
            router.push("/");
        }
    };

    return (
        <Card className="w-full md:w-1/2 lg:w-96 shadow-md mx-8">
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    {!isLogin && (
                        <Field>
                            <FieldLabel htmlFor="name">Name<span className="text-destructive">*</span></FieldLabel>
                            <Input
                                id="name"
                                placeholder="Jhon doe"
                                {...register("name", { required: "Name is required" })}
                            />
                            {errors.name && <p className="text-destructive text-xs mt-1">{errors.name.message as string}</p>}
                        </Field>
                    )}

                    <Field>
                        <FieldLabel htmlFor="email">Email<span className="text-destructive">*</span></FieldLabel>
                        <Input
                            id="email"
                            type="email"
                            placeholder="name@gmail.com"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })}
                        />
                        {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message as string}</p>}
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="password">Password<span className="text-destructive">*</span></FieldLabel>
                        <div className="relative"> {/* Wrapper for positioning the icon */}
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"} // Dynamic type
                                placeholder="Enter Password"
                                className="pr-10" // Padding so text doesn't overlap icon
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Minimum 6 characters" }
                                })}
                            />
                            <button
                                type="button" // Prevents form submission
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {errors.password && <p className="text-destructive text-xs mt-1">{errors.password.message as string}</p>}
                    </Field>
                </CardContent>

                <CardFooter className="flex flex-col gap-4  pt-6">
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Processing..." : "Submit"}
                    </Button>
                    <CardDescription>
                        {footerText} <Link href={footerLink} className="text-primary font-medium">{footerLinkText}</Link>
                    </CardDescription>
                </CardFooter>
            </form>
        </Card>
    );
}