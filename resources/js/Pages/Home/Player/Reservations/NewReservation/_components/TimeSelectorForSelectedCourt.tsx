import * as React from "react";
import { router } from "@inertiajs/react";

import { Weekday } from "@/Pages/Home/Club/Courts/types/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const weekdays = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
];

type TimeSlot = {
    id: string;
    label: string;
    status: string;
    vacancies: string;
};

type TimeSlots = TimeSlot[];

export function TimeSelectorForSelectedCourt(props: {
    courtId: string;
    setCourtId: Function;
}) {
    const [timeSlots, setTimeSlots] = React.useState<TimeSlots>([]);
    const [date, setDate] = React.useState();
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
    const [pending, setPending] = React.useState(false);

    React.useEffect(() => {
        if (date && weekday) {
            fetchData();
        }
    }, [date, weekday]);

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDate = e.target.value;
        setDate(selectedDate);

        // Obter o dia da semana
        const dayOfWeek = new Date(selectedDate).getDay();
        const weekday = weekdays[dayOfWeek] as Weekday;
        setWeekday(weekday);
    };

    function fetchData() {
        router.visit(
            route("player.new-reservation.create", {
                courtId: props.courtId,
                date: date,
                weekday,
            }),
            {
                only: ["court_available_time_slots"],
                preserveState: true,
                onStart: () => {
                    setPending(true);
                },
                onSuccess: (response: any) => {
                    setTimeSlots(
                        response.props.court_available_time_slots.data
                    );
                },
                onError: () => {
                    setTimeSlots([]);
                },
                onFinish: () => {
                    setPending(false);
                },
            }
        );
    }

    return (
        <div className="py-4">
            <div className="flex justify-between items-center gap-x-2 w-max-sm">
                <Input
                    type="date"
                    className="w-40"
                    value={date}
                    onChange={handleDateChange}
                />
                <div className="space-x-1">
                    <Button
                        variant="outline"
                        onClick={() => props.setCourtId(null)}
                    >
                        Cancelar
                    </Button>
                    <Button>Confirmar</Button>
                </div>
            </div>
            <div>
                {weekday && (
                    <div className="py-2">
                        {!pending && (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[120px]">
                                            Bloco
                                        </TableHead>
                                        <TableHead className="w-[140px]">
                                            Status
                                        </TableHead>
                                        <TableHead className="text-right">
                                            Ação
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {timeSlots.map((time_slot: TimeSlot) => (
                                        <TableRow key={time_slot.id}>
                                            <TableCell className="font-medium">
                                                {time_slot.label}
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                <Badge variant="outline">
                                                    {time_slot.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="flex justify-end">
                                                {time_slot.vacancies ? (
                                                    <ToggleGroup
                                                        type="single"
                                                        variant="outline"
                                                    >
                                                        <ToggleGroupItem
                                                            value="bold"
                                                            aria-label="Toggle bold"
                                                        >
                                                            1
                                                        </ToggleGroupItem>
                                                        <ToggleGroupItem
                                                            value="italic"
                                                            aria-label="Toggle italic"
                                                        >
                                                            2
                                                        </ToggleGroupItem>
                                                        -
                                                        <ToggleGroupItem
                                                            value="strikethrough"
                                                            aria-label="Toggle strikethrough"
                                                        >
                                                            3
                                                        </ToggleGroupItem>
                                                        <ToggleGroupItem
                                                            value="strikethrough"
                                                            aria-label="Toggle strikethrough"
                                                        >
                                                            4
                                                        </ToggleGroupItem>
                                                    </ToggleGroup>
                                                ) : (
                                                    <Toggle
                                                        aria-label="Toggle italic"
                                                        variant="outline"
                                                    >
                                                        <Check />
                                                    </Toggle>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                        {!pending && timeSlots.length === 0 && (
                            <div className="py-2">
                                Nenhum horário disponível.
                            </div>
                        )}
                        {pending && <div className="py-2">Loading...</div>}
                    </div>
                )}
            </div>
        </div>
    );
}
