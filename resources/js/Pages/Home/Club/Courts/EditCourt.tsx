import * as React from "react";
import { Head, useForm, Link, usePage } from "@inertiajs/react";
// Components
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { BasicDataForm } from "./_components/formularies/BasicDataForm";
import { OperatingTimeSlotForm } from "./_components/formularies/OperatingTimeSlotForm";
import { PricingDataForm } from "./_components/formularies/PricingDataForm";
import { ImagesForm } from "./_components/formularies/ImagesForm";
// Types
import { CreateEditCourtSchema } from "./types/types";
// Shadcn
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const breadCrumb = [
    { name: "Quadras", href: "/club/courts" },
    { name: "Editar" },
];

const defaultPromotionsByWeekday = {
    sunday: [],
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
};

export default function EditCourt() {
    const { court }: any = usePage().props;

    const { data, setData, post, processing, errors } =
        useForm<CreateEditCourtSchema>({
            name: court.data.name,
            sport: court.data.sport,
            description: court.data.description,
            grass_type: court.data.grass_type,
            floor_type: court.data.floor_type,
            type: court.data.type,
            can_play_outside: court.data.can_play_outside,
            installation_year: court.data.installation_year,
            manufacturer: court.data.manufacturer,
            is_covered: court.data.is_covered,
            status: court.data.status,
            images: court.data.images,
            sponsor_image: court.data.sponsor_image,
            pricing: court.data.pricing,
            time_slots: court.data.time_slots,
            promotions_by_weekday: { ...defaultPromotionsByWeekday, ...court.data.promotions_by_weekday },
        });

    const submit: React.FormEventHandler = (e) => {
        e.preventDefault();

        // post
    };

    function IsTabDisabled(tab: "1" | "2" | "3" | "4") {
        if (tab === "3") {
            return Object.values(data.time_slots).every(
                (slots) =>
                    Array.isArray(slots) &&
                    slots.every(
                        (slot) =>
                            slot.start_time.trim() === "" ||
                            slot.end_time.trim() === ""
                    )
            );
        }
    }

    return (
        <AuthenticatedLayout breadCrumb={breadCrumb}>
            <Head title="Criar Quadra" />
            <form className="space-y-4 mx-auto max-w-7xl" onSubmit={submit}>
                <Tabs defaultValue="1" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="1">1. Básico</TabsTrigger>
                        <TabsTrigger value="2">
                            2. Horário de Funcionamento
                        </TabsTrigger>
                        <TabsTrigger value="3" disabled={IsTabDisabled("3")}>
                            3. Precificação
                        </TabsTrigger>
                        <TabsTrigger value="4">4. Imagens</TabsTrigger>
                    </TabsList>
                    <TabsContent value="1">
                        <BasicDataForm
                            data={data}
                            errors={errors}
                            setData={setData}
                        />
                    </TabsContent>
                    <TabsContent value="2">
                        <OperatingTimeSlotForm
                            data={data}
                            errors={errors}
                            setData={setData}
                        />
                    </TabsContent>
                    <TabsContent value="3">
                        <PricingDataForm
                            data={data}
                            errors={errors}
                            setData={setData}
                        />
                    </TabsContent>
                    <TabsContent value="4">
                        <ImagesForm
                            data={data}
                            errors={errors}
                            setData={setData}
                        />
                    </TabsContent>
                </Tabs>
                <div className="flex justify-end gap-x-2">
                    <Button variant="outline">
                        <Link href={route("club.courts.index")}>Cancelar</Link>
                    </Button>
                    <Button disabled={processing}>Confirmar</Button>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
