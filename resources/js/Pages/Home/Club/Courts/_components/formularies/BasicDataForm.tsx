import * as React from "react";
// Components
import InputError from "@/components/InputError";
// Shadcn
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
import { Input } from "@/components/ui/input";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export function BasicDataForm(props: {
    data: any;
    errors: any;
    setData: Function;
}) {
    return (
        <div className="grid gap-4 py-8">
            <div className="space-y-2">
                <h1 className="text-xl font-semibold">Básico</h1>
                <p className="text-gray-600">
                    Preencha as informações essenciais da quadra no formulário
                    abaixo. 
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
                        value={props.data.name}
                        onChange={(e) => props.setData("name", e.target.value)}
                    />
                    <InputError message={props.errors.name} className="mt-2" />
                </div>
            </div>
            {/* Linha com selects */}
            <div className="flex gap-x-4">
                <div className="w-full">
                    <Label htmlFor="sport">Esporte</Label>
                    <Select
                        value={props.data.sport}
                        onValueChange={(value) => props.setData("sport", value)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione uma opção" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="padel">Padel</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <InputError message={props.errors.sport} className="mt-2" />
                </div>
                <div className="w-full">
                    <Label htmlFor="type">Tipo de Quadra</Label>
                    <Select
                        value={props.data.type}
                        onValueChange={(value) => props.setData("type", value)}
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
                                <SelectItem value="mixed">Mista</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <InputError message={props.errors.type} className="mt-2" />
                </div>
            </div>
            <div className="flex flex-col space-y-4">
                <div>
                    <Label htmlFor="is_covered">Cobertura</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Switch
                        id="is_covered"
                        checked={props.data.is_covered}
                        onCheckedChange={(v) => props.setData("is_covered", v)}
                    />
                    <Label htmlFor="is_covered">
                        {props.data.is_covered
                            ? "Com Cobertura"
                            : "Sem Cobertura"}
                    </Label>
                </div>
            </div>
            <div className="flex flex-col space-y-4">
                <div>
                    <Label htmlFor="description">Jogos Fora da Quadra</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Switch
                        id="can_play_outside"
                        checked={props.data.can_play_outside}
                        onCheckedChange={(v) =>
                            props.setData("can_play_outside", v)
                        }
                    />
                    <Label htmlFor="can_play_outside">
                        {props.data.can_play_outside
                            ? "Permitido"
                            : "Não Permitido"}
                    </Label>
                </div>
            </div>
            <div className="flex flex-col space-y-4">
                <div>
                    <Label htmlFor="description">Disponibilidade</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Switch
                        id="status"
                        checked={props.data.status}
                        onCheckedChange={(v) => props.setData("status", v)}
                    />
                    <Label htmlFor="status">
                        {props.data.status ? "Disponível" : "Indisponível"}
                    </Label>
                </div>
            </div>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>Informações Opcionais</AccordionTrigger>
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
                                value={props.data.floor_type}
                                onChange={(e) =>
                                    props.setData("floor_type", e.target.value)
                                }
                            />
                            <InputError
                                message={props.errors.floor_type}
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
                                value={props.data.grass_type}
                                onChange={(e) =>
                                    props.setData("grass_type", e.target.value)
                                }
                            />
                            <InputError
                                message={props.errors.grass_type}
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
                                value={props.data.name}
                                onChange={(e) =>
                                    props.setData(
                                        "manufacturer",
                                        e.target.value
                                    )
                                }
                            />
                            <InputError
                                message={props.errors.manufacturer}
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
                                value={props.data.installation_year}
                                onChange={(e) =>
                                    props.setData(
                                        "installation_year",
                                        e.target.value
                                    )
                                }
                            />
                            <InputError
                                message={props.errors.installation_year}
                                className="mt-2"
                            />
                        </div>
                        <div className="flex gap-4">
                            <div className="grid w-full items-center gap-2">
                                <Label htmlFor="description">
                                    Descrição (opcional)
                                </Label>
                                <Textarea
                                    value={props.data.description}
                                    placeholder="Description"
                                    onChange={(e) =>
                                        props.setData(
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
    );
}
