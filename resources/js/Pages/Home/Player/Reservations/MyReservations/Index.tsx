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

export type Club = {
    id: string;
    name: string;
    image: string;
    description: string;
    zip_code: string;
    sports: string[];
    address: string;
};

const breadCrumb = [{ name: "Minhas Reservas" }];

export default function Reservations() {
    const { pagination, queryParams = null, success }: any = usePage().props;

    const { data, meta, links }: { data: Club[]; meta: any; links: any } =
        pagination;

    const [localization, setLocalization] = React.useState<{
        zip_code: string;
        address: string;
    }>();

    return (
        <AuthenticatedLayout breadCrumb={breadCrumb}>
            <Head title="Criar Reserva" />
            <SearchClubOrCourt club={localization} />
            <div className="grid gap-x-4 gap-y-8 md:grid-cols-2 lg:gap-x-6 lg:gap-y-12 2xl:grid-cols-6">
                {data.map((club) => (
                    <div
                        key={club.id}
                        className="group flex flex-col border rounded-lg shadow"
                    >
                        <div className="flex text-clip">
                            <div className="size-full">
                                <img
                                    src={club.image}
                                    className="aspect-[3/2] size-full object-cover object-centered rounded-t-lg"
                                />
                            </div>
                        </div>
                        <div className="px-4">
                            <div className="py-4 line-clamp-3 break-words text-lg font-medium lg:text-2xl">
                                {club.name}
                            </div>
                            <div className="flex justify-between items-center gap-2 py-4">
                                <div>
                                    <Badge>Disponível</Badge>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <Button
                                        variant="outline"
                                        onClick={() =>
                                            setLocalization({
                                                zip_code: club.zip_code,
                                                address: club.address,
                                            })
                                        }
                                    >
                                        <MapPin />
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            router.get(
                                                route(
                                                    "player.reservations.create",
                                                    { clubId: club.id }
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
