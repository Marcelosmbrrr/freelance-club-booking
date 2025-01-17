import * as React from "react";
import { router } from "@inertiajs/react";

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

interface QueryParams {
    search: string;
    weekday: string;
    hour: string;
    type: string;
    sport: string;
    isCovered: boolean;
    manufacturer: string;
    installationYear: string;
    min_price: number;
    max_price: number;
    orderBy: string;
    order: "asc" | "desc";
    limit: number;
    page: number;
}

export function CourtsFilter() {
    const [search, setSearch] = React.useState<string>("");
    const [time, setTime] = React.useState<{
        weekday: string;
        hour: string;
    }>({ weekday: "", hour: "" });
    const [type, setType] = React.useState<string>("");
    const [sport, setSport] = React.useState<string>("padel");
    const [isCovered, setIsCovered] = React.useState<boolean>(false);
    const [manufacturer, setManufacturer] = React.useState<string>("");
    const [installationYear, setInstallationYear] = React.useState<string>(
        String(new Date().getFullYear())
    );
    const [price, setPrice] = React.useState({ min: 10, max: 100 });

    const fetchData = React.useCallback(
        (param: Partial<QueryParams>) => {
            router.get(
                route("club.courts.index"),
                { ...param },
                {
                    preserveState: true,
                }
            );
        },
        [
            search,
            time,
            type,
            sport,
            isCovered,
            manufacturer,
            installationYear,
            price,
        ]
    );

    return (
        <div className="flex gap-x-1">
            <Input
                placeholder="Procurar"
                className="w-72"
                onChange={(e) => setSearch(e.target.value)}
            />
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
                                    <div className="grid grid-cols-2 items-center py-2 gap-4">
                                        <Label htmlFor="status">Situação</Label>
                                        <div className="flex items-center space-x-2">
                                            <Switch id="status" />
                                            <Label htmlFor="status">
                                                {isCovered
                                                    ? "Ativo"
                                                    : "Inativo"}
                                            </Label>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 items-center gap-4">
                                        <Label htmlFor="maxWidth">
                                            Esporte
                                        </Label>
                                        <Select
                                            value={sport}
                                            onValueChange={(v) => setSport(v)}
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
                                                value={time.weekday}
                                                onValueChange={(v) =>
                                                    setTime({
                                                        ...time,
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
                                                    value={type}
                                                    onValueChange={(v) =>
                                                        setType(v)
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
                                                                        {item}
                                                                    </SelectItem>
                                                                )
                                                            )}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                                <Select
                                                    value={type}
                                                    onValueChange={(v) =>
                                                        setType(v)
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
                                                                        {item}
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
                                            value={type}
                                            onValueChange={(v) => setType(v)}
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
                                        <Label htmlFor="width">Cobertura</Label>
                                        <div className="flex items-center space-x-2">
                                            <Switch
                                                id="is_covered"
                                                checked={isCovered}
                                                onCheckedChange={setIsCovered}
                                            />
                                            <Label htmlFor="is_covered">
                                                {isCovered
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
                                            value={installationYear}
                                            id="installation_year"
                                            placeholder="Ano de instalação"
                                            onChange={(e) =>
                                                setInstallationYear(
                                                    e.target.value
                                                )
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
                                            value={manufacturer}
                                            onChange={(e) =>
                                                setManufacturer(e.target.value)
                                            }
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
                                                value={price.min}
                                            />
                                            <Input
                                                type="number"
                                                className="w-full"
                                                placeholder="Máximo"
                                                min="0"
                                                value={price.max}
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
                Procurar
                <Search />
            </Button>
        </div>
    );
}
