import * as React from "react";
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

export function SearchClubCourts(props: { club?: { zip_code: string; address: string } }) {
    const [search, setSearch] = React.useState<string>("");
    const [sport, setSport] = React.useState<string>("padel");
    const [date, setDate] = React.useState<string>(format(new Date(), "yyyy-MM-dd"));
    const [time, setTime] = React.useState<string>(format(new Date(), "HH:mm"));
    const [isCovered, setIsCovered] = React.useState<boolean>(false);
    const [canPlayOutside, setCanPlayOutside] = React.useState<boolean>(false);
    const [floorType, setFloorType] = React.useState<string>("");
    const [price, setPrice] = React.useState<{ min: number; max: number }>({
        min: 10,
        max: 100,
    });
    const [openMap, setOpenMap] = React.useState<boolean>(false);

    return (
        <div className="w-full mb-4">
            <div className="relative">
                <div className="flex flex-col items-center justify-between py-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
                    <div className="flex w-full max-w-xl items-center space-x-2">
                        <Input
                            type="text"
                            className="min-w-96"
                            placeholder="Procurar quadra por nome"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
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
                                            <Label htmlFor="sport">Esporte</Label>
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
                                                        <SelectItem value="tennis">
                                                            Tênis
                                                        </SelectItem>
                                                        <SelectItem value="beach tennis">
                                                            Tênis de praia
                                                        </SelectItem>
                                                        <SelectItem value="squash">
                                                            Squash
                                                        </SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="grid grid-cols-2 items-center gap-4">
                                            <Label htmlFor="price">Preço Médio</Label>
                                            <div className="grid grid-cols-2 gap-2 w-full">
                                                <Input
                                                    type="number"
                                                    className="w-full"
                                                    placeholder="Mínimo"
                                                    value={price.min}
                                                    onChange={(e) =>
                                                        setPrice((prev) => ({
                                                            ...prev,
                                                            min: Number(e.target.value),
                                                        }))
                                                    }
                                                />
                                                <Input
                                                    type="number"
                                                    className="w-full"
                                                    placeholder="Máximo"
                                                    value={price.max}
                                                    onChange={(e) =>
                                                        setPrice((prev) => ({
                                                            ...prev,
                                                            max: Number(e.target.value),
                                                        }))
                                                    }
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
                    <Badge>Esporte: {sport}</Badge>
                    <Badge>R$: {price.min} - {price.max}</Badge>
                </div>
                {openMap && (
                    <div className="my-4 sticky">
                        <iframe
                            src={
                                props.club
                                    ? `https://www.google.com/maps/embed/v1/place?key=AIzaSyBGkVceXOyvDwgH5mYQRyXYD7bzi6W7ygg&q=${props.club.zip_code}`
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

