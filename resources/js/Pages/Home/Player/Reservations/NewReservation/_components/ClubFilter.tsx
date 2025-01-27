import * as React from "react";
import { router, usePage } from "@inertiajs/react";

import { timeList } from "@/utils/data/timeList";

import { Input } from "@/components/ui/input";
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

export interface QueryParams {
    search: string;
    searchBy: string;
    date: string;
    time: string;
    sport: string;
    min_price: string;
    max_price: string;
}

export const defaultParams: QueryParams = {
    search: "",
    searchBy: "",
    date: new Date().toISOString().split("T")[0],
    time: "all",
    sport: "all",
    min_price: "0",
    max_price: "100",
};

export function ClubFilter(props: {
    localization?: { lat: number; lng: number };
}) {
    const { queryParams = null } = usePage().props;
    const parameters: QueryParams = { ...defaultParams, ...queryParams };

    const [filter, setFilter] = React.useState<QueryParams>(parameters);
    const [openMap, setOpenMap] = React.useState<boolean>(false);

    function fetchData() {
        router.get(
            route("player.new-reservation.index"),
            { ...filter },
            {
                preserveState: true,
            }
        );
    }

    return (
        <div className="w-full rounded-t-lg mb-4">
            <div className="relative">
                <div className="flex flex-col items-center justify-between py-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
                    <div className="flex w-full max-w-xl items-center space-x-2">
                        <Input
                            type="email"
                            className="min-w-96"
                            placeholder="Pesquisar por nome"
                            onChange={(e) =>
                                setFilter({ ...filter, search: e.target.value })
                            }
                        />
                        <Select
                            value={filter.sport}
                            onValueChange={(v) =>
                                setFilter({ ...filter, sport: v })
                            }
                        >
                            <SelectTrigger className="min-w-44">
                                <SelectValue placeholder="Esporte" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="all">
                                        Todos os Esportes
                                    </SelectItem>
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
                        <Select
                            value={filter.time}
                            onValueChange={(v) =>
                                setFilter({ ...filter, time: v })
                            }
                        >
                            <SelectTrigger className="min-w-44">
                                <SelectValue placeholder="Horário" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="all">
                                        Qualquer Horário
                                    </SelectItem>
                                    {timeList.map((time: string) => (
                                        <SelectItem value={time}>
                                            {time}
                                        </SelectItem>
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
                            <PopoverContent className="md:w-[400px] lg:w-[500px]">
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
                                        <div className="grid grid-cols-2 items-center py-2 gap-2">
                                            <Label htmlFor="status">
                                                Distância
                                            </Label>
                                            <Input type="text" />
                                        </div>
                                        <div className="grid grid-cols-2 items-center gap-2">
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
                            </PopoverContent>
                        </Popover>
                        <Button onClick={fetchData}>
                            Pesquisar
                            <Search />
                        </Button>
                    </div>
                    <div className="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="airplane-mode"
                                checked={openMap}
                                onCheckedChange={(v) => setOpenMap(v)}
                            />
                            <Label htmlFor="airplane-mode">Mapa</Label>
                        </div>
                    </div>
                </div>
                {openMap && (
                    <div className="my-4 sticky">
                        <iframe
                            src={
                                props.localization
                                    ? `https://www.google.com/maps/embed/v1/place?key=AIzaSyBGkVceXOyvDwgH5mYQRyXYD7bzi6W7ygg&q=${props.localization}`
                                    : `https://www.google.com/maps/embed/v1/place?key=AIzaSyBGkVceXOyvDwgH5mYQRyXYD7bzi6W7ygg&q=São+Paulo`
                            }
                            className="w-full h-[250px]"
                            frameBorder="0"
                            allowFullScreen
                        ></iframe>
                    </div>
                )}
            </div>
        </div>
    );
}
