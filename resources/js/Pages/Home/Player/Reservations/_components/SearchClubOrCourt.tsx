import * as React from "react";
import { router } from "@inertiajs/react";

import { timeSlotsData } from "@/utils/data/timeSlots";

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
import { format } from "date-fns";
import { Filter } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface QueryParams {
    entity: "clubs" | "courts";
    search?: string;
    searchBy: string;
    orderBy: string;
    order: "asc" | "desc";
    limit: number;
    page: number;
}

export function SearchClubOrCourt(props: {
    localization?: { lat: number; lng: number };
}) {
    const [search, setSearch] = React.useState<string>("");
    const [entity, setEntity] = React.useState<string>("clubs");
    const [sport, setSport] = React.useState<string>("padel");
    const [date, setDate] = React.useState<string>(
        format(new Date(), "yyyy-MM-dd")
    );
    const [time, setTime] = React.useState<string>("time");
    const [price, setPrice] = React.useState({ min: 10, max: 100 });
    const [court, setCourt] = React.useState({
        is_covered: false,
        floor_type: "",
        can_play_outside: false,
    });
    const [openMap, setOpenMap] = React.useState<boolean>(false);

    const fetchData = React.useCallback(
        (param: Partial<QueryParams>) => {
            router.get(route("player.new-reservation.index"), { ...param }, {
                preserveState: true
            });
        },
        [search, entity, sport, date, time, price, court]
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
                                                value={entity}
                                                onValueChange={(v) => setEntity(v)}
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

                                        {entity === "courts" && (
                                            <div className="grid grid-cols-2 items-center gap-4">
                                                <Label htmlFor="width">
                                                    Detalhes
                                                </Label>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button variant="outline">
                                                            Filtrar Quadra
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="md:w-[400px] lg:w-[500px]">
                                                        <div className="grid gap-4">
                                                            <div className="grid gap-2">
                                                                <div className="grid grid-cols-2 items-center gap-4">
                                                                    <Label htmlFor="type">
                                                                        Tipo
                                                                    </Label>
                                                                    <Select>
                                                                        <SelectTrigger className="w-full">
                                                                            <SelectValue placeholder="Selecionar" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectGroup>
                                                                                <SelectItem value="masonry">
                                                                                    Masonry
                                                                                </SelectItem>
                                                                                <SelectItem value="panoramic">
                                                                                    Panoramic
                                                                                </SelectItem>
                                                                                <SelectItem value="mixed">
                                                                                    Mixed
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
                                                                        <Switch id="is_covered" />
                                                                        <Label htmlFor="is_covered">
                                                                            {court.is_covered
                                                                                ? "With cover"
                                                                                : "Without cover"}
                                                                        </Label>
                                                                    </div>
                                                                </div>
                                                                <div className="grid grid-cols-2 items-center gap-4">
                                                                    <Label htmlFor="surface_type">
                                                                        Tipo de
                                                                        Superfície
                                                                    </Label>
                                                                    <Input id="surface_type" />
                                                                </div>
                                                                <div className="grid grid-cols-2 items-center gap-4">
                                                                    <Label htmlFor="can_play_outside">
                                                                        Jogar
                                                                        fora da
                                                                        quadra
                                                                    </Label>
                                                                    <Input
                                                                        id="can_play_outside"
                                                                        defaultValue="25px"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </PopoverContent>
                                                </Popover>
                                            </div>
                                        )}
                                        <div className="grid grid-cols-2 items-center gap-4">
                                            <Label htmlFor="maxWidth">
                                                Esporte
                                            </Label>
                                            <Select
                                                value={sport}
                                                onValueChange={(v) =>
                                                    setSport(v)
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
                                        <div className="grid grid-cols-2 items-center gap-4">
                                            <Label htmlFor="time">
                                                Horário
                                            </Label>
                                            <Select>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecionar" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {timeSlotsData.map(
                                                            (time_slot) => (
                                                                <SelectItem
                                                                    value={
                                                                        time_slot.id
                                                                    }
                                                                >
                                                                    {
                                                                        time_slot.time
                                                                    }
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="grid grid-cols-2 items-center gap-4">
                                            <Label htmlFor="date">Data</Label>
                                            <Input type="date" value={date} />
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
                                                />
                                                <Input
                                                    type="number"
                                                    className="w-full"
                                                    placeholder="Máximo"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                        <Button>Procurar</Button>
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
                    <Badge>Procura: {entity}</Badge>
                    <Badge>Esporte: {sport}</Badge>
                    <Badge>Data/Hora: {date} {time}</Badge>
                    <Badge>
                        R$: {price.min} - {price.max}
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
