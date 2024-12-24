import * as React from "react";
import { Head, usePage } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ConfirmReservationDialog } from "../_components/create/dialog/ConfirmReservationDialog";
import { SelectCourtReservationTimeDialog } from "../_components/create/dialog/SelectCourtReservationTimeDialog";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const breadCrumb = [
    { name: "Clubes", href: "/player/reservations/create" },
    { name: "Criar Reserva" },
];

export default function CreateReservationForSelectedClub() {
    const { club }: any = usePage().props;
    return (
        <AuthenticatedLayout breadCrumb={breadCrumb}>
            <Head title="Criar Reserva" />
            <header
                id="begin"
                className="relative py-12 flex justify-center items-center bg-cover bg-center"
                style={{
                    backgroundImage: `url(${club.data.images})`,
                }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-60"></div>
                <div className="relative max-w-7xl text-center">
                    <h1 className="text-4xl font-bold tracking-tight leading-none text-white mb-4 md:text-5xl lg:text-6xl">
                        {club.data.user.name}
                    </h1>
                    <p className="text-lg font-normal text-gray-300 lg:text-xl sm:px-16 xl:px-48">
                        {club.data.description}
                    </p>
                </div>
            </header>
            <div className="py-4">
                <div className="flex justify-between items-center rounded-lg border p-4">
                    <h1 className="flex text-xl font-semibold">
                        Criar Reserva
                    </h1>
                </div>
                <div className="w-full rounded-t-lg">
                    <div className="relative flex justify-end p-4">
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Selecionar Esporte" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="padel">Padel</SelectItem>
                                    <SelectItem value="tennis">
                                        Tennis
                                    </SelectItem>
                                    <SelectItem value="grapes">
                                        Beach Tennis
                                    </SelectItem>
                                    <SelectItem value="pineapple">
                                        Squash
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Nome</TableHead>
                            <TableHead className="w-[100px]">Esporte</TableHead>
                            <TableHead>Selecionar Horários</TableHead>
                            <TableHead className="text-right">
                                Reservar
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {club.data.courts.map((court) => (
                            <TableRow key={court.id}>
                                <TableCell className="font-medium">
                                    {court.name}
                                </TableCell>
                                <TableCell className="font-medium">
                                    {court.sport}
                                </TableCell>
                                <TableCell>
                                    <SelectCourtReservationTimeDialog time_slots={court.time_slots} />
                                </TableCell>
                                <TableCell className="text-right">
                                    <ConfirmReservationDialog />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AuthenticatedLayout>
    );
}
