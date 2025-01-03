import * as React from "react";
import { FormEventHandler } from "react";
import { Link, useForm } from "@inertiajs/react";

import InputError from "@/components/InputError";

import { useTranslation } from "react-i18next";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Checkbox } from "@/components/ui/checkbox";
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

export default function PlayerLogin() {
    const { toast } = useToast();
    const { t } = useTranslation();

    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post("/login", {
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
        });
    };

    return (
        <Card className="mx-auto w-full max-w-md shadow-none border-none">
            <CardHeader>
                <CardTitle className="text-2xl">
                    {t("auth.player.login.title")}
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
                            onChange={(e) => setData("email", e.target.value)}
                        />
                        <InputError message={errors.email} className="mt-2" />
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
                    <div className="grid gap-2">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData("remember", e.target.checked)
                                }
                            />
                            <label
                                htmlFor="terms"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                {t("general.remember")}
                            </label>
                        </div>
                    </div>
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={processing}
                    >
                        {processing
                            ? t("general.loading")
                            : t("general.access")}
                    </Button>
                </form>
                <div className="mt-4 text-center text-sm">
                    {t("auth.player.login.dont-have-account")}{" "}
                    <Link href="/player/register" className="underline">
                        {t("auth.login.register-link")}
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}
