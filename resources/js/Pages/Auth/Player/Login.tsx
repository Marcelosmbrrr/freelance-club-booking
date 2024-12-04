import * as React from "react";
import { FormEventHandler } from "react";
import { Link, useForm, Head } from "@inertiajs/react";

import GuestLayout from "@/Layouts/GuestLayout";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { AppIcon } from "@/components/icons/AppIcon";
import InputError from "@/components/InputError";

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

export default function LoginPlayer({
    status,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { toast } = useToast();

    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post("/login", {
            onFinish: () => reset("password"),
        });
    };

    React.useEffect(() => {
        if (status) {
            toast({
                title: "Status Update",
                description: status,
                action: (
                    <ToastAction altText="Undo the action">Fechar</ToastAction>
                ),
            });
        }
    }, [status]);

    return (
        <GuestLayout>
            <Head title="Acesso de Jogador" />
            <div className="h-screen w-full flex">
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
                            <span className="text-xl font-bold">
                                App - Jogador
                            </span>
                        </div>
                        <div>
                            <ThemeToggle />
                        </div>
                    </header>
                    <div className="grow w-full flex items-center">
                        <Card className="mx-auto w-full max-w-md shadow-none border-none">
                            <CardHeader>
                                <CardTitle className="text-2xl">
                                    Acessar
                                </CardTitle>
                                <CardDescription>
                                    Informe suas credenciais abaixo para
                                    realizar o acesso.
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
                                                Senha
                                            </Label>
                                            <Link
                                                href={route("password.request")}
                                                className="ml-auto inline-block text-sm underline"
                                            >
                                                Esqueceu a senha?
                                            </Link>
                                        </div>
                                        <Input
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            autoComplete="current-password"
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value
                                                )
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
                                                    setData(
                                                        "remember",
                                                        e.target.checked
                                                    )
                                                }
                                            />
                                            <label
                                                htmlFor="terms"
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                Lembrar
                                            </label>
                                        </div>
                                    </div>
                                    <Button
                                        type="submit"
                                        className="w-full"
                                        disabled={processing}
                                    >
                                        {processing
                                            ? "Carregando ..."
                                            : "Acessar"}
                                    </Button>
                                </form>
                                <div className="mt-4 text-center text-sm">
                                    Não tem uma conta?{" "}
                                    <Link
                                        href="/player/register"
                                        className="underline"
                                    >
                                        Cadastrar
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
