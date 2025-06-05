'use client'

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { useState, useEffect } from "react";
import {CldImage} from "next-cloudinary";

interface ImageModalProps {
    isOpen: boolean
    onClose: () => void
    images: string[]
    altText: string
}

export function ImageModal({ isOpen, onClose, images, altText }: ImageModalProps) {
    const [img, setImg] = useState(images[0]);

    // Reset selected image when images prop changes
    useEffect(() => {
        if (images.length > 0) {
            setImg(images[0]);
        }
    }, [images]);

    // Handle dialog state change
    const handleOpenChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    };

    const handleThumbnailClick = (image: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setImg(image);
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTitle className="hidden">{altText}</DialogTitle>
            <DialogContent className="max-w-[90vw] p-0" onClick={(e) => e.stopPropagation()}>
                <div className="relative h-[90vh] w-full">
                    <CldImage
                        src={img || "/placeholder.svg"}
                        alt={altText}
                        fill
                        className="object-contain"
                        sizes="90vw"
                        priority
                    />
                    {/* Preview images */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 bg-black/20 py-2 px-4 rounded-lg">
                        {images.map((image, index) => {
                            const isSelected = img === image;
                            return (
                                <div
                                    key={index}
                                    className={`cursor-pointer border-2 rounded overflow-hidden transition-all ${isSelected ? 'border-green-400 scale-110' : 'border-white/40 hover:border-green-300'}`}
                                    onClick={(e) => handleThumbnailClick(image, e)}
                                >
                                    <div className="relative h-16 w-16">
                                        <CldImage
                                            src={image}
                                            alt={`Preview ${index + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}