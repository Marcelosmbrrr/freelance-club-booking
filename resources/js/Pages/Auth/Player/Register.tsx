import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

import { AppIcon } from "@/components/icons/AppIcon";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
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

export default function RegisterPlayer() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post("/player/register", {
            onFinish: () => alert('Sucesso! Confira o seu e-mail!'),
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
                        <span className="text-xl font-bold">App - Clube</span>
                    </div>
                    <div>
                        <ThemeToggle />
                    </div>
                </header>
                <div className="grow w-full flex items-center">
                    <Card className="mx-auto w-full max-w-md shadow-none border-none">
                        <CardHeader>
                            <CardTitle className="text-2xl">
                                Cadastrar
                            </CardTitle>
                            <CardDescription>
                                Informe os dados abaixo para requisitar o
                                cadastro do seu clube.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="grid gap-4" onSubmit={submit}>
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Nome Completo</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        autoComplete="name"
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        placeholder="Informe o nome do clube"
                                    />
                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">
                                        Endereço de e-mail
                                    </Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        autoComplete="email"
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        placeholder="Informe o endereço de e-mail"
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
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full"
                                        autoComplete="password"
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        placeholder="Informe a senha"
                                    />
                                    <InputError
                                        message={errors.password}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password-confirmation">
                                        Confirmação da senha
                                    </Label>
                                    <Input
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="mt-1 block w-full"
                                        autoComplete="password_confirmation"
                                        onChange={(e) =>
                                            setData(
                                                "password_confirmation",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Informe a senha novamente"
                                    />
                                    <InputError
                                        message={errors.password_confirmation}
                                        className="mt-2"
                                    />
                                </div>
                                <Button type="button" className="w-full">
                                    Enviar
                                </Button>
                            </form>
                            <div className="mt-4 text-center text-sm">
                                Já tem uma conta?{" "}
                                <Link
                                    href="/player/login"
                                    className="underline"
                                    disabled={processing}
                                >
                                    Acessar
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
