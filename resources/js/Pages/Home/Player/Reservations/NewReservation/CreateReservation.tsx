import * as React from "react";
import { Head, router, usePage } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { CreateReservationForSelectedCourt } from "./_components/CreateReservationForSelectedCourt";
import { CourtsFilter } from "./_components/CourtsFilter";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarClock } from "lucide-react";

const breadCrumb = [
    { name: "Nova Reserva", href: "/player/new-reservation" },
    { name: "Criar Reserva" },
];

export interface QueryParams {
    courtId?: string;
    sport: string;
    weekday: string;
    time: { start_time: string; end_time: string };
    price: { min: number; max: number };
    type?: string;
    isCovered?: boolean;
    manufacturer?: string;
    installationYear?: string;
    search?: string;
    searchBy: string;
    orderBy: string;
    order: "asc" | "desc";
    limit: number;
    page: number;
}

export const defaultParams: QueryParams = {
    courtId: undefined,
    sport: "padel",
    weekday: "monday",
    time: { start_time: "06:00", end_time: "00:00" },
    price: { min: 10, max: 100 },
    searchBy: "name",
    orderBy: "id",
    order: "asc",
    limit: 10,
    page: 1,
    type: undefined,
    isCovered: true,
    manufacturer: undefined,
    installationYear: undefined,
    search: undefined,
};

export default function CreateReservation() {
    const { club, queryParams = null }: any = usePage().props;

    const parameters: QueryParams = { ...defaultParams, ...queryParams };

    const [courtId, setCourtId] = React.useState(parameters.courtId ?? "");

    return (
        <AuthenticatedLayout breadCrumb={breadCrumb}>
            <Head title="Criar Reserva" />
            <header
                id="begin"
                className="relative py-20 flex justify-center items-center bg-cover bg-center"
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
                {!courtId && (
                    <>
                        <CourtsFilter />
                        <div className="grid gap-x-4 gap-y-8 md:grid-cols-2 lg:gap-x-6 lg:gap-y-12 2xl:grid-cols-6">
                            {club.data.courts.map((court: any) => (
                                <div
                                    key={court.id}
                                    className="group flex flex-col border rounded-lg shadow w-full sm:w-auto md:w-[300px] lg:w-[350px] xl:w-[400px]"
                                >
                                    <div className="flex text-clip relative">
                                        <div
                                            className="aspect-[3/2] size-full rounded-t-lg bg-cover bg-center"
                                            style={{
                                                backgroundImage: `url(${court.images[0]})`,
                                            }}
                                        ></div>
                                        <img
                                            src={court.sponsor_image}
                                            alt="Miniatura"
                                            className="absolute bottom-2 left-4 w-12 h-12 rounded border-white"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <div className="mb-2">
                                            <Badge className="mr-1">
                                                {court.sport}
                                            </Badge>
                                            <Badge>
                                                a partir de R${court.min_price}
                                            </Badge>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="line-clamp-3 break-words text-lg font-medium lg:text-2xl">
                                                {court.name}
                                            </div>
                                            <div className="line-clamp-3 break-words text-sm font-medium">
                                                {court.description}
                                            </div>
                                        </div>
                                        <div className="py-4">
                                            <Button
                                                className="w-full"
                                                onClick={() =>
                                                    setCourtId(court.id)
                                                }
                                            >
                                                Ver Horários
                                                <CalendarClock />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {courtId && (
                    <CreateReservationForSelectedCourt
                        courtId={courtId}
                        setCourtId={setCourtId}
                    />
                )}
            </div>
        </AuthenticatedLayout>
    );
}
