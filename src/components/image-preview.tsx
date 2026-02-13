"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export const ImagePreview = ({ files, onRemove }: { files: File[] | undefined, onRemove: (index: number) => void }) => {
    const [previews, setPreviews] = useState<string[]>([]);

    useEffect(() => {
        if (!files || files.length === 0) {
            setPreviews([]);
            return;
        }

        const objectUrls = files.map(file => URL.createObjectURL(file));
        setPreviews(objectUrls);

        return () => objectUrls.forEach(url => URL.revokeObjectURL(url));
    }, [files]);

    if (previews.length === 0) return null;

    return (
        <div className="flex flex-wrap gap-3">
            {previews.map((url, index) => (
                <div key={url} className="relative group rounded-lg border bg-muted overflow-hidden">
                    <Image
                        src={url}
                        alt={`Preview ${index}`}
                        className="object-cover size-24"
                        width={96}
                        height={96}
                    />
                    <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => onRemove(index)}
                        className="absolute top-1 right-1 h-6 w-6 rounded-full bg-red-500"
                    >
                        <X className="h-3 w-3 " strokeWidth={3} />
                    </Button>
                </div>
            ))}
        </div>
    );
};