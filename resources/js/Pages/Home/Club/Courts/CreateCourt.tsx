import * as React from "react";
import { Head, useForm, Link } from "@inertiajs/react";
// Components
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/components/InputError";
import { CourtImages } from "./_components/image-selector/CourtImages";
import { TimeSlotSelector } from "./_components/time-slot-selector/TimeSlotSelector";
import { PricingSelector } from "./_components/pricing-selector/PricingSelector";
import { HelpSidebar } from "@/components/help-sidebar/HelpSidebar";
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
import { Checkbox } from "@/components/ui/checkbox";

const breadCrumb = [
    { name: "Quadras", href: "/club/courts" },
    { name: "Criar" },
];

export default function CreateCourt() {
    const { data, setData, post, processing, errors, reset } =
        useForm<CreateEditCourtSchema>({
            name: "",
            sport: "",
            description: "",
            time_slots: {
                monday: [],
                tuesday: [],
                wednesday: [],
                thursday: [],
                friday: [],
                saturday: [],
                sunday: [],
            },
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
            price: "0",
        });

    const submit: React.FormEventHandler = (e) => {
        e.preventDefault();

        // post
    };

    return (
        <AuthenticatedLayout breadCrumb={breadCrumb}>
            <Head title="Criar Quadra" />
            {/* Container */}
            <div className="flex justify-center items-center">
                {/* Container de Formulários */}
                <form className="space-y-4 w-full max-w-7xl" onSubmit={submit}>
                    {/* Formulário 1 - Básico */}
                    <div className="grid gap-4 rounded-lg border p-8">
                        <div className="space-y-2">
                            <h1 className="text-xl font-semibold">Básico</h1>
                            <p className="text-gray-600">
                                Insira as informações essenciais da quadra no
                                formulário abaixo.
                            </p>
                        </div>
                        <div className="flex gap-x-4">
                            <div className="w-full">
                                <Label htmlFor="name">Nome da Quadra</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    name="name"
                                    placeholder="Nome da Quadra"
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
                                        <SelectValue placeholder="Selecione uma opção" />
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
                                <Label htmlFor="type">Tipo de Quadra</Label>
                                <Select
                                    value={data.type}
                                    onValueChange={(value) =>
                                        setData("type", value)
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Selecione uma opção" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="masonry">
                                                Alvenaria
                                            </SelectItem>
                                            <SelectItem value="panoramic">
                                                Panorâmica
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
                                <Label htmlFor="is_covered">Cobertura</Label>
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
                                        ? "Com Cobertura"
                                        : "Sem Cobertura"}
                                </Label>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-4">
                            <div>
                                <Label htmlFor="description">
                                    Jogos Fora da Quadra
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
                                    Disponibilidade
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
                                            Tipo de Piso (opcional)
                                        </Label>
                                        <Input
                                            id="floor_type"
                                            type="text"
                                            name="floor_type"
                                            placeholder="Tipo de Piso"
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
                                            placeholder="Grass type"
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
                                            placeholder="Manufacturer"
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
                                            placeholder="Installation year"
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
                                                placeholder="Description"
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
                    {/* Form 3 - Pricing */}
                    <div className="rounded-lg space-y-4 border p-8">
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <h1 className="text-xl font-semibold">
                                    Precificação
                                </h1>
                                <HelpSidebar
                                    title="Precificação"
                                    description="Formulário para seleção de preços por intervalos de tempo."
                                    text={[
                                        "O preço de uma quadra é calculado com base no tempo de uso.",
                                        "O tempo mínimo é de 1 hora, com um preço definido, e a partir de 5 horas é caracterizado como confraria.",
                                    ]}
                                />
                            </div>
                            <p className="text-gray-600">
                                Selecione o preço por intervalos de tempo.
                            </p>
                        </div>
                        <PricingSelector />
                    </div>
                    {/* Form 4 - Time Slots */}
                    <div className="rounded-lg space-y-4 border p-8">
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <h1 className="text-xl font-semibold">
                                    Horário de Funcionamento e Promoções
                                </h1>
                                <HelpSidebar
                                    title="Horário de Funcionamento e Promoções"
                                    description="Formulário para configurar os horários disponíveis da quadra e suas promoções."
                                    text={[
                                        "A quadra pode ser reservada em horários definidos por períodos ao longo do dia.",
                                        "Por exemplo, ela pode abrir das 6h30 às 12h, formando um período. Depois, pode reabrir das 14h às 19h, configurando dois períodos distintos: 06:30-12:00 e 14:00-19:00.",
                                        "Para configurar os horários, selecione primeiro o dia em que a quadra estará disponível. Em seguida, defina os períodos específicos para aquele dia. Um único dia pode conter um ou mais períodos.",
                                        "As promoções permitem criar horários promocionais dentro de cada período. Por exemplo, se a quadra funcionar das 6h30 às 11h, você pode oferecer promoções específicas, como das 7h às 8h e das 9h às 10h, com preços diferenciados.",
                                    ]}
                                />
                            </div>
                            <p className="text-gray-600">
                                Selecione os dias da semana e os períodos de
                                tempo disponíveis na quadra.
                            </p>
                        </div>
                        <TimeSlotSelector
                            setData={(time_slots: TimeSlot) =>
                                setData("time_slots", time_slots)
                            }
                        />
                    </div>
                    {/* Form 4 - Image */}
                    <div className="rounded-lg border p-8">
                        <div>
                            <div className="mb-2 space-y-2">
                                <h1 className="text-xl font-semibold">
                                    Fotos da Quadra (opcional)
                                </h1>
                                <p className="text-gray-600">
                                    Clique no botão abaixo para carregar as
                                    fotos da quadra.
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
                                    Fotos do Patrocinador (opcional)
                                </h1>
                                <p className="text-gray-600">
                                    Clique no botão abaixo para carregar as
                                    fotos de patrocinador da quadra.
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
                        <Button disabled={processing}>Confirmar</Button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
