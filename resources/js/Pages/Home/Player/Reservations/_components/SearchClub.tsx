"use client";

import * as React from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
import { CalendarIcon, ChevronDown, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function SearchClub(props: {
    club?: { zip_code: string; address: string };
}) {
    const [date, setDate] = React.useState<Date>(new Date());
    const [openMap, setOpenMap] = React.useState<boolean>(false);

    return (
        <div className="w-full rounded-t-lg">
            {/* Start coding here */}
            <div className="relative py-4">
                <div className="flex flex-col items-center justify-between py-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
                    <div className="flex w-full max-w-md items-center space-x-2">
                        <Input
                            type="email"
                            className="min-w-28"
                            placeholder="Informe o nome do clube ou da cidade"
                        />
                        <Button type="submit">Procurar Clube</Button>
                    </div>
                    <div className="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Selecionar horário" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="morning">Manhã</SelectItem>
                                    <SelectItem value="afternoon">
                                        Tarde
                                    </SelectItem>
                                    <SelectItem value="night">
                                       Noite
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Selecionar Esporte" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="padel">Padel</SelectItem>
                                    <SelectItem value="tennis">
                                        Tennis
                                    </SelectItem>
                                    <SelectItem value="grapes">
                                        Beach Tennis
                                    </SelectItem>
                                    <SelectItem value="pineapple">
                                        Squash
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
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
                    <div className="mb-4 sticky">
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
