import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

import { AppIcon } from "@/components/icons/AppIcon";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/components/InputError";
import { LanguageSelector } from "@/components/translator/LanguageSelector";

import { useTranslation } from "react-i18next";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPassword({ status }: { status?: string }) {
    const { toast } = useToast();
    const { t } = useTranslation();

    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("password.email"), {
            onError: () => {
                toast({
                    variant: "destructive",
                    title: "Erro!",
                    description:
                        "Confira os dados informados e tente novamente.",
                    action: (
                        <ToastAction altText="Undo the action">
                            Fechar
                        </ToastAction>
                    ),
                });
            },
        });
    };

    return (
        <GuestLayout>
            <Head title="Esqueceu a senha" />
            <div className="flex flex-col w-full justify-center items-center">
                <header className="p-8 h-20 w-full flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <AppIcon w="28" h="28" />
                        <span className="text-xl font-bold">App</span>
                    </div>
                    <div className="flex">
                        <ThemeToggle colorToggle />
                        <LanguageSelector colorToggle />
                    </div>
                </header>
                <Card className="mx-auto w-full max-w-md mt-40">
                    <CardHeader>
                        <CardTitle className="text-2xl">
                            {t("auth.forgot-password.title")}
                        </CardTitle>
                        <CardDescription>
                            {t("auth.forgot-password.description")}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="grid gap-4" onSubmit={submit}>
                            <div className="grid gap-2">
                                <Label htmlFor="email">E-mail</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    placeholder="E-mail"
                                />
                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={processing}
                            >
                                {processing ? t("general.loading") : t("auth.forgot-password.submit-button")}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </GuestLayout>
    );
}
