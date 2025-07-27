import {useFormStatus} from "react-dom";
import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react";

interface SubmitButtonProps {
    buttonText: string
    loadingText: string
}

export function SubmitButton({buttonText, loadingText}: SubmitButtonProps) {
    const {pending} = useFormStatus()
    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                    <p>{loadingText}</p>
                </>
            ) : (
                <p>{buttonText}</p>
            )}
        </Button>
    )
}
