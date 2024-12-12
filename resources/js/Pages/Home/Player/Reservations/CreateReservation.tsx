import * as React from "react";
import { Head, usePage } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { SearchClub } from "./_components/SearchClub";

import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export type Club = {
    id: string;
    name: string;
    image: string;
    description: string;
    latitude: string;
    longitude: string;
    sports: string[];
    address: string;
};

const breadCrumb = [
    { name: "Reservas", href: "/player/reservations" },
    { name: "Criar" },
];

export default function CreateReservation() {
    const { pagination, queryParams = null, success }: any = usePage().props;

    const { data, meta, links }: { data: Club[]; meta: any; links: any } =
        pagination;

    const [localization, setLocalization] = React.useState<{
        latitude: string;
        longitude: string;
        address: string;
    }>();

    return (
        <AuthenticatedLayout breadCrumb={breadCrumb}>
            <Head title="Criar Reserva" />
            <SearchClub club={localization} />
            <div className="grid gap-x-4 gap-y-8 md:grid-cols-2 lg:gap-x-6 lg:gap-y-12 2xl:grid-cols-4">
                {data.map((club) => (
                    <a
                        key={club.id}
                        className="group flex flex-col border rounded-lg shadow"
                    >
                        <div className="mb-4 flex text-clip md:mb-5">
                            <div className="size-full">
                                <img
                                    src={club.image}
                                    className="aspect-[3/2] size-full object-cover object-center rounded-t-lg"
                                />
                            </div>
                        </div>

                        <div className="px-4">
                            <div className="space-x-1">
                                {club.sports.map((sport) => (
                                    <Badge>{sport}</Badge>
                                ))}
                            </div>
                            <div className="mb-2 line-clamp-3 break-words pt-4 text-lg font-medium md:mb-3 md:pt-4 md:text-2xl lg:pt-4 lg:text-3xl">
                                {club.name}
                            </div>
                            <div className="mb-4 line-clamp-2 text-sm text-muted-foreground md:mb-5 md:text-base">
                                {club.description}
                            </div>
                            <div className="flex justify-end items-center gap-2 py-4">
                                <Button
                                    onClick={() =>
                                        setLocalization({
                                            latitude: club.latitude,
                                            longitude: club.longitude,
                                            address: club.address,
                                        })
                                    }
                                >
                                    <MapPin />
                                </Button>
                                <Button>Reservar</Button>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
