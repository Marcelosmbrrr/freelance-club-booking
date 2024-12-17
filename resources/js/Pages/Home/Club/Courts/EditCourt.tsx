import * as React from "react";
import { Head, usePage, useForm, Link } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/components/InputError";

import { Weekday } from "./types/types";
import { CreateEditCourtSchema } from "./types/types";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CourtImages } from "./_components/image-selector/CourtImages";

const breadCrumb = [
    { name: "Quadras", href: "/club/courts" },
    { name: "Editar" },
];

export default function EditCourt() {
    const { court, time_slots }: any = usePage().props;
    const [weekday, setWeekDay] = React.useState<Weekday>("monday");

    const { data, setData, post, processing, errors, reset } =
        useForm<CreateEditCourtSchema>({
            name: court.data.name,
            sport: court.data.sport,
            area_type: court.data.area_type,
            description: court.data.description,
            time_slots: court.data.time_slots,
            grass_type: court.data.grass_type,
            structure_type: court.data.structure_type,
            can_play_outside: court.data.can_play_outside,
            installation_year: court.data.installation_year,
            manufacturer: court.data.manufacturer,
            status: court.data.status,
            images: court.data.images,
        });

    return (
        <AuthenticatedLayout breadCrumb={breadCrumb}>
            <Head title="Editar Quadra" />
            {/* Container */}
            <div className="flex justify-center items-center">
                {/* Forms Container */}
                <form className="space-y-4 w-full max-w-4xl">
                    <div className="flex justify-between items-center rounded-lg border p-4">
                        <h1 className="text-xl font-semibold">Editar Quadra</h1>
                    </div>
                    {/* Form 1 - Basic */}
                    <div className="grid gap-4 rounded-lg border p-8">
                        <div className="space-y-2">
                            <h1 className="text-xl font-semibold">Básico</h1>
                            <p className="text-gray-600">
                                Informe os dados básicos da quadra.
                            </p>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nome da quadra *</Label>
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Informe o nome da quadra"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>
                        {/* Linha com selects */}
                        <div className="flex gap-x-4">
                            <div className="w-full">
                                <Label htmlFor="sport">Esporte *</Label>
                                <Select
                                    value={data.sport}
                                    onValueChange={(value) =>
                                        setData("sport", value)
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Selecione o esporte" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="tennis">
                                                Tênis
                                            </SelectItem>
                                            <SelectItem value="beach tennis">
                                                Beach Tênis
                                            </SelectItem>
                                            <SelectItem value="padel">
                                                Padel
                                            </SelectItem>
                                            <SelectItem value="squash">
                                                Squash
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <InputError
                                    message={errors.sport}
                                    className="mt-2"
                                />
                            </div>
                            <div className="w-full">
                                <Label htmlFor="structure_type">
                                    Tipo de Estrutura *
                                </Label>
                                <Select
                                    value={data.structure_type}
                                    onValueChange={(value) =>
                                        setData("structure_type", value)
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Selecione a estrutura" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="masonry">
                                                Alvenaria
                                            </SelectItem>
                                            <SelectItem value="panoramic">
                                                Paranorâmica
                                            </SelectItem>
                                            <SelectItem value="mixed">
                                                Mista
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <InputError
                                    message={errors.structure_type}
                                    className="mt-2"
                                />
                            </div>
                            <div className="w-full">
                                <Label htmlFor="area_type">
                                    Tipo de Área *
                                </Label>
                                <Select
                                    value={data.area_type}
                                    onValueChange={(value) =>
                                        setData("area_type", value)
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Selecione a área" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="indoor">
                                                Aberto
                                            </SelectItem>
                                            <SelectItem value="outdoor">
                                                Fechado
                                            </SelectItem>
                                            <SelectItem value="covered">
                                                Cobertura
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <InputError
                                    message={errors.area_type}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="grass_type">
                                Tipo de grama (opcional)
                            </Label>
                            <Input
                                id="grass_type"
                                type="text"
                                name="grass_type"
                                placeholder="Informe o tipo de grama"
                                value={data.grass_type}
                                onChange={(e) =>
                                    setData("grass_type", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.grass_type}
                                className="mt-2"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="manufacturer">
                                Fabricante (opcional)
                            </Label>
                            <Input
                                id="manufacturer"
                                type="text"
                                name="manufacturer"
                                placeholder="Informe o fabricante"
                                value={data.name}
                                onChange={(e) =>
                                    setData("manufacturer", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.manufacturer}
                                className="mt-2"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="installation_year">
                                Ano de Instalação (opcional)
                            </Label>
                            <Input
                                id="installation_year"
                                type="text"
                                name="installation_year"
                                placeholder="Informe o ano de instalação"
                                value={data.installation_year}
                                onChange={(e) =>
                                    setData("installation_year", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.installation_year}
                                className="mt-2"
                            />
                        </div>
                        <div className="flex gap-4">
                            <div className="grid w-full items-center gap-2">
                                <Label htmlFor="description">
                                    Descrição (opcional)
                                </Label>
                                <Textarea
                                    value={data.description}
                                    placeholder="Informe a descrição da quadra"
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className="flex flex-col space-y-4">
                            <div>
                                <Label htmlFor="description">
                                    Jogadas fora dos limites da quadra
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="can_play_outside"
                                    checked={data.can_play_outside}
                                    onCheckedChange={(v) =>
                                        setData("can_play_outside", v)
                                    }
                                />
                                <Label htmlFor="can_play_outside">
                                    {data.can_play_outside
                                        ? "Permitido"
                                        : "Não Permitido"}
                                </Label>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-4">
                            <div>
                                <Label htmlFor="description">
                                    Disponibilidade para uso
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="status"
                                    checked={data.status}
                                    onCheckedChange={(v) =>
                                        setData("status", v)
                                    }
                                />
                                <Label htmlFor="status">
                                    {data.status
                                        ? "Disponível"
                                        : "Indisponível"}
                                </Label>
                            </div>
                        </div>
                    </div>
                    {/* Form 2 - Time Slots */}
                    <div className="rounded-lg space-y-4 border p-8">
                        <div className="space-y-2">
                            <h1 className="text-xl font-semibold">
                                Disponibilidade
                            </h1>
                            <p className="text-gray-600">
                                Selecione os blocos de horário disponíveis da
                                quadra.
                            </p>
                        </div>
                        <div className="w-1/3">
                            <Label htmlFor="sport">Dia da Semana</Label>
                            <Select
                                value={weekday}
                                onValueChange={(value: Weekday) =>
                                    setWeekDay(value)
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione o esporte" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="monday">
                                            Segunda
                                        </SelectItem>
                                        <SelectItem value="tuesday">
                                            Terça
                                        </SelectItem>
                                        <SelectItem value="wednesday">
                                            Quarta
                                        </SelectItem>
                                        <SelectItem value="thursday">
                                            Quinta
                                        </SelectItem>
                                        <SelectItem value="friday">
                                            Sexta
                                        </SelectItem>
                                        <SelectItem value="saturday">
                                            Sábado
                                        </SelectItem>
                                        <SelectItem value="sunday">
                                            Domingo
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <InputError
                                message={errors.sport}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <ToggleGroup
                                type="multiple"
                                variant="outline"
                                className="w-full flex flex-wrap gap-4"
                                value={data.time_slots[weekday]}
                                onValueChange={(values) =>
                                    setData("time_slots", {
                                        ...data.time_slots,
                                        [weekday]: values,
                                    })
                                }
                            >
                                {time_slots.map(
                                    (time_slot: {
                                        id: string;
                                        start_time: string;
                                        end_time: string;
                                    }) => (
                                        <ToggleGroupItem
                                            key={time_slot.id}
                                            value={time_slot.id}
                                            aria-label="Toggle bold"
                                            className="flex-grow md:flex-none md:w-1/4 p-2 text-center border rounded"
                                        >
                                            {time_slot.start_time} -{" "}
                                            {time_slot.end_time}
                                        </ToggleGroupItem>
                                    )
                                )}
                            </ToggleGroup>
                        </div>
                    </div>
                    {/* Form 3 - Image */}
                    <div className="rounded-lg border p-8">
                        <div className="mb-2 space-y-2">
                            <h1 className="text-xl font-semibold">Imagens</h1>
                            <p className="text-gray-600">
                                Clique no botão abaixo para carregar e organizar
                                as imagens da quadra.
                            </p>
                        </div>
                        <div>
                            <InputError message={errors.images} />
                        </div>
                        <div>
                            <CourtImages
                                setImages={(urls: string[]) =>
                                    setData("images", urls)
                                }
                                images={data.images}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-x-2">
                        <Button>
                            <Link href={route("club.courts.index")}>
                                Cancelar
                            </Link>
                        </Button>
                        <Button disabled={processing}>Criar</Button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
