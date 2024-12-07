import { Head, usePage, useForm } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// CONSULTAR CNPJ: https://www.receitaws.com.br/
// CONSULTAR CLUBE NO MAPA:

export default function EditRequest() {
    const { result }: any = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        name: result.data.name,
        email: result.data.email,
        cnpj: result.data.cnpj,
        trading_name: result.data.trading_name,
        state: result.data.state,
        city: result.data.city,
        phonenumber: result.data.phonenumber,
    });

    return (
        <AuthenticatedLayout pageName="Gerenciar Requisição">
            <Head title="Requisição" />
            <div className="max-w-4xl space-y-6 rounded-lg border p-10">
                <form className="space-y-6">
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="name">Nome do Clube</Label>
                        <Input
                            type="text"
                            id="name"
                            placeholder="Informe o nome do clube"
                            value={data.name}
                        />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="email">E-mail</Label>
                        <Input
                            type="text"
                            id="email"
                            placeholder="Informe o e-mail"
                            value={data.email}
                        />
                    </div>
                    <div className="flex gap-4">
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="cpf">CNPJ</Label>
                            <Input
                                type="text"
                                id="cpf"
                                placeholder="Informe o CNPJ"
                                value={data.cnpj}
                            />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="cpf">Razão Social</Label>
                            <Input
                                type="text"
                                id="cpf"
                                placeholder="Informe a razão social"
                                value={data.trading_name}
                            />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="cpf">Estado</Label>
                            <Input
                                type="text"
                                id="cpf"
                                placeholder="Informe o Estado"
                                value={data.state}
                            />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="cpf">Cidade</Label>
                            <Input
                                type="text"
                                id="cpf"
                                placeholder="Informe o seu CPF"
                                value={data.state}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-x-2">
                        <Button disabled={processing}>Rejeitar</Button>
                        <Button disabled={processing}>Aceitar</Button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
