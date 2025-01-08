import { Head, usePage } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const breadCrumb = [
    { name: "Reservas", href: "/club/reservations" },
    { name: "Ver" },
];

export default function ShowReservation() {
    const { reservation }: any = usePage().props;

    return (
        <AuthenticatedLayout breadCrumb={breadCrumb}>
            <Head title="Reserva" />
            <div className="flex justify-center items-center">
                {/* Forms Container */}
                <div className="w-full">
                    <Tabs
                        defaultValue="court"
                        className="mx-auto w-full max-w-5xl shadow-none border-none"
                    >
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="court">Quadra</TabsTrigger>
                            <TabsTrigger value="calendar">
                                Calendário
                            </TabsTrigger>
                            <TabsTrigger value="client">Jogadores</TabsTrigger>
                        </TabsList>
                        <TabsContent value="court">
                            <div className="grid gap-4 rounded-lg border p-8">
                                <div>
                                    <Badge>{reservation.data.status}</Badge>
                                </div>
                                <h1 className="text-xl font-semibold">
                                    Quadra
                                </h1>
                                <div className="max-w-screen-md space-y-6">
                                    <div className="w-40 h-40 overflow-hidden rounded-xl">
                                        <img
                                            src={
                                                reservation.data.court.images[0]
                                            }
                                            alt="user-img"
                                            className="w-full h-full object-cover object-center"
                                        />
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Nome</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        name="name"
                                        placeholder="Nome da quadra"
                                        value={reservation.data.court.name}
                                        readOnly
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Esporte</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        name="name"
                                        placeholder="Esporte da quadra"
                                        value={reservation.data.court.sport}
                                        readOnly
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Tipo</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        name="name"
                                        placeholder="Tipo de área"
                                        value={reservation.data.court.type}
                                        readOnly
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Descrição</Label>
                                    <Textarea
                                        placeholder="Descrição da quadra"
                                        value={
                                            reservation.data.court
                                                .description ??
                                            "Nenhuma descrição."
                                        }
                                        readOnly
                                    />
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="calendar">
                            <div className="rounded-lg space-y-4 border p-8">
                                <h1 className="text-xl font-semibold">
                                    Data e Hora
                                </h1>
                                <div className="grid gap-2">
                                    <Input
                                        id="name"
                                        type="text"
                                        name="name"
                                        placeholder="Tipo de área"
                                        value={reservation.data.date}
                                        readOnly
                                    />
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="client">
                            <div className="grid gap-4 rounded-lg border p-8">
                                <h1 className="text-xl font-semibold">
                                    Reservista
                                </h1>
                                <div className="max-w-screen-md space-y-6">
                                    <div className="w-32 h-32 overflow-hidden rounded-xl">
                                        <img
                                            src={
                                                reservation.data.player
                                                    .avatar_image
                                            }
                                            alt="user-img"
                                            className="w-full h-full object-cover object-center"
                                        />
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Nome</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        name="name"
                                        placeholder="Nome do reservista"
                                        value={
                                            reservation.data.player.user.name
                                        }
                                        readOnly
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="text"
                                        name="email"
                                        placeholder="E-mail do reservista"
                                        value={
                                            reservation.data.player.user.email
                                        }
                                        readOnly
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">CPF</Label>
                                    <Input
                                        id="cpf"
                                        type="text"
                                        name="cpg"
                                        placeholder="CPF do reservista"
                                        value={reservation.data.player.cpf}
                                        readOnly
                                    />
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
