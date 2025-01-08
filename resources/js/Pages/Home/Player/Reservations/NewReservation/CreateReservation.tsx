import * as React from "react";
import { Head, usePage } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { TimeSelectorForSelectedCourt } from "./_components/TimeSelectorForSelectedCourt";
import { SearchClubCourts } from "./_components/SearchClubCourts";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const breadCrumb = [
    { name: "Nova Reserva", href: "/player/new-reservation" },
    { name: "Criar Reserva" },
];

export default function CreateReservationForSelectedClub() {
    const { club }: any = usePage().props;
    const [courtId, setCourtId] = React.useState(null);
    return (
        <AuthenticatedLayout breadCrumb={breadCrumb}>
            <Head title="Criar Reserva" />
            <header
                id="begin"
                className="relative py-24 flex justify-center items-center bg-cover bg-center"
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
                {courtId && <TimeSelectorForSelectedCourt courtId={courtId} setCourtId={setCourtId} />}
                {!courtId && (
                    <>
                        <SearchClubCourts club={club.data} />
                        <div className="grid gap-x-4 gap-y-8 md:grid-cols-2 lg:gap-x-6 lg:gap-y-12 2xl:grid-cols-6">
                            {club.data.courts.map((court: any) => (
                                <div
                                    key={court.id}
                                    className="group flex flex-col border rounded-lg shadow w-full sm:w-auto md:w-[300px] lg:w-[350px] xl:w-[400px]"
                                >
                                    <div className="flex text-clip">
                                        <div className="size-full">
                                            <img
                                                src={court.images[0]}
                                                className="aspect-[3/2] size-full object-cover object-centered rounded-t-lg"
                                            />
                                        </div>
                                    </div>
                                    <div className="px-4 gap-y-4">
                                        <div className="py-2 line-clamp-3 break-words text-lg font-medium lg:text-2xl">
                                            {court.name}
                                        </div>
                                        <div className="space-x-1">
                                            <Badge variant="outline">
                                                {court.sport}
                                            </Badge>
                                            <Badge variant="outline">
                                                R${court.price}
                                            </Badge>
                                        </div>
                                        <div className="py-4">
                                            <Button
                                                variant="outline"
                                                className="w-full"
                                                onClick={() => setCourtId(court.id)}
                                            >
                                                Selecionar
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
