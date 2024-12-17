import { Head, usePage, Link, router } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const breadCrumb = [{ name: "Quadras", href: "/club/courts" }, { name: "Ver" }];

export default function ShowCourt() {
    const { court }: any = usePage().props;

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
                        <Label htmlFor="name">Nome da quadra</Label>
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
                                Tipo de Estrutura
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Informe o nome da quadra"
                                value={court.data.structure_type}
                                readOnly
                            />
                        </div>
                        <div className="w-full">
                            <Label htmlFor="area_type">Tipo de Área</Label>
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Informe o nome da quadra"
                                value={court.data.area_type}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="grass_type">
                            Tipo de grama
                        </Label>
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
                        <Label htmlFor="manufacturer">
                            Fabricante
                        </Label>
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
                            <Label htmlFor="description">
                                Descrição
                            </Label>
                            <Textarea
                                value={court.data.description}
                                placeholder="Informe a descrição da quadra"
                                readOnly
                            />
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
                    <h1 className="text-xl font-semibold">Disponibilidade</h1>
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
                {/* Reservations */}
                <div className="flex flex-col space-y-4 rounded-lg border p-8">
                    <h1 className="flex justify-between text-xl font-semibold">
                        Reservas Agendadas
                        <Button variant="outline">
                            <Link href={route("club.reservations.index")}>
                                Gerenciar
                            </Link>
                        </Button>
                    </h1>
                    <div className="space-y-4">
                        {court.data.reservations.length === 0 &&
                            "Nenhuma reserva."}
                        {court.data.reservations.length > 0 && (
                            <Table>
                                <TableCaption>
                                    Lista de reservas recentes.
                                </TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">
                                            Status
                                        </TableHead>
                                        <TableHead className="w-[100px]">
                                            Data
                                        </TableHead>
                                        <TableHead>Hora</TableHead>
                                        <TableHead className="text-right">
                                            Ações
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {court.data.reservations.map(
                                        (reservation) => (
                                            <TableRow key={reservation.id}>
                                                <TableCell>
                                                    {reservation.status}
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    {reservation.status}
                                                </TableCell>
                                                <TableCell>
                                                    {reservation.time_slots.map(
                                                        (timeslot) => (
                                                            <Badge>
                                                                {timeslot.time}
                                                            </Badge>
                                                        )
                                                    )}
                                                </TableCell>
                                                <TableCell className="flex justify-end">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger
                                                            asChild
                                                        >
                                                            <Button
                                                                variant="ghost"
                                                                className="h-8 w-8 p-0"
                                                            >
                                                                <span className="sr-only">
                                                                    Abrir Menu
                                                                </span>
                                                                <MoreHorizontal />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem
                                                                onClick={() =>
                                                                    router.get(
                                                                        "/club/reservations/" +
                                                                            reservation.id
                                                                    )
                                                                }
                                                            >
                                                                Ver Reserva
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    )}
                                </TableBody>
                                <TableFooter></TableFooter>
                            </Table>
                        )}
                    </div>
                </div>
                {/* Images */}
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
                <div className="flex justify-end gap-x-2">
                    <Button>
                        <Link href={route("club.courts.index")}>Voltar</Link>
                    </Button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
