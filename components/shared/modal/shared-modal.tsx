import {Dialog, DialogContent, DialogOverlay} from "@/components/ui/dialog";
import {useRouter} from "next/router";
import {ReactNode} from "react";

export default function SharedModal({ children }: { children: ReactNode }) {
    const router = useRouter();

    function handleOpenChange(){
        router.back()
    }

    return (
        <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
            <DialogOverlay>
                <DialogContent>{children}</DialogContent>
            </DialogOverlay>
        </Dialog>
    );

}

// https://github.com/gitdagray/nextjs-form-modal/blob/main/src/components/Modal.tsx