import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

import GuestLayout from "@/Layouts/GuestLayout";

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

import InputError from "@/components/InputError";

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("password.email"));
    };

    return (
        <GuestLayout>
            <Head title="Esqueceu a senha" />
            <div className="flex h-screen w-full items-center justify-center px-4">
                <Card className="mx-auto w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-2xl">
                            Recuperação da Conta
                        </CardTitle>
                        <CardDescription>
                            Informe o seu e-mail abaixo para receber o link de
                            alteração da senha.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="grid gap-4" onSubmit={submit}>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Endereço de e-mail</Label>
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
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={processing}
                            >
                                {processing ? "Carregando..." : "Enviar Link"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </GuestLayout>
    );
}
