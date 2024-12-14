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
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="ml-auto">
                                    Selecionar Esporte <ChevronDown />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuCheckboxItem
                                    className="capitalize"
                                    onCheckedChange={(value) =>
                                        console.log(value)
                                    }
                                >
                                    OK
                                </DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[240px] justify-start text-left font-normal",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon />
                                    {date ? (
                                        format(date, "PPP")
                                    ) : (
                                        <span>Selecionar Data</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent
                                className="w-auto p-0"
                                align="start"
                            >
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                    locale={ptBR}
                                />
                            </PopoverContent>
                        </Popover>
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Selecionar Horário" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Manhã</SelectLabel>
                                    {/* Manhã: 06:30 até 11:30 */}
                                    {[
                                        "06:00",
                                        "06:30",
                                        "07:00",
                                        "07:30",
                                        "08:00",
                                        "08:30",
                                        "09:00",
                                        "09:30",
                                        "10:00",
                                        "10:30",
                                        "11:00",
                                        "11:30",
                                    ].map((time, index) => (
                                        <SelectItem
                                            key={`morning-${index}`}
                                            value={`morning-${index}`}
                                        >
                                            {time}
                                        </SelectItem>
                                    ))}

                                    <SelectLabel>Tarde</SelectLabel>
                                    {/* Tarde: 12:00 até 17:30 */}
                                    {[
                                        "12:00",
                                        "12:30",
                                        "13:00",
                                        "13:30",
                                        "14:00",
                                        "14:30",
                                        "15:00",
                                        "15:30",
                                        "16:00",
                                        "16:30",
                                        "17:00",
                                        "17:30",
                                    ].map((time, index) => (
                                        <SelectItem
                                            key={`afternoon-${index}`}
                                            value={`afternoon-${index}`}
                                        >
                                            {time}
                                        </SelectItem>
                                    ))}

                                    <SelectLabel>Noite</SelectLabel>
                                    {/* Noite: 18:00 até 00:00 */}
                                    {[
                                        "18:00",
                                        "18:30",
                                        "19:00",
                                        "19:30",
                                        "20:00",
                                        "20:30",
                                        "21:00",
                                        "21:30",
                                        "22:00",
                                        "22:30",
                                        "23:00",
                                        "23:30",
                                    ].map((time, index) => (
                                        <SelectItem
                                            key={`night-${index}`}
                                            value={`night-${index}`}
                                        >
                                            {time}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Estrutura, Área, ...." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Estrutura</SelectLabel>
                                    <SelectItem value="padel">
                                        Alverania
                                    </SelectItem>
                                    <SelectItem value="tenis">
                                        Panorâmica
                                    </SelectItem>
                                    <SelectItem value="tenis">Mista</SelectItem>
                                    <SelectLabel>Área</SelectLabel>
                                    <SelectItem value="tenis">
                                        Fechado
                                    </SelectItem>
                                    <SelectItem value="tenis">
                                        Aberto
                                    </SelectItem>
                                    <SelectItem value="tenis">
                                        Cobertura
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
