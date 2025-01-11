import * as React from "react";

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
import { Input } from "@/components/ui/input";

export function SearchCourts() {
    const [search, setSearch] = React.useState<string>("");
    const [sport, setSport] = React.useState<string>("padel");
    const [isCovered, setIsCovered] = React.useState<boolean>(false);
    const [floorType, setFloorType] = React.useState<boolean>(false);
    const [canPlayOutside, setCanPlayOutside] = React.useState<boolean>(false);

    return (
        <div className="flex gap-x-1">
            <Input placeholder="Procurar" className="w-72" />
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
                            <div className="grid gap-4">
                                <div className="grid gap-2">
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
                                    <div className="grid grid-cols-2 items-center gap-4">
                                        <Label htmlFor="type">Tipo</Label>
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
                                        <Label htmlFor="width">Cobertura</Label>
                                        <div className="flex items-center space-x-2">
                                            <Switch id="is_covered" />
                                            <Label htmlFor="is_covered">
                                                {isCovered
                                                    ? "With cover"
                                                    : "Without cover"}
                                            </Label>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 items-center gap-4">
                                        <Label htmlFor="surface_type">
                                            Tipo de Superfície
                                        </Label>
                                        <Input id="surface_type" />
                                    </div>
                                    <div className="grid grid-cols-2 items-center gap-4">
                                        <Label htmlFor="can_play_outside">
                                            Jogar fora da quadra
                                        </Label>
                                        <Input
                                            id="can_play_outside"
                                            defaultValue="25px"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
            <Button>Procurar</Button>
        </div>
    );
}
