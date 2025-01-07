import * as React from "react";
import { router } from "@inertiajs/react";

import { Weekday } from "@/Pages/Home/Club/Courts/types/types";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { CalendarClock } from "lucide-react";
import { Input } from "@/components/ui/input";

const weekdays = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
];

export function TimeSlotSelectorForReservation(props: { courtId: string }) {
    const [timeSlots, setTimeSlots] = React.useState<{
        [key in Weekday]: {
            id: string;
            start_time: string;
            end_time: string;
        }[];
    }>();

    const [date, setDate] = React.useState(format(new Date(), "yyyy-MM-dd"));
    const [weekday, setWeekday] = React.useState<
        | "sunday"
        | "monday"
        | "tuesday"
        | "wednesday"
        | "thursday"
        | "friday"
        | "saturday"
        | undefined
    >(undefined);

    React.useEffect(() => {
        const dayOfWeek = new Date(date).getDay();
        setWeekday(
            weekdays[dayOfWeek] as
                | "sunday"
                | "monday"
                | "tuesday"
                | "wednesday"
                | "thursday"
                | "friday"
                | "saturday"
        );
    }, [date]);

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDate = e.target.value;
        setDate(selectedDate);

        router.visit(
            route("player.new-reservation.create", {
                courtId: props.courtId,
                date: selectedDate,
            }),
            {
                only: ["court_available_time_slots"],
                preserveState: true,
                onSuccess: (response) => {
                    console.log(response)
                }
            },
        );
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <CalendarClock />
                    Reservar
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-7xl">
                <DialogHeader>
                    <DialogTitle>Selecionar Horário</DialogTitle>
                    <DialogDescription>
                        Selecione os horários disponíveis na quadra.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex gap-x-2 w-max-sm">
                    <Input
                        type="date"
                        className="w-40"
                        value={date}
                        onChange={handleDateChange}
                    />
                </div>
                <div>
                    {weekday && (
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
                            {[].length === 0 && "Nenhum horário disponível."}
                        </ToggleGroup>
                    )}
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancelar</Button>
                    </DialogClose>
                    <Button type="submit">Criar Reserva</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
