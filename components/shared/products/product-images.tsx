"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import {CldImage} from "next-cloudinary";

interface ProductImagesProps {
    images: string[]
}

export default function ProductImages({ images }: ProductImagesProps) {
    const [selectedImage, setSelectedImage] = useState(0)

    // If no images provided, use a placeholder
    const imageUrls = images.length > 0 ? images : ["/placeholder.svg?height=600&width=600"]

    return (
        <div className="space-y-4">
            {/* Main image */}
            <div className="relative aspect-square overflow-hidden rounded-lg border border-white/10 bg-card/50">
                <CldImage
                    src={imageUrls[selectedImage] || "/placeholder.svg"}
                    alt="Product image"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Thumbnail images */}
            {imageUrls.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto pb-2">
                    {imageUrls.map((image, index) => (
                        <button
                            key={index}
                            className={cn(
                                "relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border",
                                selectedImage === index ? "border-primary" : "border-white/10 hover:border-white/30",
                            )}
                            onClick={() => setSelectedImage(index)}
                        >
                            <CldImage
                                src={image || "/placeholder.svg"}
                                alt={`Product thumbnail ${index + 1}`}
                                fill
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

