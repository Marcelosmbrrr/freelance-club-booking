import * as React from "react";
import { router, usePage } from "@inertiajs/react";

import { CourtsFilter } from "./CourtsFilter";
import { ClubsFilter } from "./ClubsFilter";

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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface QueryParams {
    entity: "clubs" | "courts";
    sport: string;
    weekday: string;
    time: { start_time: string; end_time: string };
    price: { min: number; max: number };
    type?: string;
    isCovered?: boolean;
    manufacturer?: string;
    installationYear?: string;
    search?: string;
    searchBy: string;
    orderBy: string;
    order: "asc" | "desc";
    limit: number;
    page: number;
}

const defaultParams: QueryParams = {
    entity: "clubs",
    sport: "padel",
    weekday: "monday",
    time: { start_time: "06:00", end_time: "00:00" },
    price: { min: 10, max: 100 },
    searchBy: "name",
    orderBy: "id",
    order: "asc",
    limit: 10,
    page: 1,
    type: undefined,
    isCovered: true,
    manufacturer: undefined,
    installationYear: undefined,
    search: undefined,
};

export function SearchClubOrCourt(props: {
    localization?: { lat: number; lng: number };
}) {
    const { queryParams = null } = usePage().props;

    const parameters: QueryParams = { ...defaultParams, ...queryParams };

    const [openMap, setOpenMap] = React.useState<boolean>(false);

    const fetchData = React.useCallback(
        (param: Partial<QueryParams>) => {
            router.get(
                route("player.new-reservation.index"),
                { ...param },
                {
                    preserveState: true,
                }
            );
        },
        [parameters]
    );

    return (
        <div className="w-full rounded-t-lg mb-4">
            <div className="relative">
                <div className="flex flex-col items-center justify-between py-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
                    <div className="flex w-full max-w-xl items-center space-x-2">
                        <Input
                            type="email"
                            className="min-w-96"
                            placeholder="Procurar por nome, estado ou cidade"
                        />
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline">
                                    <Filter />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="md:w-[400px] lg:w-[500px]">
                                <div className="grid gap-4">
                                    <div className="space-y-2">
                                        <h4 className="font-semibold leading-none">
                                            Filtros
                                        </h4>
                                    </div>
                                    <Separator />
                                    <div className="grid gap-2">
                                        <div className="grid grid-cols-2 items-center gap-4">
                                            <Label htmlFor="width">
                                                Procurar por
                                            </Label>
                                            <Select
                                                value={parameters.entity}
                                                onValueChange={(
                                                    v: "clubs" | "courts"
                                                ) => fetchData({ entity: v })}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Selecionar" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem value="clubs">
                                                            Clubes
                                                        </SelectItem>
                                                        <SelectItem value="courts">
                                                            Quadras
                                                        </SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {parameters.entity === "courts" && (
                                            <div className="grid grid-cols-2 items-center gap-4">
                                                <Label htmlFor="maxWidth">
                                                    Filtrar Quadra
                                                </Label>
                                                <CourtsFilter />
                                            </div>
                                        )}

                                        {parameters.entity === "clubs" && (
                                            <div className="grid grid-cols-2 items-center gap-4">
                                                <Label htmlFor="maxWidth">
                                                    Filtrar Clube
                                                </Label>
                                                <ClubsFilter />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                        <Button>
                            Procurar
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
                <div className="flex gap-x-2">
                    <Badge variant="secondary">
                        Procura: {parameters.entity}
                    </Badge>
                    <Badge variant="secondary">
                        Esporte: {parameters.sport}
                    </Badge>
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
