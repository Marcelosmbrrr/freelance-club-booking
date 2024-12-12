import { Head, usePage, Link, router } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Carousel1 } from "@/components/carousel/Carousel1";

import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
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

const breadCrumb = [
    { name: "Quadras", href: "/club/courts" },
    { name: "Ver" },
];

export default function ShowCourt() {
    const { court }: any = usePage().props;

    return (
        <AuthenticatedLayout breadCrumb={breadCrumb}>
            <Head title="Requisição" />
            {/* Container */}
            <div className="flex justify-center items-center">
                {/* Forms Container */}
                <form className="space-y-4 w-full max-w-4xl">
                    {/* Form 1 - Basic */}
                    <div className="grid gap-4 rounded-lg border p-8">
                        <h1 className="text-xl font-semibold">Básico</h1>
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
                        <div className="grid gap-2">
                            <Label htmlFor="sport">Esporte</Label>
                            <Input
                                id="sport"
                                type="text"
                                name="sport"
                                placeholder="Esporte da quadra"
                                value={court.data.sport}
                                readOnly
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="structure_type">Esporte</Label>
                            <Input
                                id="structure_type"
                                type="text"
                                name="structure_type"
                                placeholder="Estrutura da quadra"
                                value={court.data.structure_type}
                                readOnly
                            />
                        </div>
                        <div className="flex gap-4">
                            <div className="grid w-full items-center gap-2">
                                <Label htmlFor="description">Descrição</Label>
                                <Textarea
                                    value={
                                        court.data.description ??
                                        "Nenhuma descrição."
                                    }
                                    placeholder="Descrição da quadra"
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
                    {/* Time Slots */}
                    <div className="rounded-lg space-y-4 border p-8">
                        <h1 className="text-xl font-semibold">
                            Horários da Quadra
                        </h1>
                        <ToggleGroup
                            type="multiple"
                            variant="outline"
                            className="w-full flex flex-wrap gap-4"
                            value={court.data.time_slots}
                            disabled
                        >
                            {court.data.time_slots.map(
                                (time_slot: { id: string; time: string }) => (
                                    <ToggleGroupItem
                                        key={time_slot.id}
                                        value={time_slot.id}
                                        aria-label="Toggle bold"
                                        className="flex-grow md:flex-none md:w-1/4 p-2 text-center border rounded"
                                    >
                                        {time_slot.time}
                                    </ToggleGroupItem>
                                )
                            )}
                        </ToggleGroup>
                    </div>
                    
                    {/* Images */}
                    <div className="flex flex-col space-y-4 rounded-lg border p-8">
                        <h1 className="text-xl font-semibold">Imagens</h1>
                        <div className="space-y-4">
                            {court.data.images.length === 0 &&
                                "Nenhuma imagem."}
                            {court.data.images.length > 0 && (
                                <div className="px-8">
                                    <Carousel1 items={court.data.images} />
                                </div>
                            )}
                        </div>
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
                                                                    {
                                                                        timeslot.time
                                                                    }
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
                                                                        Abrir
                                                                        Menu
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

                    <div className="flex justify-end gap-x-2">
                        <Button>
                            <Link href={route("club.courts.index")}>
                                Voltar
                            </Link>
                        </Button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
