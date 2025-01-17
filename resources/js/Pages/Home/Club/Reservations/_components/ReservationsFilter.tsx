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
    status: string;
    date: string;
    min_price: number;
    max_price: number;
}

export function ReservationsFilter() {
    const [search, setSearch] = React.useState<string>("");
    const [status, setStatus] = React.useState<string>(""); // Status agora é utilizado como filtro
    const [date, setDate] = React.useState<string>("");
    const [time, setTime] = React.useState<{
        start_time: string;
        end_time: string;
    }>({ start_time: "06:00", end_time: "00:00" });
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
        [search, status, date, price]
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
                                        <Label htmlFor="status">Status</Label>
                                        <Select
                                            value={status}
                                            onValueChange={(value) =>
                                                setStatus(value)
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
                                        <Label htmlFor="date">Data</Label>
                                        <Input
                                            type="date"
                                            id="date"
                                            value={date}
                                            onChange={(e) =>
                                                setDate(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 items-center gap-4">
                                        <Label htmlFor="price">Horário</Label>
                                        <div className="grid grid-cols-2 gap-2 w-full">
                                            <Select
                                                value={status}
                                                onValueChange={(value) =>
                                                    setTime({
                                                        ...time,
                                                        start_time: value,
                                                    })
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="De" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {timeList.map(
                                                            (time) => (
                                                                <SelectItem
                                                                    value={time}
                                                                >
                                                                    {time}
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            <Select
                                                value={status}
                                                onValueChange={(value) =>
                                                    setTime({
                                                        ...time,
                                                        end_time: value,
                                                    })
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Até" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {timeList.map(
                                                            (time) => (
                                                                <SelectItem
                                                                    value={time}
                                                                >
                                                                    {time}
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>
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
                                                value={price.min}
                                                onChange={(e) =>
                                                    setPrice({
                                                        ...price,
                                                        min: Number(
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
                                                value={price.max}
                                                onChange={(e) =>
                                                    setPrice({
                                                        ...price,
                                                        max: Number(
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
            <Button
                type="button"
                onClick={() =>
                    fetchData({
                        search,
                        status,
                        date,
                        min_price: price.min,
                        max_price: price.max,
                    })
                }
            >
                Procurar
                <Search />
            </Button>
        </div>
    );
}
