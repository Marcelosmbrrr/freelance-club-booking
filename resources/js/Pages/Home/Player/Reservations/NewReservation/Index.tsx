import * as React from "react";
import { Head, router, usePage } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { SearchClubOrCourt } from "../_components/SearchClubOrCourt";
import { getDistanceFromUser } from "@/utils/functions/getDistanceFromUser";

import { Check, DollarSign, MapPin, Volleyball } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

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
    courtId: string;
    name: string;
    images: string[];
    sponsor_image?: string;
    description: string;
    geolocalization: { lat: number; lng: number };
    sports: string[];
    min_price: number;
};

const breadCrumb = [{ name: "Nova Reserva" }];

export default function Reservations() {
    const { pagination, success }: any = usePage().props;

    const {
        data,
        meta,
        links,
    }: { data: ClubOrCourt[]; meta: any; links: any } = pagination;

    const [userLocation, setUserLocation] = React.useState<{
        lat: number;
        lng: number;
    }>();

    const [clubLocation, setClubLocation] = React.useState<{
        lat: number;
        lng: number;
    }>();

    React.useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setUserLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            });
        }
    }, []);

    function calculateDistance(target_lat: number, target_lng: number) {
        let result = getDistanceFromUser(
            userLocation?.lat,
            userLocation?.lng,
            target_lat,
            target_lng
        );

        if (result) return result;

        return "Indisponível";
    }

    return (
        <AuthenticatedLayout breadCrumb={breadCrumb}>
            <Head title="Criar Reserva" />
            <SearchClubOrCourt localization={clubLocation} />
            <div className="flex justify-center gap-4 flex-wrap">
                {data.map((item) => (
                    <div
                        key={item.clubId}
                        className="group flex flex-col border rounded-lg shadow-sm w-full sm:w-auto md:w-[300px] lg:w-[380px] xl:w-[420px]"
                    >
                        <div className="flex text-clip relative">
                            <div
                                className="aspect-[3/2] size-full rounded-t-lg bg-cover bg-center"
                                style={{
                                    backgroundImage: `url(${item.images[0]})`,
                                }}
                            ></div>
                            {item.sponsor_image && (
                                <img
                                    src={item.sponsor_image}
                                    alt="Miniatura"
                                    className="absolute bottom-2 left-4 w-12 h-12 rounded border-white"
                                />
                            )}
                        </div>
                        <div className="p-4 flex flex-col grow">
                            <ul className="flex gap-x-2 mb-2 text-sm text-neutral-600">
                                <li className="flex items-center">
                                    <Volleyball className="w-4 h-4 mr-1 text-gray-800 dark:text-white" />
                                    <span>{item.sports}</span>
                                </li>

                                <li className="flex items-center">
                                    <svg
                                        className="w-4 h-4 mr-1 text-gray-800 dark:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                    <span>
                                        {calculateDistance(
                                            item.geolocalization.lat,
                                            item.geolocalization.lng
                                        )}
                                    </span>
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
                                            stroke-linecap="round"
                                            stroke-width="2"
                                            d="M8 7V6a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1M3 18v-7a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                                        />
                                    </svg>
                                    <span>a partir de R${item.min_price}</span>
                                </li>
                            </ul>
                            <div className="space-y-2 flex-grow">
                                <div className="line-clamp-3 break-words text-lg font-medium lg:text-2xl">
                                    {item.name}
                                </div>
                                <div className="line-clamp-3 break-words text-sm font-medium">
                                    {item.description}
                                </div>
                            </div>
                            <div className="flex justify-end items-center gap-2 py-2 mt-auto">
                                <div className="flex items-center gap-x-2">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    onClick={() =>
                                                        setClubLocation({
                                                            lat: item
                                                                .geolocalization
                                                                .lat,
                                                            lng: item
                                                                .geolocalization
                                                                .lng,
                                                        })
                                                    }
                                                >
                                                    <MapPin />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Pesquisar no mapa</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                    <Button
                                        onClick={() => {
                                            const currentUrl = new URL(
                                                window.location.href
                                            );
                                            const entityParam =
                                                currentUrl.searchParams.get(
                                                    "entity"
                                                );

                                            // Construir os parâmetros dinamicamente
                                            const params = {
                                                clubId: item.clubId,
                                                ...(entityParam ===
                                                    "courts" && {
                                                    courtId: item.courtId,
                                                }), // Adiciona courtId se entity for "courts"
                                            };

                                            router.get(
                                                route(
                                                    "player.new-reservation.create",
                                                    params
                                                )
                                            );
                                        }}
                                    >
                                        Selecionar
                                        <Check />
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
