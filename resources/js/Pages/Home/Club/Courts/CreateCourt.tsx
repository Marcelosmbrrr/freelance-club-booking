import * as React from "react";
import { Head, useForm, Link } from "@inertiajs/react";
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
    { name: "Criar" },
];

export default function CreateCourt() {
    const { data, setData, post, processing, errors } =
        useForm<CreateEditCourtSchema>({
            name: "",
            sport: "",
            description: "",
            grass_type: "",
            floor_type: "",
            type: "",
            can_play_outside: true,
            installation_year: "",
            manufacturer: "",
            is_covered: false,
            status: true,
            images: [],
            sponsor_image: [],
            pricing: [],
            time_slots: {
                sunday: [],
                monday: [],
                tuesday: [],
                wednesday: [],
                thursday: [],
                friday: [],
                saturday: [],
            },
            promotions_by_weekday: {
                sunday: [],
                monday: [],
                tuesday: [],
                wednesday: [],
                thursday: [],
                friday: [],
                saturday: [],
            },
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
