import * as React from "react";
import { Head, usePage } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { CreateReservationForSelectedCourt } from "./_components/CreateReservationForSelectedCourt";
import { CourtsFilter } from "./_components/CourtsFilter";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarClock, Volleyball } from "lucide-react";

const breadCrumb = [
    { name: "Nova Reserva", href: "/player/new-reservation" },
    { name: "Criar Reserva" },
];

export default function CreateReservation() {
    const { club, queryParams = null }: any = usePage().props;

    const [courtId, setCourtId] = React.useState(queryParams.courtId ?? "");

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
                                        <ul className="flex gap-x-2 mb-2 text-sm text-neutral-600">
                                            <li className="flex items-center">
                                                <Volleyball className="w-4 h-4 mr-1 text-gray-800 dark:text-white" />
                                                <span>{court.sport}</span>
                                            </li>
                                            <li className="flex items-center">
                                                <svg
                                                    className="w-4 h-4 mr-1 text-gray-800 dark:text-white"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeWidth="2"
                                                        d="M8 7V6a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1M3 18v-7a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                                                    />
                                                </svg>
                                                <span>
                                                    a partir de R$
                                                    {court.min_price}
                                                </span>
                                            </li>
                                        </ul>
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

                            {club.data.courts.length === 0 &&
                                "Nenhum resultado encontrado."}
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
