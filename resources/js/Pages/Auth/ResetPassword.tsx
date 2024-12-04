import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/components/InputError";

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

export default function ResetPassword({
    token,
    email,
}: {
    token: string;
    email: string;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: "",
        password_confirmation: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("password.store"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Alteração da senha" />

            <div className="flex h-screen w-full items-center justify-center px-4">
                <Card className="mx-auto w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-2xl">
                            Alteração da Senha
                        </CardTitle>
                        <CardDescription>
                            Informe a nova senha abaixo.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="grid gap-4" onSubmit={submit}>
                            <div className="grid gap-2">
                                <Label htmlFor="email">
                                    Endereço de e-mail
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    readOnly
                                />
                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Senha</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    placeholder="*********"
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
                                <Label htmlFor="password_confirmation">
                                    Confirmação da senha
                                </Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    value={data.password}
                                    placeholder="*********"
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
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
                                {processing ? "Carregando..." : "Alterar Senha"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </GuestLayout>
    );
}
