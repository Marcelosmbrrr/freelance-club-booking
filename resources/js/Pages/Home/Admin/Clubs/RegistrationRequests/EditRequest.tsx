import { Head, usePage, useForm } from "@inertiajs/react";
import { useQuery } from "@tanstack/react-query";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/components/InputError";
import { fetchCNPJ } from "./_utils/fetchCNPJ";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const breadCrumb = [
    { name: "Requisições", href: "/admin/registration-requests" },
    { name: "Editar" },
];

export default function EditRequest() {
    const { result }: any = usePage().props;

    const { data, setData, post, processing, errors, reset, setError } =
        useForm({
            id: result.data.id,
            name: result.data.name,
            email: result.data.email,
            cnpj: result.data.cnpj,
            trading_name: result.data.trading_name,
            state: result.data.state,
            city: result.data.city,
            phonenumber: result.data.phonenumber,
        });

    const {
        isSuccess,
        data: cnpjData,
        error,
        refetch,
        isFetching,
    } = useQuery({
        queryKey: ["cnpj", data.cnpj],
        queryFn: fetchCNPJ,
        enabled: false,
    });

    function handleDenyRequisition() {
        console.log("deny");
    }

    function handleAcceptRequisition() {
        console.log("accept");
    }

    return (
        <AuthenticatedLayout breadCrumb={breadCrumb}>
            <Head title="Requisição" />
            <div className="flex justify-center items-center">
                <form className="space-y-4 w-full max-w-4xl">
                    <div className="flex justify-between items-center rounded-lg border p-4">
                        <h1 className="text-xl font-semibold">
                            Requisição de Registro
                        </h1>
                    </div>
                    <div className="grid gap-4 rounded-lg border p-8">
                        <div className="space-y-2">
                            <h1 className="text-xl font-semibold">
                                Dados do Clube
                            </h1>
                            <p className="text-gray-600">
                                Verifique abaixo os dados do clube que está
                                requisitando cadastro no sistema.
                            </p>
                        </div>
                        <div className="grid w-full items-center gap-2">
                            <Label htmlFor="name">Nome do Clube</Label>
                            <Input
                                type="text"
                                id="name"
                                placeholder="Informe o nome do clube"
                                value={data.name}
                                readOnly
                            />
                        </div>
                        <div className="grid w-full items-center gap-2">
                            <Label htmlFor="email">E-mail</Label>
                            <Input
                                type="text"
                                id="email"
                                placeholder="Informe o e-mail"
                                value={data.email}
                                readOnly
                            />
                        </div>
                        <div className="flex gap-4">
                            <div className="grid w-full items-center gap-2">
                                <Label htmlFor="cpf">Razão Social</Label>
                                <Input
                                    type="text"
                                    id="cpf"
                                    placeholder="Informe a razão social"
                                    value={data.trading_name}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="grid w-full items-center gap-2">
                                <Label htmlFor="cpf">Estado</Label>
                                <Input
                                    type="text"
                                    id="cpf"
                                    placeholder="Informe o Estado"
                                    value={data.state}
                                    readOnly
                                />
                            </div>
                            <div className="grid w-full items-center gap-2">
                                <Label htmlFor="cpf">Cidade</Label>
                                <Input
                                    type="text"
                                    id="cpf"
                                    placeholder="Informe a sua Cidade"
                                    value={data.city}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="grid w-full items-center gap-2">
                            <Label htmlFor="zip_code">CNPJ</Label>
                            <div className="relative">
                                <Input
                                    type="text"
                                    id="zip_code"
                                    placeholder="Informe o CNPJ"
                                    value={data.cnpj}
                                    readOnly
                                />
                                <button
                                    type="button"
                                    onClick={() => refetch()}
                                    className="absolute inset-y-0 right-0 flex items-center px-3 text-sm font-medium text-primary hover:text-primary-foreground"
                                >
                                    🔍
                                </button>
                            </div>
                            <InputError
                                message={
                                    error ? "Nenhum resultado encontrado." : ""
                                }
                            />
                        </div>
                        {isSuccess && cnpjData && (
                            <Button className="w-fit">
                                <a
                                    href={
                                        "https://publica.cnpj.ws/cnpj/" +
                                        data.cnpj.replace(/[^\d]/g, "")
                                    }
                                    target="_blank"
                                >
                                    Ver Resultado
                                </a>
                            </Button>
                        )}
                        {isFetching && <span>Aguarde ...</span>}
                    </div>
                    <div className="flex justify-end gap-x-2">
                        <Button
                            disabled={processing}
                            onClick={handleDenyRequisition}
                            type="button"
                        >
                            Rejeitar
                        </Button>
                        <Button
                            disabled={processing}
                            onClick={handleAcceptRequisition}
                            type="button"
                        >
                            Aceitar
                        </Button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
