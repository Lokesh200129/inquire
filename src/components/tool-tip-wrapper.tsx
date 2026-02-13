"use client";
import React from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface TooltipWrapperProps {
    children: React.ReactNode;
    content: string | React.ReactNode;
    side?: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";
}

export function TooltipWrapper({
    children,
    content,
    side = "top",
    align = "center"
}: TooltipWrapperProps) {
    return (
        <TooltipProvider delayDuration={200}>
            <Tooltip>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent side={side} align={align} className="bg-black text-white shadow-md">
                    <p className="text-xs font-medium">{content}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}