import * as React from "react";

import { useForm, usePage } from "@inertiajs/react";
import { FormEventHandler } from "react";
import axios from "axios";

import { applyCNPJMask } from "@/utils/functions/applyCNPJMask";
import { applyCEPMask } from "@/utils/functions/applyCEPMask";

import InputError from "@/components/InputError";
import { ClubImages } from "./ClubImages";
import { GoogleMaps } from "@/components/google-maps/GoogleMaps";

import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ProfileForm() {
    const { user }: any = usePage().props;
    const { toast } = useToast();

    const { data, setData, patch, processing, errors, reset } = useForm({
        name: user.data.name,
        email: user.data.email,
        cnpj: user.data.club.cnpj,
        trading_name: user.data.club.trading_name,
        zip_code: user.data.club.zip_code,
        address: user.data.club.address,
        city: user.data.club.city,
        state: user.data.club.state,
        phonenumber: user.data.club.phonenumber,
        description: user.data.club.description,
        images: user.data.club.images,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch("/club/profile/" + user.data.id, {
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
                    description: "Os dados pessoais foram atualizados.",
                    action: (
                        <ToastAction altText="Undo the action">
                            Fechar
                        </ToastAction>
                    ),
                });
            },
        });
    };

    function handleSearchZipCode() {
        axios
            .get("https://viacep.com.br/ws/" + data.zip_code + "/json/")
            .then((response) => {
                const { logradouro, localidade, uf } = response.data;
                setData((prevData) => ({
                    ...prevData,
                    address: logradouro || "",
                    city: localidade || "",
                    state: uf || "",
                }));
            })
            .catch((error) => {
                console.log(error);
                toast({
                    variant: "destructive",
                    title: "Erro ao buscar o CEP",
                    description: "Por favor, verifique o CEP informado.",
                });
            });
    }

    return (
        <section className="space-y-4">
            <div className="space-y-4 rounded-lg border p-8">
                <form className="space-y-6" onSubmit={submit}>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="name">Nome Completo</Label>
                        <Input
                            type="text"
                            id="name"
                            placeholder="Informe o seu nome"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="email">E-mail</Label>
                        <Input
                            type="text"
                            id="email"
                            placeholder="Informe o seu e-mail"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="phonenumber">Contato</Label>
                        <Input
                            type="text"
                            id="phonenumber"
                            placeholder="Informe o número para contato"
                            value={data.phonenumber}
                            onChange={(e) =>
                                setData("phonenumber", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.phonenumber}
                            className="mt-2"
                        />
                    </div>
                    <div className="flex gap-4">
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="cnpj">CNPJ</Label>
                            <Input
                                type="text"
                                id="cnpj"
                                placeholder="Informe o CNPJ"
                                value={data.cnpj}
                                onChange={(e) =>
                                    setData(
                                        "cnpj",
                                        applyCNPJMask(e.target.value)
                                    )
                                }
                            />
                            <InputError
                                message={errors.cnpj}
                                className="mt-2"
                            />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="zip_code">CEP</Label>
                            <div className="relative">
                                <Input
                                    type="text"
                                    id="zip_code"
                                    placeholder="Informe o CEP"
                                    value={data.zip_code}
                                    onChange={(e) =>
                                        setData(
                                            "zip_code",
                                            applyCEPMask(e.target.value)
                                        )
                                    }
                                />
                                <button
                                    type="button"
                                    onClick={handleSearchZipCode} // Substitua por sua lógica de busca
                                    className="absolute inset-y-0 right-0 flex items-center px-3 text-sm font-medium text-primary hover:text-primary-foreground"
                                >
                                    🔍
                                </button>
                            </div>
                            <InputError
                                message={errors.zip_code}
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="address">Endereço</Label>
                        <Input
                            type="text"
                            id="address"
                            placeholder="Informe o endereço"
                            name="address"
                            value={data.address}
                        />
                        <InputError message={errors.address} className="mt-2" />
                    </div>
                    <div className="flex gap-4">
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="cpf">Razão Social</Label>
                            <Input
                                type="text"
                                id="cpf"
                                placeholder="Informe a razão social"
                                value={data.trading_name}
                                onChange={(e) =>
                                    setData(
                                        "trading_name",
                                        applyCNPJMask(e.target.value)
                                    )
                                }
                            />
                            <InputError
                                message={errors.trading_name}
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Estado</Label>
                            <Input
                                type="text"
                                id="state"
                                placeholder="Informe o estado"
                                value={data.state}
                                readOnly
                            />
                            <InputError
                                message={errors.state}
                                className="mt-2"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="city">Cidade</Label>
                            <Input
                                type="text"
                                id="city"
                                placeholder="Informe a cidade"
                                value={data.city}
                                readOnly
                            />
                            <InputError
                                message={errors.city}
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="bio">Descrição</Label>
                        <Textarea
                            id="bio"
                            placeholder="Fale sobre você"
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                        />
                    </div>
                    <Button
                        className="w-full"
                        type="submit"
                        disabled={processing}
                    >
                        {processing ? "Carregando ..." : "Salvar Dados"}
                    </Button>
                </form>
            </div>

            <div className="rounded-lg border p-8">
                <div className="mb-2 space-y-2">
                    <h1 className="text-xl font-semibold">Geolocalização</h1>
                    <p className="text-gray-600">
                        Utilize o marcador para informar a localização do seu
                        clube.
                    </p>
                </div>
                <GoogleMaps />
                <Button
                    className="w-full mt-2"
                    type="submit"
                    disabled={processing}
                >
                    {processing ? "Carregando ..." : "Salvar Localização"}
                </Button>
            </div>

            <div className="rounded-lg border p-8">
                <div className="mb-2 space-y-2">
                    <h1 className="text-xl font-semibold">Imagens</h1>
                    <p className="text-gray-600">
                        Clique no botão abaixo para carregar e organizar as
                        imagens do clube.
                    </p>
                </div>
                <InputError message={errors.images} />
                <ClubImages
                    setImages={(urls: string[]) => setData("images", urls)}
                    images={data.images}
                />
            </div>
        </section>
    );
}
