import * as React from "react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { CalendarClock } from "lucide-react";

export function SelectCourtReservationTimeDialog(props: { time_slots: Object[]}) {
    const [date, setDate] = React.useState<Date>(new Date());
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <CalendarClock />
                    Selecionar
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-7xl">
                <DialogHeader>
                    <DialogTitle>Selecionar Horário</DialogTitle>
                    <DialogDescription>
                        Selecione os horários disponíveis na quadra.
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <div>
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
                    </div>
                    <ToggleGroup
                        type="multiple"
                        variant="outline"
                        className="w-full flex flex-wrap gap-4"
                    >
                        {[].map(
                            (time_slot: {
                                id: string;
                                start_time: string;
                                end_time: string;
                            }) => (
                                <ToggleGroupItem
                                    key={time_slot.id}
                                    value={time_slot.id}
                                    aria-label="Toggle bold"
                                    className="flex-grow md:flex-none md:w-1/4 p-2 text-center border rounded"
                                >
                                    {time_slot.start_time} -{" "}
                                    {time_slot.end_time}
                                </ToggleGroupItem>
                            )
                        )}
                    </ToggleGroup>
                </div>
                <DialogFooter>
                    <Button type="submit">Salvar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
