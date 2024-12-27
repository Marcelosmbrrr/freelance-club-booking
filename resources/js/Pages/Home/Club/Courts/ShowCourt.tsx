import { Head, usePage, Link } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";

const breadCrumb = [{ name: "Quadras", href: "/club/courts" }, { name: "Ver" }];

export default function ShowCourt() {
    const { court }: any = usePage().props;

    console.log(court)

    return (
        <AuthenticatedLayout breadCrumb={breadCrumb}>
            <Head title="Requisição" />
            {/* Container */}
            <div className="space-y-4 max-w-4xl mx-auto">
                <div className="flex justify-between items-center rounded-lg border p-4">
                    <h1 className="text-xl font-semibold">Visualizar Quadra</h1>
                </div>
                {/* Basic */}
                <div className="grid gap-4 rounded-lg border p-8">
                    <div className="space-y-2">
                        <h1 className="text-xl font-semibold">Básico</h1>
                        <p className="text-gray-600">
                            Informe os dados básicos da quadra.
                        </p>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nome da Quadra</Label>
                        <Input
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Informe o nome da quadra"
                            value={court.data.name}
                            readOnly
                        />
                    </div>
                    {/* Linha com selects */}
                    <div className="flex gap-x-4">
                        <div className="w-full">
                            <Label htmlFor="sport">Esporte</Label>
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Informe o nome da quadra"
                                value={court.data.sport}
                                readOnly
                            />
                        </div>
                        <div className="w-full">
                            <Label htmlFor="structure_type">
                                Tipo de Quadra
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Informe o nome da quadra"
                                value={court.data.type}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="grass_type">Tipo de Superfície</Label>
                        <Input
                            id="grass_type"
                            type="text"
                            name="grass_type"
                            placeholder="Informe o tipo de superfície"
                            value={court.data.floor_type}
                            readOnly
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="grass_type">Tipo de Grama</Label>
                        <Input
                            id="grass_type"
                            type="text"
                            name="grass_type"
                            placeholder="Informe o tipo de grama"
                            value={court.data.grass_type}
                            readOnly
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="manufacturer">Fabricante</Label>
                        <Input
                            id="manufacturer"
                            type="text"
                            name="manufacturer"
                            placeholder="Informe o fabricante"
                            value={court.data.manufacturer}
                            readOnly
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="installation_year">
                            Ano de Instalação
                        </Label>
                        <Input
                            id="installation_year"
                            type="text"
                            name="installation_year"
                            placeholder="Informe o ano de instalação"
                            value={court.data.installation_year}
                            readOnly
                        />
                    </div>
                    <div className="flex gap-4">
                        <div className="grid w-full items-center gap-2">
                            <Label htmlFor="description">Descrição</Label>
                            <Textarea
                                value={court.data.description}
                                placeholder="Informe a descrição da quadra"
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <div>
                            <Label htmlFor="is_covered">
                                Cobertura da quadra
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="is_covered"
                                checked={court.data.is_covered}
                                disabled
                            />
                            <Label htmlFor="is_covered">
                                {court.data.is_covered
                                    ? "Com cobertura"
                                    : "Sem cobertura"}
                            </Label>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <div>
                            <Label htmlFor="description">
                                Jogadas fora dos limites da quadra
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="can_play_outside"
                                checked={court.data.can_play_outside}
                                disabled
                            />
                            <Label htmlFor="can_play_outside">
                                {court.data.can_play_outside
                                    ? "Permitido"
                                    : "Não Permitido"}
                            </Label>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <div>
                            <Label htmlFor="description">
                                Disponibilidade para uso
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="status"
                                checked={court.data.status}
                                disabled
                            />
                            <Label htmlFor="status">
                                {court.data.status
                                    ? "Disponível"
                                    : "Indisponível"}
                            </Label>
                        </div>
                    </div>
                </div>
                {/* Time Slots */}
                <div className="rounded-lg space-y-4 border p-8">
                    <h1 className="text-xl font-semibold">
                        Horário de Funcionamento
                    </h1>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Dia</TableHead>
                                <TableHead className="text-right">
                                    Horário
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Object.entries(court.data.time_slots).map(
                                ([key, time_slot], index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">
                                            {key}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {time_slot.start_time}-{" "}
                                            {time_slot.end_time}
                                        </TableCell>
                                    </TableRow>
                                )
                            )}
                        </TableBody>
                    </Table>
                </div>
                {/* Images */}
                <div>
                    <div className="mb-2 space-y-2">
                        <h1 className="text-xl font-semibold">
                            Fotos da Quadra
                        </h1>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {court.data.images.map((image_src, index) => (
                            <div>
                                <img
                                    className="h-36 w-full rounded-lg"
                                    src={image_src}
                                    alt={"img-" + index}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <div className="mb-2 space-y-2">
                        <h1 className="text-xl font-semibold">
                            Patrocinador da Quadra
                        </h1>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                            <img
                                className="h-36 w-full rounded-lg"
                                src={court.data.sponsor_image}
                                alt="sponsor-image"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-x-2">
                    <Button>
                        <Link href={route("club.courts.index")}>Voltar</Link>
                    </Button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
