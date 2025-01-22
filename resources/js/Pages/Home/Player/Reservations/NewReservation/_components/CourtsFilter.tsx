import * as React from "react";
import { router, usePage } from "@inertiajs/react";

import { QueryParams } from "../CreateReservation";
import { defaultParams } from "../CreateReservation";
import { timeList } from "@/utils/data/timeList";

import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Filter } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function CourtsFilter() {
    const { club, queryParams = null }: any = usePage().props;

    const parameters: QueryParams = { ...defaultParams, ...queryParams };

    const fetchData = React.useCallback(
        (param: Partial<QueryParams>) => {
            router.get(
                route("player.new-reservation.create", {
                    clubId: club.data.id,
                }),
                { ...param },
                {
                    preserveState: true,
                }
            );
        },
        [parameters]
    );

    return (
        <div className="w-full mb-4">
            <div className="flex max-w-xl items-center gap-x-1">
                <Input placeholder="Pesquisar por nome" className="w-72" />
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline">
                            <Filter />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="md:w-[460px] lg:w-[560px]">
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <h4 className="font-semibold leading-none">
                                    Filtros
                                </h4>
                            </div>
                            <Separator />
                            <div className="grid gap-2">
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <div className="grid grid-cols-2 items-center gap-4">
                                            <Label htmlFor="maxWidth">
                                                Esporte
                                            </Label>
                                            <Select
                                                value={parameters.sport}
                                                onValueChange={(v) =>
                                                    fetchData({ sport: v })
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Esporte" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem value="padel">
                                                            Padel
                                                        </SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="grid grid-cols-2 items-center gap-4 border p-2 rounded">
                                            <Label htmlFor="time">
                                                Funcionamento
                                            </Label>
                                            <div className="flex flex-col gap-y-2 w-full">
                                                <Select
                                                    value={parameters.weekday}
                                                    onValueChange={(v) =>
                                                        fetchData({
                                                            weekday: v,
                                                        })
                                                    }
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Dia da Semana" />
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
                                                <div className="grid grid-cols-2 gap-2 w-full">
                                                    <Select
                                                        value={
                                                            parameters.time
                                                                .start_time
                                                        }
                                                        onValueChange={(v) =>
                                                            fetchData({
                                                                time: {
                                                                    ...parameters.time,
                                                                    start_time:
                                                                        v,
                                                                },
                                                            })
                                                        }
                                                    >
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="De" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                {timeList.map(
                                                                    (item) => (
                                                                        <SelectItem
                                                                            value={
                                                                                item
                                                                            }
                                                                        >
                                                                            {
                                                                                item
                                                                            }
                                                                        </SelectItem>
                                                                    )
                                                                )}
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                    <Select
                                                        value={
                                                            parameters.time
                                                                .end_time
                                                        }
                                                        onValueChange={(v) =>
                                                            fetchData({
                                                                time: {
                                                                    ...parameters.time,
                                                                    end_time: v,
                                                                },
                                                            })
                                                        }
                                                    >
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Até" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                {timeList.map(
                                                                    (item) => (
                                                                        <SelectItem
                                                                            value={
                                                                                item
                                                                            }
                                                                        >
                                                                            {
                                                                                item
                                                                            }
                                                                        </SelectItem>
                                                                    )
                                                                )}
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 items-center gap-4">
                                            <Label htmlFor="type">Tipo</Label>
                                            <Select
                                                value={parameters.type}
                                                onValueChange={(v) =>
                                                    fetchData({ type: v })
                                                }
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Selecionar" />
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
                                                            Misto
                                                        </SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="grid grid-cols-2 items-center py-2 gap-4">
                                            <Label htmlFor="width">
                                                Cobertura
                                            </Label>
                                            <div className="flex items-center space-x-2">
                                                <Switch
                                                    id="is_covered"
                                                    checked={
                                                        parameters.isCovered
                                                    }
                                                    onCheckedChange={(v) =>
                                                        fetchData({
                                                            isCovered: v,
                                                        })
                                                    }
                                                />
                                                <Label htmlFor="is_covered">
                                                    {parameters.isCovered
                                                        ? "Com Cobertura"
                                                        : "Sem Cobertura"}
                                                </Label>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 items-center gap-4">
                                            <Label htmlFor="surface_type">
                                                Ano de Instalação
                                            </Label>
                                            <Input
                                                type="number"
                                                min="1900"
                                                max={new Date().getFullYear()}
                                                step="1"
                                                value={
                                                    parameters.installationYear
                                                }
                                                id="installation_year"
                                                placeholder="Ano de instalação"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 items-center gap-4">
                                            <Label htmlFor="manufacturer">
                                                Fabricante
                                            </Label>
                                            <Input
                                                type="text"
                                                id="manufacturer"
                                                placeholder="Fabricante"
                                                value={parameters.manufacturer}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 items-center gap-4">
                                            <Label htmlFor="time">
                                                Preço Médio
                                            </Label>
                                            <div className="grid grid-cols-2 gap-2 w-full">
                                                <Input
                                                    type="number"
                                                    className="w-full"
                                                    placeholder="Mínimo"
                                                    min="0"
                                                    value={parameters.price.min}
                                                />
                                                <Input
                                                    type="number"
                                                    className="w-full"
                                                    placeholder="Máximo"
                                                    min="0"
                                                    value={parameters.price.max}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
                <Button type="button" onClick={fetchData}>
                    Pesquisar
                    <Search />
                </Button>
            </div>
            <div className="flex gap-x-2 my-4">
                <Badge variant="secondary">Esporte: {parameters.sport}</Badge>
                <Badge variant="secondary">
                    Dia da Semana: {parameters.weekday}
                </Badge>
                <Badge variant="secondary">
                    Horário: {parameters.time.start_time} -{" "}
                    {parameters.time.end_time}{" "}
                </Badge>
                <Badge variant="secondary">
                    R$: {parameters.price.min} - {parameters.price.max}
                </Badge>
            </div>
        </div>
    );
}
