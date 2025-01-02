import * as React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import axios from "axios";

import { applyCNPJMask } from "@/utils/functions/applyCNPJMask";
import { statesList } from "@/utils/data/statesList";

import { AppIcon } from "@/components/icons/AppIcon";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import InputError from "@/components/InputError";
import { Combobox } from "@/components/combobox/Combobox";
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

export default function RegisterClub({ status }: { status?: string }) {
    const { toast } = useToast();
    const [cities, setCities] = React.useState<string[]>([]);
    const { t } = useTranslation();

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
                reset();
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

    React.useEffect(() => {
        getCities();
    }, [data.state]);

    function getCities() {
        axios
            .get(
                "https://servicodados.ibge.gov.br/api/v1/localidades/estados/" +
                    data.state +
                    "/municipios"
            )
            .then((response) => {
                setCities(response.data.map((item: any) => item.nome));
            })
            .catch(() => {
                setCities([]);
            });
    }

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
                    <div className="flex">
                        <ThemeToggle colorToggle />
                        <LanguageSelector colorToggle />
                    </div>
                </header>
                <div className="grow w-full flex items-center">
                    <Card className="mx-auto w-full max-w-md shadow-none border-none">
                        <CardHeader>
                            <CardTitle className="text-2xl">
                                {t("auth.club.register.title")}
                            </CardTitle>
                            <CardDescription>
                                {t("auth.club.register.description")}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="grid gap-4" onSubmit={submit}>
                                <div className="grid gap-2">
                                    <Label htmlFor="name">
                                        {t("general.club-name")}
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
                                        placeholder={t("general.club-name")}
                                    />
                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="cnpj">
                                        {t("general.EIN")}
                                    </Label>
                                    <Input
                                        id="cnpj"
                                        name="cnpj"
                                        value={data.cnpj}
                                        className="mt-1 block w-full"
                                        autoComplete="cnpj"
                                        onChange={(e) =>
                                            setData(
                                                "cnpj",
                                                applyCNPJMask(e.target.value)
                                            )
                                        }
                                        placeholder={t("general.EIN")}
                                    />
                                    <InputError
                                        message={errors.cnpj}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="trading-name">
                                        {t("general.trading-name")}
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
                                        placeholder={t("general.trading-name")}
                                    />
                                    <InputError
                                        message={errors.trading_name}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">
                                            {" "}
                                            {t("general.state")}
                                        </Label>
                                        <Combobox
                                            options={statesList.map((item) => ({
                                                value: item,
                                                label: item,
                                            }))}
                                            placeholder={t(
                                                "general.select-option"
                                            )}
                                            name="state"
                                            id="state"
                                            value={data.state}
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
                                        <Label htmlFor="city">
                                            {t("general.city")}
                                        </Label>
                                        <Combobox
                                            options={cities.map((item) => ({
                                                value: item,
                                                label: item,
                                            }))}
                                            placeholder={t(
                                                "general.select-option"
                                            )}
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
                                        placeholder={t("general.telephone")}
                                    />
                                    <InputError
                                        message={errors.phonenumber}
                                        className="mt-2"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={processing}
                                >
                                    {processing ? "Carregando..." : "Enviar"}
                                </Button>
                            </form>
                            <div className="mt-4 text-center text-sm">
                                {t("general.already-have-an-account")}{" "}
                                <Link
                                    href="/login?tab=club"
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
