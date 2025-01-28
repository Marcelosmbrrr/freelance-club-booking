import * as React from "react";
import { Head, router, usePage } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ReservationsFilter } from "./_components/ReservationsFilter";
import { Scheduler } from "./_components/Scheduler";
import { CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";

const breadCrumb = [{ name: "Reservas" }];

export default function Reservations() {
    const { reservations, queryParams = null, success }: any = usePage().props;

    return (
        <AuthenticatedLayout breadCrumb={breadCrumb}>
            <Head title="Reservas" />
            <div className="flex justify-between items-center py-4">
                <ReservationsFilter />
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        className="ml-auto"
                        onClick={() =>
                            router.get(route("club.reservations.create"))
                        }
                    >
                        Nova Reserva <CirclePlus />
                    </Button>
                </div>
            </div>
            <div className="rounded-md border">
                <Scheduler reservations={reservations}/>
            </div>
        </AuthenticatedLayout>
    );
}
