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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Filter, Search } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

interface QueryParams {
    search: string;
    status: number;
    weekday: string;
    from: string;
    to: string;
    type: string;
    sport: string;
    cover: string;
    manufacturer: string;
    installation_year: string;
    orderBy: string;
    order: "asc" | "desc";
    limit: number;
    page: number;
}

const defaultParams: QueryParams = {
    search: "",
    status: 1,
    weekday: "all",
    from: "",
    to: "",
    type: "all",
    sport: "all",
    cover: "all",
    manufacturer: "",
    installation_year: "",
    orderBy: "id",
    order: "asc",
    limit: 10,
    page: 1,
};

export function CourtsFilter() {
    const { queryParams = null }: any = usePage().props;
    const parameters: QueryParams = { ...defaultParams, ...queryParams };

    const [filter, setFilter] = React.useState<QueryParams>(parameters);
    const [error, setError] = React.useState<string | null>(null);

    function fetchData() {
        setError(null);

        router.get(
            route("club.courts.index"),
            { ...filter },
            {
                preserveState: true,
                onError: () =>
                    setError("Failed to fetch data. Please try again."),
            }
        );
    }

    return (
        <div>
            <div className="flex items-center gap-x-1">
                <Input
                    placeholder="Pesquisar"
                    className="w-72"
                    value={filter.search}
                    onChange={(e) =>
                        setFilter({ ...filter, search: e.target.value })
                    }
                />
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" aria-label="Open filters">
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
                                        <div className="grid grid-cols-2 items-center py-2 gap-4">
                                            <Label htmlFor="status">
                                                Situação
                                            </Label>
                                            <div className="flex items-center space-x-2">
                                                <Switch
                                                    id="status"
                                                    checked={Boolean(
                                                        filter.status
                                                    )}
                                                    onCheckedChange={(v) =>
                                                        setFilter({
                                                            ...filter,
                                                            status: v ? 1 : 0,
                                                        })
                                                    }
                                                />
                                                <Label htmlFor="status">
                                                    {filter.status
                                                        ? "Ativo"
                                                        : "Inativo"}
                                                </Label>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 items-center gap-4">
                                            <Label htmlFor="sport">
                                                Esporte
                                            </Label>
                                            <Select
                                                value={filter.sport}
                                                onValueChange={(v) =>
                                                    setFilter({
                                                        ...filter,
                                                        sport: v,
                                                    })
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Esporte" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem value="all">
                                                            Todos
                                                        </SelectItem>
                                                        <SelectItem value="padel">
                                                            Padel
                                                        </SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="grid grid-cols-2 items-center gap-4">
                                            <Label htmlFor="weekday">
                                                Dia da Semana
                                            </Label>
                                            <Select
                                                value={filter.weekday}
                                                onValueChange={(v) =>
                                                    setFilter({
                                                        ...filter,
                                                        weekday: v,
                                                    })
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Dia da Semana" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem value="all">
                                                            Todos
                                                        </SelectItem>
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
                                        </div>
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
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Tipo" />
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
                                        <div className="grid grid-cols-2 items-center gap-4">
                                            <Label htmlFor="cover">
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
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Cobertura" />
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
                                            <Label htmlFor="installation_year">
                                                Ano de Instalação
                                            </Label>
                                            <Input
                                                type="number"
                                                min="1900"
                                                max={new Date().getFullYear()}
                                                step="1"
                                                value={filter.installation_year}
                                                id="installation_year"
                                                placeholder="Ano de instalação"
                                                onChange={(e) =>
                                                    setFilter({
                                                        ...filter,
                                                        installation_year:
                                                            e.target.value,
                                                    })
                                                }
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
                                                value={filter.manufacturer}
                                                onChange={(e) =>
                                                    setFilter({
                                                        ...filter,
                                                        manufacturer:
                                                            e.target.value,
                                                    })
                                                }
                                            />
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
            {error && <div className="text-red-500 mt-2">{error}</div>}
        </div>
    );
}
