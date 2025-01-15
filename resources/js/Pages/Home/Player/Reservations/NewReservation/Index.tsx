import * as React from "react";
import { Head, router, usePage } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { SearchClubOrCourt } from "../_components/SearchClubOrCourt";

import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function RadioGroupDemo() {
    return (
        <RadioGroup defaultValue="comfortable">
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="default" id="r1" />
                <Label htmlFor="r1">Default</Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="comfortable" id="r2" />
                <Label htmlFor="r2">Comfortable</Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="compact" id="r3" />
                <Label htmlFor="r3">Compact</Label>
            </div>
        </RadioGroup>
    );
}

export type ClubOrCourt = {
    clubId: string;
    name: string;
    images: string[];
    description: string;
    geolocalization: { lat: number; lng: number };
    sports: string[];
};

const breadCrumb = [{ name: "Nova Reserva" }];

export default function Reservations() {
    const { pagination, queryParams = null, success }: any = usePage().props;

    const {
        data,
        meta,
        links,
    }: { data: ClubOrCourt[]; meta: any; links: any } = pagination;

    const [localization, setLocalization] = React.useState<{
        lat: number;
        lng: number;
    }>();

    return (
        <AuthenticatedLayout breadCrumb={breadCrumb}>
            <Head title="Criar Reserva" />
            <SearchClubOrCourt localization={localization} />
            <div className="grid gap-x-4 gap-y-8 md:grid-cols-2 lg:gap-x-6 lg:gap-y-12 2xl:grid-cols-6">
                {data.map((item) => (
                    <div
                        key={item.clubId}
                        className="group flex flex-col border rounded-lg shadow w-full sm:w-auto md:w-[300px] lg:w-[350px] xl:w-[400px]"
                    >
                        <div className="flex text-clip">
                            <div className="size-full">
                                <img
                                    src={item.images[0]}
                                    className="aspect-[3/2] size-full object-cover object-centered rounded-t-lg"
                                />
                            </div>
                        </div>
                        <div className="px-4">
                            <div className="py-2 line-clamp-3 break-words text-lg font-medium lg:text-2xl">
                                {item.name}
                            </div>
                            <div className="flex justify-end items-center gap-2 py-2">
                                <div className="flex items-center gap-x-2">
                                    <Button
                                        variant="outline"
                                        onClick={() =>
                                            setLocalization({
                                                lat: item.geolocalization.lat,
                                                lng: item.geolocalization.lng,
                                            })
                                        }
                                    >
                                        <MapPin />
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            router.get(
                                                route(
                                                    "player.new-reservation.create",
                                                    { clubId: item.clubId }
                                                )
                                            );
                                        }}
                                    >
                                        Reservar
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
