"use client"
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, ShieldCheck, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCurrentUser } from "@/hooks/auth/use-current-user";

const features = [
    {
        title: "Contextual Authority",
        desc: "Your occupation and bio provide weight to your answers, helping the community identify true experts.",
        icon: <ShieldCheck className="w-10 h-10 text-primary" />,
    },
    {
        title: "Asynchronous Q&A",
        desc: "Post questions and get thoughtful, long-form responses from a global community of learners.",
        icon: <MessageSquare className="w-10 h-10 text-primary" />,
    },
    {
        title: "Personalized Feed",
        desc: "A tailored experience that surfaces the discussions most relevant to your interests and location.",
        icon: <Zap className="w-10 h-10 text-primary" />,
    },
];

export default function LandingPage() {
    const router = useRouter();
    const { data: user, isLoading } = useCurrentUser();
    const isAuthenticated = !!user;

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            router.replace("/feed");
        }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading || isAuthenticated) return null;

    return (
        <>
            <section className="flex flex-col items-center justify-center min-h-[70vh] px-4 pt-20">
                <Badge variant="secondary" className="mb-4 rounded-full px-4 py-1">
                    No Bots. Just Brains.
                </Badge>
                <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-center max-w-5xl uppercase">
                    Knowledge grows by <span className="text-primary italic">sharing.</span>
                </h1>
                <p className="mt-6 text-xl text-muted-foreground text-center max-w-2xl">
                    Inquire is the platform where curious minds meet expertise. Ask the hard questions, share your unique insights, and build your digital authority.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className="rounded-full px-8 h-12 text-md" asChild>
                        <Link href="/auth/signup">Start Inquiring</Link>
                    </Button>
                    <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-md" asChild>
                        <Link href="/discover">Explore Discussions</Link>
                    </Button>
                </div>
            </section>

            <section className="py-24 bg-slate-50/50 dark:bg-zinc-950/50">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((f, i) => (
                            <Card key={i} className="hover:border hover:border-gray-400 bg-transparent transition-colors">
                                <CardHeader>{f.icon}</CardHeader>
                                <CardContent className="space-y-2">
                                    <CardTitle className="text-2xl">{f.title}</CardTitle>
                                    <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 flex flex-col items-center justify-center text-center px-6">
                <div className="bg-primary text-primary-foreground p-12 md:p-20 rounded-[2rem] w-full max-w-6xl">
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                        Ready to share what you know?
                    </h2>
                    <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-10">
                        Join a growing community of thousands who use Inquire to discover, learn, and grow every single day.
                    </p>
                    <Button size="lg" variant="secondary" className="rounded-full px-12 h-14 text-lg font-bold" asChild>
                        <Link href="/auth/signup">Create Your Profile</Link>
                    </Button>
                </div>
            </section>
        </>
    );
}