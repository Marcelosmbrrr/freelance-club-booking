import { Head, usePage, useForm, Link } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Carousel1 } from "@/components/carousel/Carousel1";

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

export default function ShowCourt() {
    const { court }: any = usePage().props;
    const { data } = court;

    return (
        <AuthenticatedLayout pageName="Ver Quadra">
            <Head title="Requisição" />
            {/* Container */}
            <div className="flex justify-center items-center">
                {/* Forms Container */}
                <form className="space-y-4 w-full max-w-4xl">
                    {/* Form 1 - Basic */}
                    <div className="grid gap-4 rounded-lg border p-8">
                        <h1 className="text-xl font-semibold">Básico</h1>
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nome da quadra</Label>
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Informe o nome da quadra"
                                value={data.name}
                                readOnly
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="sport">Esporte</Label>
                            <Select value={data.sport} disabled>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Selecione o tipo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="tennis">
                                            Tênis
                                        </SelectItem>
                                        <SelectItem value="beach_tennis">
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
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="type">Tipo de área</Label>
                            <Select value={data.type} disabled>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Selecione o tipo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="indoor">
                                            Área coberta
                                        </SelectItem>
                                        <SelectItem value="outdoor">
                                            Área aberta
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex gap-4">
                            <div className="grid w-full items-center gap-2">
                                <Label htmlFor="description">Descrição</Label>
                                <Textarea
                                    value={data.description ?? "Nenhuma descrição."}
                                    placeholder="Descrição da quadra"
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
                    {/* Form 2 - Time Slots */}
                    <div className="rounded-lg space-y-4 border p-8">
                        <h1 className="text-xl font-semibold">
                            Horários Disponíveis
                        </h1>
                        <ToggleGroup
                            type="multiple"
                            variant="outline"
                            className="w-full flex flex-wrap gap-4"
                            value={data.time_slots}
                            disabled
                        >
                            {data.time_slots.map(
                                (time_slot: { id: string; time: string }) => (
                                    <ToggleGroupItem
                                        key={time_slot.id}
                                        value={time_slot.id}
                                        aria-label="Toggle bold"
                                        className="flex-grow md:flex-none md:w-1/4 p-2 text-center border rounded"
                                    >
                                        {time_slot.time}
                                    </ToggleGroupItem>
                                )
                            )}
                        </ToggleGroup>
                    </div>

                    {/* Form 3 - Image */}
                    <div className="flex flex-col space-y-4 rounded-lg border p-8">
                        <h1 className="text-xl font-semibold">Imagens</h1>
                        <div className="space-y-4">
                            {data.images.length === 0 && "Nenhuma imagem."}
                            {data.images.length > 0 && (
                                <div className="px-8">
                                    <Carousel1 items={data.images} />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-end gap-x-2">
                        <Button>
                            <Link href={route("club.courts.index")}>
                                Voltar
                            </Link>
                        </Button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
