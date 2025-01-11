import { Head, usePage, Link } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";

const breadCrumb = [{ name: "Quadras", href: "/club/courts" }, { name: "Ver" }];

export default function ShowCourt() {
    const { court }: any = usePage().props;
    return (
        <AuthenticatedLayout breadCrumb={breadCrumb}>
            <Head title="Reserva" />
            <Tabs defaultValue="basic" className="mx-auto w-full max-w-7xl">
                <div className="flex justify-between items-end py-4">
                    <h2 className="font-medium text-xl">
                        Visualização da Quadra
                    </h2>
                    <div className="py-2 flex justify-end">
                        <Button>
                            <Link href={route("club.courts.index")}>
                                Voltar
                            </Link>
                        </Button>
                    </div>
                </div>
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="basic">Básico</TabsTrigger>
                    <TabsTrigger value="hours">
                        Horário de Funcionamento
                    </TabsTrigger>
                    <TabsTrigger value="pricing">Precificação</TabsTrigger>
                    <TabsTrigger value="images">Imagens</TabsTrigger>
                </TabsList>
                <TabsContent value="basic">
                    <div className="grid gap-4 rounded-lg border p-8">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nome</Label>
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={court.data.name}
                                readOnly
                            />
                        </div>
                        <div className="flex gap-x-4">
                            <div className="w-full">
                                <Label htmlFor="sport">Esporte</Label>
                                <Input
                                    id="sport"
                                    type="text"
                                    name="sport"
                                    placeholder="Sport"
                                    value={court.data.sport}
                                    readOnly
                                />
                            </div>
                            <div className="w-full">
                                <Label htmlFor="type">Tipo</Label>
                                <Input
                                    id="type"
                                    type="text"
                                    name="type"
                                    placeholder="Type"
                                    value={court.data.type}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="surface_type">Superfície</Label>
                            <Input
                                id="surface_type"
                                type="text"
                                name="surface_type"
                                placeholder="Surface type"
                                value={court.data.floor_type}
                                readOnly
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="grass_type">Grama</Label>
                            <Input
                                id="grass_type"
                                type="text"
                                name="grass_type"
                                placeholder="Enter the grass type"
                                value={court.data.grass_type}
                                readOnly
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="manufacturer">Fabricante</Label>
                            <Input
                                id="manufacturer"
                                type="text"
                                name="manufacturer"
                                placeholder="Manufacturer"
                                value={court.data.manufacturer}
                                readOnly
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="installation_year">
                                Ano de Instalação
                            </Label>
                            <Input
                                id="installation_year"
                                type="text"
                                name="installation_year"
                                placeholder="Installation year"
                                value={court.data.installation_year}
                                readOnly
                            />
                        </div>
                        <div className="flex gap-4">
                            <div className="grid w-full items-center gap-2">
                                <Label htmlFor="description">Descrição</Label>
                                <Textarea
                                    value={court.data.description}
                                    placeholder="Description"
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="flex flex-col space-y-4">
                            <div>
                                <Label htmlFor="is_covered">Cobertura</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="is_covered"
                                    checked={court.data.is_covered}
                                    disabled
                                />
                                <Label htmlFor="is_covered">
                                    {court.data.is_covered
                                        ? "Com cobertura"
                                        : "Sem cobertura"}
                                </Label>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-4">
                            <div>
                                <Label htmlFor="can_play_outside">
                                    Jogadas fora da quadra
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="can_play_outside"
                                    checked={court.data.can_play_outside}
                                    disabled
                                />
                                <Label htmlFor="can_play_outside">
                                    {court.data.can_play_outside
                                        ? "Permitido"
                                        : "Não Permitido"}
                                </Label>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-4">
                            <div>
                                <Label htmlFor="description">
                                    Disponibilidade
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="status"
                                    checked={court.data.status}
                                    disabled
                                />
                                <Label htmlFor="status">
                                    {court.data.status
                                        ? "Disponível"
                                        : "Indisponível"}
                                </Label>
                            </div>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="hours">
                    <div className="rounded-lg border p-8">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">
                                        Dia
                                    </TableHead>
                                    <TableHead className="text-right">
                                        Horário
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {Object.entries(court.data.time_slots).map(
                                    ([key, time_slot], index) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium">
                                                {key}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {time_slot.start_time}-{" "}
                                                {time_slot.end_time}
                                            </TableCell>
                                        </TableRow>
                                    )
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </TabsContent>
                <TabsContent value="pricing">
                    <div className="rounded-lg border p-8">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[140px]">
                                        Por tempo (hora)
                                    </TableHead>
                                    <TableHead className="text-right">
                                        Preço
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {[].map((item) => (
                                    <TableRow key={item.time}>
                                        <TableCell className="font-medium">
                                            {item.time}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {item.price}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </TabsContent>
                <TabsContent value="images" className="space-y-2">
                    <div className="rounded-lg border p-8">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {court.data.images.map((image_src, index) => (
                                <div>
                                    <img
                                        className="h-36 w-full rounded-lg"
                                        src={image_src}
                                        alt={"img-" + index}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="rounded-lg border p-8">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div>
                                <img
                                    className="h-36 w-full rounded-lg"
                                    src={court.data.sponsor_image}
                                    alt="sponsor-image"
                                />
                            </div>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </AuthenticatedLayout>
    );
}
