import * as React from "react";
import { Link, Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

import GuestLayout from "@/Layouts/GuestLayout";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { AppIcon } from "@/components/icons/AppIcon";
import InputError from "@/components/InputError";
import { LanguageSelector } from "@/components/translator/LanguageSelector";

import { useTranslation } from "react-i18next";
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

export default function Login({
    status,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { t } = useTranslation();

    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post("/login", {
            onFinish: () => console.log("ok"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Acesso de Admin" />
            <header className="p-8 h-20 w-full flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <AppIcon w="28" h="28" />
                    <span className="text-xl font-bold">App - Admin</span>
                </div>
                <div className="flex">
                    <ThemeToggle colorToggle />
                    <LanguageSelector colorToggle />
                </div>
            </header>
            <div className="w-full flex justify-center items-center px-4 mt-40">
                <Card className="mx-auto max-w-sm">
                    <CardHeader>
                        <CardTitle className="text-2xl">
                            {t("auth.admin.login.title")}
                        </CardTitle>
                        <CardDescription>
                            {t("auth.login.inform-credentials")}
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
                                />
                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">
                                        {t("general.password")}
                                    </Label>
                                    <Link
                                        href={route("password.request")}
                                        className="ml-auto inline-block text-sm underline"
                                    >
                                        {t("general.forgot-password")}
                                    </Link>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    autoComplete="current-password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={processing}
                            >
                                {processing ? t("general.loading") : t("general.access")}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </GuestLayout>
    );
}
