import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

import { AppIcon } from "@/components/icons/AppIcon";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
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

export default function RegisterPlayer({ status }: { status?: string }) {
    const { t } = useTranslation();

    const { toast } = useToast();

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post("/player/register", {
            onError: () => {
                toast({
                    variant: "destructive",
                    title: "Erro!",
                    description:
                        "Confira os dados informados e tente novamente.",
                    action: (
                        <ToastAction altText="Undo the action">
                            {t("general.close")}
                        </ToastAction>
                    ),
                });
            },
            onSuccess: () => {
                reset();
                toast({
                    title: "Sucesso!",
                    description:
                        "Verifique o seu e-mail para efetivar o cadastro.",
                    action: (
                        <ToastAction altText="Undo the action">
                            {t("general.close")}
                        </ToastAction>
                    ),
                });
            },
        });
    };

    return (
        <div className="h-screen w-full flex">
            <Head title="Registro de Jogador" />
            {/* Background */}
            <div
                className="hidden lg:block w-1/2 bg-neutral-800"
                style={{
                    backgroundImage: "url('/images/player/player1.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            ></div>
            <div className="flex flex-col w-full lg:w-1/2 justify-center items-center">
                <header className="p-8 h-20 w-full flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <AppIcon w="28" h="28" />
                        <span className="text-xl font-bold">App - Jogador</span>
                    </div>
                    <div className="flex">
                        <ThemeToggle colorToggle />
                        <LanguageSelector colorToggle />
                    </div>
                </header>
                <div className="grow w-full flex items-center">
                    <Card className="mx-auto w-full max-w-md shadow-none border-none">
                        <CardHeader>
                            <CardTitle className="text-2xl">
                                {t("auth.player.register.title")}
                            </CardTitle>
                            <CardDescription>
                                {t("auth.player.register.description")}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="grid gap-4" onSubmit={submit}>
                                <div className="grid gap-2">
                                    <Label htmlFor="name">
                                        {t("general.complete-name")}
                                    </Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        autoComplete="name"
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        placeholder={t("general.complete-name")}
                                    />
                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">E-mail</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        autoComplete="email"
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
                                <div className="grid gap-2">
                                    <Label htmlFor="password">
                                        {t("general.password")}
                                    </Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={data.password}
                                        className="mt-1 block w-full"
                                        autoComplete="password"
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        placeholder= {t("general.password")}
                                    />
                                    <InputError
                                        message={errors.password}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password-confirmation">
                                        {t("general.password-confirmation")}
                                    </Label>
                                    <Input
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        type="password"
                                        value={data.password_confirmation}
                                        className="mt-1 block w-full"
                                        autoComplete="password_confirmation"
                                        onChange={(e) =>
                                            setData(
                                                "password_confirmation",
                                                e.target.value
                                            )
                                        }
                                        placeholder={t("general.password-confirmation")}
                                    />
                                    <InputError
                                        message={errors.password_confirmation}
                                        className="mt-2"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={processing}
                                >
                                    {processing
                                        ? t("general.loading")
                                        : t("general.create")}
                                </Button>
                            </form>
                            <div className="mt-4 text-center text-sm">
                                {t("general.already-have-an-account")}{" "}
                                <Link
                                    href="/login?tab=player"
                                    className="underline"
                                    disabled={processing}
                                >
                                    {t("general.login")}
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
