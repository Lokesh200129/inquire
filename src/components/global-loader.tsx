"use client"
import { useUiStore } from "@/store/useUiStore";

export const GlobalLoader = () => {
    const isLoading = useUiStore((state) => state.isLoading);

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-background/60 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-2">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                <p className="text-sm font-medium">Loading...</p>
            </div>
        </div>
    );
};