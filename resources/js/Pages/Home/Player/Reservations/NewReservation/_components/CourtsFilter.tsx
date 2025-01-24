import * as React from "react";
import { router, usePage } from "@inertiajs/react";

import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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

interface QueryParams {
    courtId: string;
    search: string;
    orderBy: string;
    order: "asc" | "desc";
    limit: number;
    page: number;
    date: string;
    sport: string;
    min_price: number;
    max_price: number;
    type: string;
    cover: string;
}

const defaultParams: QueryParams = {
    courtId: "",
    search: "",
    orderBy: "id",
    order: "asc",
    limit: 10,
    page: 1,
    date: new Date().toISOString().split("T")[0],
    sport: "all",
    min_price: 0,
    max_price: 100,
    type: "all",
    cover: "all",
};

export function CourtsFilter() {
    const { club, queryParams = null }: any = usePage().props;
    const parameters: QueryParams = { ...defaultParams, ...queryParams };

    const [filter, setFilter] = React.useState<QueryParams>(parameters);

    function fetchData() {
        router.get(
            route("player.new-reservation.create", {
                clubId: club.data.id,
            }),
            { ...filter },
            {
                preserveState: true,
            }
        );
    }

    return (
        <div className="w-full mb-4">
            <div className="flex max-w-xl items-center gap-x-1">
                <Input placeholder="Pesquisar por nome" className="min-w-64" />
                <Select
                    value={filter.sport}
                    onValueChange={(v) => setFilter({ ...filter, sport: v })}
                >
                    <SelectTrigger className="min-w-44">
                        <SelectValue placeholder="Esporte" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="all">Todos os Esportes</SelectItem>
                            <SelectItem value="padel">Padel</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Input
                    type="date"
                    value={filter.date}
                    onChange={(e) =>
                        setFilter({ ...filter, date: e.target.value })
                    }
                />
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline">
                            <Filter />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="md:w-[460px] lg:w-[560px]">
                        <div className="grid gap-4">
                            <div className="flex justify-between items-center">
                                <h4 className="font-semibold leading-none">
                                    Filtros
                                </h4>
                                <Button onClick={fetchData}>
                                    Aplicar Filtros
                                </Button>
                            </div>
                            <Separator />
                            <div className="grid gap-2">
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <div className="grid grid-cols-2 items-center gap-4">
                                            <Label htmlFor="type">Tipo</Label>
                                            <Select
                                                value={filter.type}
                                                onValueChange={(v) =>
                                                    setFilter({
                                                        ...filter,
                                                        type: v,
                                                    })
                                                }
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Selecionar" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem value="all">
                                                            Todos
                                                        </SelectItem>
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
                                            <Select
                                                value={filter.cover}
                                                onValueChange={(v) =>
                                                    setFilter({
                                                        ...filter,
                                                        cover: v,
                                                    })
                                                }
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Selecionar" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem value="all">
                                                            Todos
                                                        </SelectItem>
                                                        <SelectItem value="covered">
                                                            Com Cobertura
                                                        </SelectItem>
                                                        <SelectItem value="uncovered">
                                                            Sem Cobertura
                                                        </SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
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
                                                    value={filter.min_price}
                                                />
                                                <Input
                                                    type="number"
                                                    className="w-full"
                                                    placeholder="Máximo"
                                                    min="0"
                                                    value={filter.max_price}
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
        </div>
    );
}
