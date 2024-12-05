import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

import { AppIcon } from "@/components/icons/AppIcon";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import InputError from "@/components/InputError";
import { Combobox } from "@/components/combobox/Combobox";

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

export default function RegisterClub({ status }: { status?: string }) {
    const { toast } = useToast();

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        cnpj: "",
        trading_name: "",
        state: "",
        city: "",
        phonenumber: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post("/club/register", {
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
            onSuccess: () => {
                toast({
                    title: "Sucesso!",
                    description:
                        "Verifique o seu e-mail para efetivar o cadastro.",
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
        <div className="h-screen w-full flex">
            <Head title="Registro de Clube" />
            {/* Background */}
            <div
                className="hidden lg:block w-1/2 bg-neutral-800"
                style={{
                    backgroundImage: "url('/images/club/club1.jpg')",
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
                                    <Label htmlFor="name">Nome do Clube</Label>
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
                                    <Label htmlFor="cnpj">CNPJ</Label>
                                    <Input
                                        id="cnpj"
                                        name="cnpj"
                                        value={data.cnpj}
                                        className="mt-1 block w-full"
                                        autoComplete="cnpj"
                                        onChange={(e) =>
                                            setData("cnpj", e.target.value)
                                        }
                                        placeholder="Informe o CNPJ"
                                    />
                                    <InputError
                                        message={errors.cnpj}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="trading-name">
                                        Razão Social
                                    </Label>
                                    <Input
                                        id="trading-name"
                                        name="trading-name"
                                        value={data.trading_name}
                                        className="mt-1 block w-full"
                                        autoComplete="trading-name"
                                        onChange={(e) =>
                                            setData(
                                                "trading_name",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Informe a razão social"
                                    />
                                    <InputError
                                        message={errors.trading_name}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Estado</Label>
                                        <Combobox
                                            options={[
                                                {
                                                    value: "city-a",
                                                    label: "Estado A",
                                                },
                                                {
                                                    value: "city-b",
                                                    label: "Estado B",
                                                },
                                            ]}
                                            placeholder="Selecionar Estado"
                                            name="state"
                                            id="state"
                                            value={data.city}
                                            setValue={(value) =>
                                                setData("state", value)
                                            }
                                        />
                                        <InputError
                                            message={errors.state}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="city">Cidade</Label>
                                        <Combobox
                                            options={[
                                                {
                                                    value: "city-a",
                                                    label: "Cidade A",
                                                },
                                                {
                                                    value: "city-b",
                                                    label: "Cidade B",
                                                },
                                            ]}
                                            placeholder="Selecionar Cidade"
                                            name="city"
                                            id="city"
                                            value={data.city}
                                            setValue={(value) =>
                                                setData("city", value)
                                            }
                                        />
                                        <InputError
                                            message={errors.city}
                                            className="mt-2"
                                        />
                                    </div>
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
                                    <Label htmlFor="phonenumber">
                                        Telefone
                                    </Label>
                                    <Input
                                        id="phonenumber"
                                        name="phonenumber"
                                        value={data.phonenumber}
                                        className="mt-1 block w-full"
                                        autoComplete="phonenumber"
                                        onChange={(e) =>
                                            setData(
                                                "phonenumber",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Informe o número de telefone"
                                    />
                                    <InputError
                                        message={errors.phonenumber}
                                        className="mt-2"
                                    />
                                </div>
                                <Button
                                    type="button"
                                    className="w-full"
                                    disabled={processing}
                                >
                                    {processing ? "Carregando..." : "Enviar"}
                                </Button>
                            </form>
                            <div className="mt-4 text-center text-sm">
                                Já tem uma conta?{" "}
                                <Link
                                    href="/club/login"
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
