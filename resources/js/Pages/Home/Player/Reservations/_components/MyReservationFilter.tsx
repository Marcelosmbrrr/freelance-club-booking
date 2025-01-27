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
    search: string;
    club: string;
    public: string;
    status: string;
    date: string;
    min_price: number;
    max_price: number;
}

const defaultParams: QueryParams = {
    search: "",
    club: "all",
    public: "all",
    status: "all",
    date: new Date().toISOString(),
    min_price: 0,
    max_price: 100,
};

export function MyReservationFilter() {
    const { clubs, queryParams = null }: any = usePage().props;
    const parameters: QueryParams = { ...defaultParams, ...queryParams };

    const [filter, setFilter] = React.useState<QueryParams>(parameters);

    function fetchData() {
        router.get(
            route("player.reservations.index"),
            { ...filter },
            {
                preserveState: true,
            }
        );
    }

    return (
        <div className="flex gap-x-2">
            <Input
                placeholder="Pesquisar"
                className="min-w-96"
                value={filter.search}
                onChange={(e) =>
                    setFilter({ ...filter, search: e.target.value })
                }
            />
            <Select>
                <SelectTrigger className="min-w-40">
                    <SelectValue placeholder="Procurar por Clube" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="all">Todos os Clubes</SelectItem>
                        {clubs.map((club: { id: string; name: string }) => (
                            <SelectItem value={club.id}>{club.name}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
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
                            <Button onClick={fetchData}>Aplicar Filtros</Button>
                        </div>
                        <Separator />
                        <div className="grid gap-2">
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <div className="grid grid-cols-2 items-center py-2 gap-4">
                                        <Label htmlFor="status">Status</Label>
                                        <Select
                                            value={filter.status}
                                            onValueChange={(v) =>
                                                setFilter({
                                                    ...filter,
                                                    status: v,
                                                })
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecionar Status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="all">
                                                        Todos
                                                    </SelectItem>
                                                    <SelectItem value="pending">
                                                        Pendente
                                                    </SelectItem>
                                                    <SelectItem value="confirmed">
                                                        Confirmado
                                                    </SelectItem>
                                                    <SelectItem value="completed">
                                                        Completado
                                                    </SelectItem>
                                                    <SelectItem value="cancelled">
                                                        Cancelado
                                                    </SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid grid-cols-2 items-center gap-4">
                                        <Label htmlFor="maxWidth">Data</Label>
                                        <Input
                                            type="date"
                                            value={filter.date}
                                            onChange={(e) =>
                                                setFilter({
                                                    ...filter,
                                                    date: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 items-center gap-4">
                                        <Label htmlFor="price">
                                            Preço Médio
                                        </Label>
                                        <div className="grid grid-cols-2 gap-2 w-full">
                                            <Input
                                                type="number"
                                                className="w-full"
                                                placeholder="Mínimo"
                                                min="0"
                                                value={filter.min_price}
                                                onChange={(e) =>
                                                    setFilter({
                                                        ...filter,
                                                        min_price: Number(
                                                            e.target.value
                                                        ),
                                                    })
                                                }
                                            />
                                            <Input
                                                type="number"
                                                className="w-full"
                                                placeholder="Máximo"
                                                min="0"
                                                value={filter.max_price}
                                                onChange={(e) =>
                                                    setFilter({
                                                        ...filter,
                                                        max_price: Number(
                                                            e.target.value
                                                        ),
                                                    })
                                                }
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
    );
}
