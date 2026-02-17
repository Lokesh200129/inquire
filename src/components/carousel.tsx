"use client";
import Image from "next/image";
import { X } from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

interface PostImageCarouselProps {
    images: string[];
    isVisible: boolean;
    onClose: () => void;
    initialIndex?: number;
}

export default function PostImageCarousel({
    images,
    isVisible,
    onClose,
    initialIndex = 0
}: PostImageCarouselProps) {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
            {/* Close Button */}
            <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="absolute top-4 right-4 z-50 text-white hover:bg-white/20 rounded-full"
            >
                <X className="size-6" />
            </Button>

            {/* Image Counter */}
            {/* <div className="absolute top-4 left-4 z-50 text-white bg-black/50 px-3 py-1.5 rounded-full text-sm font-medium">
                {initialIndex + 1} / {images.length}
            </div> */}

            {/* Carousel */}
            <Carousel
                className="w-full max-w-5xl mx-auto px-4 md:px-12 group"
                opts={{
                    startIndex: initialIndex,
                    loop: true,
                }}
            >
                <CarouselContent>
                    {images.map((src, index) => (
                        <CarouselItem key={index}>
                            <div className="flex items-center justify-center h-[80vh]">
                                <div className="relative w-full h-full">
                                    <Image
                                        src={src}
                                        alt={`Post image ${index + 1}`}
                                        fill
                                        className="object-contain"
                                        priority={index === initialIndex}
                                    />
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {images.length > 1 && (
                    <>
                        <CarouselPrevious className="left-2  bg-white/10 hover:bg-white/20 text-white border-white/20" />
                        <CarouselNext className="right-2 bg-white/10 hover:bg-white/20 text-white border-white/20" />
                    </>
                )}
            </Carousel>
            <div
                className="absolute inset-0 -z-10"
                onClick={onClose}
            />
        </div>
    );
}