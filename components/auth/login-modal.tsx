"use client"

import type React from "react"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Link from "next/link"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {SignupMagicLinkForm} from "@/components/auth/signup-magic-link";
import {SignInForm} from "@/components/auth/signin-form";
import { Mail } from "lucide-react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

interface LoginModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export default function LoginModal({ open, onOpenChange }: LoginModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Zaloguj się</DialogTitle>
                    <DialogDescription>Wybierz sposób logowania do swojego konta.</DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="magic-link" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="magic-link">Magic Link</TabsTrigger>
                        <TabsTrigger value="password">Hasło</TabsTrigger>
                    </TabsList>
                    <TabsContent value="magic-link" className="space-y-4">
                        <Card>
                            <CardHeader className="space-y-1">
                                <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4">
                                    <Mail className="w-4 h-4 text-blue-600" />
                                </div>
                                <CardTitle className="text-lg text-center">Zaloguj się linkiem</CardTitle>
                                <CardDescription className="text-center">Otrzymasz bezpieczny link logowania na email</CardDescription>
                            </CardHeader>
                        </Card>
                        <CardContent>
                            <SignupMagicLinkForm />
                        </CardContent>
                    </TabsContent>
                    <TabsContent value="password" className="space-y-4">
                        <SignInForm />
                    </TabsContent>
                </Tabs>

                <div className="text-center text-sm text-muted-foreground">
                    Nie masz konta?{" "}
                    <Link href="/signup" className="text-primary hover:underline" onClick={() => onOpenChange(false)}>
                        Zarejestruj się
                    </Link>
                </div>
            </DialogContent>
        </Dialog>
    )
}
