import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Mail } from "lucide-react"

export default async function EmailNotificationPage({
                                                        params,
                                                    }: {
    params: Promise<{ email: string }>
}) {
    const email = (await params).email

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                        <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <CardTitle className="text-2xl font-bold">Email z potwierdzeniem został wysłany</CardTitle>
                    <CardDescription className="text-muted-foreground">
                        Sprawdź swoją skrzynkę pocztową, aby dokończyć rejestrację
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                        <Mail className="h-5 w-5 text-muted-foreground" />
                        <span className="text-sm font-medium break-all">{decodeURIComponent(email)}</span>
                    </div>

                    <div className="text-sm text-muted-foreground space-y-2">
                        <p>Kliknij w link w wiadomości email, aby aktywować swoje konto.</p>
                        <p>Jeśli nie widzisz wiadomości, sprawdź folder spam.</p>
                    </div>

                    <div className="pt-4">
                        <Button asChild className="w-full">
                            <Link href="/">Powrót do strony głównej</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
