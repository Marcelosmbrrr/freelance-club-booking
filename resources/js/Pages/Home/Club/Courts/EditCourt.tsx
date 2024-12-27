import * as React from "react";
import { Head, usePage, useForm, Link } from "@inertiajs/react";
// Components
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/components/InputError";
import { CourtImages } from "./_components/image-selector/CourtImages";
import { TimeSlotSelector } from "./_components/time-slot-selector/TimeSlotSelector";
// Types
import { TimeSlot } from "./types/types";
import { CreateEditCourtSchema } from "./types/types";
// Shadcn
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const breadCrumb = [
    { name: "Quadras", href: "/club/courts" },
    { name: "Editar" },
];

export default function EditCourt() {
    const { court }: any = usePage().props;

    const { data, setData, post, processing, errors, reset } =
        useForm<CreateEditCourtSchema>({
            name: court.data.name,
            sport: court.data.sport,
            description: court.data.description,
            time_slots: court.data.time_slots,
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
        });

    const submit: React.FormEventHandler = (e) => {
        e.preventDefault();

        // post
    };

    return (
        <AuthenticatedLayout breadCrumb={breadCrumb}>
            <Head title="Editar Quadra" />
            {/* Container */}
            <div className="flex justify-center items-center">
                {/* Forms Container */}
                <form className="space-y-4 w-full max-w-4xl" onSubmit={submit}>
                    <div className="flex justify-between items-center rounded-lg border p-4">
                        <h1 className="text-xl font-semibold">Editar Quadra</h1>
                    </div>
                    {/* Form 1 - Basic */}
                    <div className="grid gap-4 rounded-lg border p-8">
                        <div className="space-y-2">
                            <h1 className="text-xl font-semibold">Básico</h1>
                            <p className="text-gray-600">
                                Insira as informações essenciais sobre a quadra
                                no formulário abaixo.
                            </p>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nome da Quadra</Label>
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
                                <Label htmlFor="sport">Esporte</Label>
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
                                            <SelectItem value="padel">
                                                Padel
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
                                    Tipo de Quadra
                                </Label>
                                <Select
                                    value={data.type}
                                    onValueChange={(value) =>
                                        setData("type", value)
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
                                    message={errors.type}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col space-y-4">
                            <div>
                                <Label htmlFor="is_covered">
                                    Cobertura da quadra
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="is_covered"
                                    checked={data.is_covered}
                                    onCheckedChange={(v) =>
                                        setData("is_covered", v)
                                    }
                                />
                                <Label htmlFor="is_covered">
                                    {data.is_covered
                                        ? "Com cobertura"
                                        : "Sem cobertura"}
                                </Label>
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
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>
                                    Informações Opcionais
                                </AccordionTrigger>
                                <AccordionContent className="grid gap-4 rounded-lg py-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="floor_type">
                                            Tipo de Superfície (opcional)
                                        </Label>
                                        <Input
                                            id="floor_type"
                                            type="text"
                                            name="floor_type"
                                            placeholder="Informe o tipo de superfície"
                                            value={data.floor_type}
                                            onChange={(e) =>
                                                setData(
                                                    "floor_type",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.floor_type}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="grass_type">
                                            Tipo de Grama (opcional)
                                        </Label>
                                        <Input
                                            id="grass_type"
                                            type="text"
                                            name="grass_type"
                                            placeholder="Informe o tipo de grama"
                                            value={data.grass_type}
                                            onChange={(e) =>
                                                setData(
                                                    "grass_type",
                                                    e.target.value
                                                )
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
                                                setData(
                                                    "manufacturer",
                                                    e.target.value
                                                )
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
                                                setData(
                                                    "installation_year",
                                                    e.target.value
                                                )
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
                                                    setData(
                                                        "description",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                    {/* Form 2 - Time Slots */}
                    <div className="rounded-lg space-y-4 border p-8">
                        <div className="space-y-2">
                            <h1 className="text-xl font-semibold">
                                Horário de Funcionamento
                            </h1>
                            <p className="text-gray-600">
                                Selecione os dias da semana e blocos de horário
                                disponíveis da quadra.
                            </p>
                        </div>
                        <TimeSlotSelector
                            data={data.time_slots}
                            setData={(time_slots: TimeSlot) =>
                                setData("time_slots", time_slots)
                            }
                        />
                    </div>
                    {/* Form 3 - Image */}
                    <div className="rounded-lg border p-8">
                        <div>
                            <div className="mb-2 space-y-2">
                                <h1 className="text-xl font-semibold">
                                    Fotos da Quadra (opcional)
                                </h1>
                                <p className="text-gray-600">
                                    Clique no botão abaixo para carregar e
                                    organizar as fotos da quadra.
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
                                    multiple
                                />
                            </div>
                        </div>
                        <div className="py-6">
                            <Separator />
                        </div>
                        <div>
                            <div className="mb-2 space-y-2">
                                <h1 className="text-xl font-semibold">
                                    Patrocinador da Quadra (opcional)
                                </h1>
                                <p className="text-gray-600">
                                    Clique no botão abaixo para carregar a foto
                                    do patrocinador da quadra.
                                </p>
                            </div>
                            <div>
                                <InputError message={errors.images} />
                            </div>
                            <div>
                                <CourtImages
                                    setImages={(url: string[]) =>
                                        setData("images", url)
                                    }
                                    images={data.sponsor_image}
                                    saveAs="sponsor"
                                />
                            </div>
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
