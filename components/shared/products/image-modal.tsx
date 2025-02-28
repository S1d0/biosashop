import { Dialog, DialogContent } from "@/components/ui/dialog"
import Image from "next/image"

interface ImageModalProps {
    isOpen: boolean
    onClose: () => void
    imageUrl: string
    altText: string
}

export function ImageModal({ isOpen, onClose, imageUrl, altText }: ImageModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-[90vw] p-0">
                <div className="relative h-[90vh] w-full">
                    <Image
                        src={imageUrl || "/placeholder.svg"}
                        alt={altText}
                        fill
                        className="object-contain"
                        sizes="90vw"
                        priority
                    />
                </div>
            </DialogContent>
        </Dialog>
    )
}