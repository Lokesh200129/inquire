import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export const ImagePreview = ({ file, onRemove }: { file: File | undefined, onRemove: () => void }) => {
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        if (!file) return setPreview(null);
        const url = URL.createObjectURL(file);
        setPreview(url);
        return () => URL.revokeObjectURL(url);
    }, [file]);

    if (!preview) return null;

    return (
        <div className="relative mt-4 max-w-1/3 p-4 rounded-lg border bg-muted">
            <Image src={preview} alt="Preview" className="object-cover size-28" width={112} height={112} />
            <Button type="button" variant="ghost" size="icon" onClick={onRemove} className="absolute top-2 right-2 rounded-full h-8 w-8 shadow-md">
                <X className="h-4 w-4" />
            </Button>
        </div>
    );
};