'use client'
import {useState} from "react";
import Image from "next/image";
import {cn} from "@/lib/utils"
import {ImageModal} from "@/components/shared/images/image-modal";

export default function ProductImages({images}:{images: string[]}) {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [viewImg, setViewImg] = useState(false);

    return (
        <div className={"space-y-4 cursor-pointer"} onClick={() => setViewImg(true)}>
            <Image src={images[currentIdx]}
                   alt="Zdjecie produktu"
                   height={1000}
                   width={1000}
                   className={"min-h-[300] object-cover object-center"}
            />
            <div className={"flex justify-betweent gap-2"}>
                {images.map((image, index) => (
                   <div key={index}
                        className={ cn("cursor-pointer border hover:border-e-green-500 p-2", currentIdx === index && "border-green-400") }
                        onClick={()=>setCurrentIdx(index)}
                   >
                       <Image src={image} alt={"Zdjecie"} height={100} width={100}/>
                    </div>
                ))}
            </div>
            <ImageModal
                isOpen={viewImg}
                onClose={() => setViewImg(false)}
                images={images}
                altText={"Zdjęcie wariantu produktu"}
            />
        </div>
    )
}