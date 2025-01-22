import * as React from "react";
import { router, usePage } from "@inertiajs/react";

import { Weekday } from "@/Pages/Home/Club/Courts/types/types";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, Lock, UserPlus } from "lucide-react";
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
    start_time: string;
    end_time: string;
    status: string;
    vacancies: { position: string; filled: boolean }[];
};

type TimeSlots = TimeSlot[];

export function CreateReservationForSelectedCourt(props: {
    courtId: string;
    setCourtId: Function;
}) {
    const { club }: any = usePage().props;

    const [timeSlots, setTimeSlots] = React.useState<TimeSlots>([]);
    const [selectedTimeSlots, setSelectedTimeSlots] = React.useState<
        TimeSlot[]
    >([]);
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

    const handleToggle = (timeSlot: TimeSlot) => {
        // Verifique se o bloco já está selecionado
        const isSelected = selectedTimeSlots.some(
            (slot) => slot.id === timeSlot.id
        );

        // Se o bloco já estiver selecionado, desmarque-o
        if (isSelected) {
            setSelectedTimeSlots(
                selectedTimeSlots.filter((slot) => slot.id !== timeSlot.id)
            );
            return;
        }

        // Caso contrário, para o primeiro bloco selecionado
        if (selectedTimeSlots.length === 0) {
            // Apenas adicione o primeiro bloco sem verificar o próximo automaticamente
            setSelectedTimeSlots([timeSlot]);
        } else {
            // Para blocos subsequentes, verifique se a sequência temporal está correta
            const lastSelected =
                selectedTimeSlots[selectedTimeSlots.length - 1];

            // Verifique se o `start_time` do novo bloco é igual ao `end_time` do último bloco selecionado
            if (timeSlot.start_time === lastSelected.end_time) {
                // Verifique se o bloco é válido: status "true" e vacancies "false"
                if (timeSlot.status && timeSlot.vacancies.length === 0) {
                    setSelectedTimeSlots([...selectedTimeSlots, timeSlot]);
                } else {
                    alert("O bloco selecionado não é válido.");
                }
            } else {
                alert("Selecione horários em sequência.");
            }
        }
    };

    const handleSubmit = () => {
        // Se a seleção for menor que 2 blocos (menos de 1h), mostre um alerta
        if (selectedTimeSlots.length < 2) {
            alert(
                "Selecione no mínimo 1 hora (2 blocos consecutivos de 30 minutos)."
            );
        } else {
            // Prossiga com a criação da reserva ou outras ações
            // Aqui você pode chamar uma função para enviar os blocos selecionados para o servidor
            console.log(
                "Reserva confirmada com os blocos: ",
                selectedTimeSlots
            );
        }
    };

    function fetchData() {
        router.visit(
            route("player.new-reservation.create", {
                clubId: club.data.id,
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
        <div className="flex flex-col gap-y-4 py-4">
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
                        Voltar
                    </Button>
                    <Button onClick={handleSubmit}>Criar Reserva</Button>
                </div>
            </div>
            <div>
                {weekday && (
                    <div>
                        {!pending && (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[120px]">
                                            Bloco
                                        </TableHead>
                                        <TableHead className="w-[140px]">
                                            Disponibilidade
                                        </TableHead>
                                        <TableHead className="text-right">
                                            Selecionar
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {timeSlots.map((time_slot: TimeSlot) => {
                                        const isSelected =
                                            selectedTimeSlots.some(
                                                (slot) =>
                                                    slot.id === time_slot.id
                                            );
                                        return (
                                            <TableRow key={time_slot.id}>
                                                <TableCell className="font-medium">
                                                    {time_slot.label}
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    <Badge variant="secondary">
                                                        {time_slot.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="flex justify-end">
                                                    {time_slot.vacancies.length === 0 &&
                                                    time_slot.status ? (
                                                        <Button
                                                            variant={
                                                                isSelected
                                                                    ? "default"
                                                                    : "ghost"
                                                            } // Aqui, altera o variant se estiver selecionado
                                                            onClick={() =>
                                                                handleToggle(
                                                                    time_slot
                                                                )
                                                            }
                                                        >
                                                            <Check />
                                                        </Button>
                                                    ) : time_slot.vacancies.length > 0 ? (
                                                        <Popover>
                                                            <PopoverTrigger
                                                                asChild
                                                            >
                                                                <Button variant="ghost">
                                                                    <UserPlus />
                                                                </Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-fit">
                                                                <div className="flex gap-x-2">
                                                                    {time_slot.vacancies.map(
                                                                        (vacancy: {
                                                                            position: string;
                                                                            filled: boolean;
                                                                        }) => (
                                                                            <Button disabled={vacancy.filled} variant="ghost">
                                                                                {vacancy.position}
                                                                                {vacancy.filled ? (
                                                                                    <Lock />
                                                                                ) : (
                                                                                    <UserPlus />
                                                                                )}
                                                                            </Button>
                                                                        )
                                                                    )}
                                                                </div>
                                                            </PopoverContent>
                                                        </Popover>
                                                    ) : (
                                                        <Button
                                                            variant="ghost"
                                                            disabled
                                                        >
                                                            <Lock />
                                                        </Button>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        )}
                        {!pending && timeSlots.length === 0 && (
                            <div className="py-2">
                                Nenhum horário disponível.
                            </div>
                        )}
                        {pending && <div className="py-2">Carregando...</div>}
                    </div>
                )}
            </div>
        </div>
    );
}
