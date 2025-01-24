import * as React from "react";
import { router, usePage } from "@inertiajs/react";

import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Lock, Search, UserPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type TimeSlot = {
    id: string;
    label: string;
    start_time: string;
    end_time: string;
    status: string;
    vacancies: {
        position: string;
        filled: boolean;
        player: {
            match_type: string;
            sex: string;
            description: string;
            created_at: string | number | Date;
            paid: any;
            best_hand: string;
            name: string;
            image: string;
        };
        team: string; 
    }[];
};

type TimeSlots = TimeSlot[];

export function CreateReservationForSelectedCourt(props: {
    courtId: string;
    setCourtId: Function;
}) {
    const { club, queryParams = null }: any = usePage().props;

    const [timeSlots, setTimeSlots] = React.useState<TimeSlots>([]);
    const [selectedTimeSlots, setSelectedTimeSlots] = React.useState<
        TimeSlot[]
    >([]);
    const [date, setDate] = React.useState(
        queryParams ? queryParams.date : new Date().toISOString().split("T")[0]
    );
    const [pending, setPending] = React.useState(false);

    React.useEffect(() => {
        fetchData();
    }, []);

    const handleToggle = (timeSlot: TimeSlot) => {
        const isSelected = selectedTimeSlots.some(
            (slot) => slot.id === timeSlot.id
        );

        if (isSelected) {
            setSelectedTimeSlots(
                selectedTimeSlots.filter((slot) => slot.id !== timeSlot.id)
            );
            return;
        }

        if (selectedTimeSlots.length === 0) {
            setSelectedTimeSlots([timeSlot]);
        } else {
            const lastSelected =
                selectedTimeSlots[selectedTimeSlots.length - 1];

            if (timeSlot.start_time === lastSelected.end_time) {
                if (
                    timeSlot.status === "available" ||
                    timeSlot.status === "available vacancy"
                ) {
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
        if (selectedTimeSlots.length < 2) {
            alert(
                "Selecione no mínimo 1 hora (2 blocos consecutivos de 30 minutos)."
            );
        } else {
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
                <div className="flex gap-x-2">
                    <Input
                        type="date"
                        className="w-40"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <Button onClick={fetchData}>
                        Pesquisar <Search />
                    </Button>
                </div>

                <div className="space-x-1">
                    <Button
                        variant="outline"
                        onClick={() => props.setCourtId(null)}
                    >
                        Voltar
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={selectedTimeSlots.length < 2}
                    >
                        Criar Reserva
                    </Button>
                </div>
            </div>
            <div>
                {date && (
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
                                                        {time_slot.status ===
                                                        "available vacancy"
                                                            ? "Vagas Disponíveis"
                                                            : time_slot.status ===
                                                              "available"
                                                            ? "Disponível"
                                                            : "Indisponível"}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="flex justify-end">
                                                    {time_slot.status ===
                                                    "available" ? (
                                                        <Button
                                                            variant={
                                                                isSelected
                                                                    ? "default"
                                                                    : "ghost"
                                                            }
                                                            onClick={() =>
                                                                handleToggle(
                                                                    time_slot
                                                                )
                                                            }
                                                        >
                                                            <Check />
                                                        </Button>
                                                    ) : time_slot.status ===
                                                      "available vacancy" ? (
                                                        <Dialog>
                                                            <DialogTrigger
                                                                asChild
                                                            >
                                                                <Button
                                                                    variant="ghost"
                                                                    disabled={
                                                                        selectedTimeSlots.length >
                                                                        0
                                                                    }
                                                                >
                                                                    <UserPlus />
                                                                </Button>
                                                            </DialogTrigger>
                                                            <DialogContent className="max-w-7xl">
                                                                <DialogHeader>
                                                                    <DialogTitle>
                                                                        Reserva
                                                                        Pública
                                                                    </DialogTitle>
                                                                    <DialogDescription>
                                                                        Existem{" "}
                                                                        {
                                                                            time_slot.vacancies.filter(
                                                                                (
                                                                                    slot
                                                                                ) =>
                                                                                    !slot.filled
                                                                            )
                                                                                .length
                                                                        }{" "}
                                                                        vagas
                                                                        abertas
                                                                        nessa
                                                                        reserva.
                                                                    </DialogDescription>
                                                                </DialogHeader>
                                                                <div>
                                                                    <Tabs defaultValue="1">
                                                                        <TabsList className="flex h-auto w-full flex-col gap-2 bg-background md:flex-row">
                                                                            {time_slot.vacancies.map(
                                                                                (
                                                                                    item,
                                                                                    index
                                                                                ) => (
                                                                                    <TabsTrigger
                                                                                        key={
                                                                                            item.position
                                                                                        }
                                                                                        value={
                                                                                            item.position
                                                                                        }
                                                                                        className="flex w-full flex-col items-start justify-start gap-1 whitespace-normal rounded-md border p-4 text-left text-primary hover:border-primary/40 data-[state=active]:border-primary"
                                                                                    >
                                                                                        <div className="flex items-center gap-2 md:flex-col md:items-start lg:gap-4">
                                                                                            <Avatar>
                                                                                                <AvatarImage
                                                                                                    className="size-12"
                                                                                                    src={
                                                                                                        item
                                                                                                            .player
                                                                                                            ?.image ||
                                                                                                        ""
                                                                                                    }
                                                                                                    alt="@shadcn"
                                                                                                />
                                                                                                <AvatarFallback>
                                                                                                    P
                                                                                                    {
                                                                                                        item.position
                                                                                                    }
                                                                                                </AvatarFallback>
                                                                                            </Avatar>
                                                                                            <div>
                                                                                                <p className="text-lg font-semibold md:text-2xl lg:text-xl">
                                                                                                    {item
                                                                                                        .player
                                                                                                        ?.name ||
                                                                                                        "Vaga Disponível"}
                                                                                                </p>
                                                                                                <p className="text-sm text-muted-foreground">
                                                                                                    Time:{" "}
                                                                                                    {
                                                                                                        item.team
                                                                                                    }{" "}
                                                                                                    {/* Exibindo o time */}
                                                                                                </p>
                                                                                            </div>
                                                                                        </div>
                                                                                    </TabsTrigger>
                                                                                )
                                                                            )}
                                                                        </TabsList>
                                                                        {time_slot.vacancies.map(
                                                                            (
                                                                                item
                                                                            ) => (
                                                                                <TabsContent
                                                                                    key={
                                                                                        item.position
                                                                                    }
                                                                                    value={
                                                                                        item.position
                                                                                    }
                                                                                    className="border rounded-lg p-4"
                                                                                >
                                                                                    <div className="p-4">
                                                                                        {item.filled ? (
                                                                                            <div className="space-y-4">
                                                                                                <h3 className="text-xl font-semibold">
                                                                                                    Dados
                                                                                                    do
                                                                                                    Jogador
                                                                                                </h3>
                                                                                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                                                                    <div className="flex items-center gap-4">
                                                                                                        <Avatar>
                                                                                                            <AvatarImage
                                                                                                                src={
                                                                                                                    item
                                                                                                                        .player
                                                                                                                        ?.image ||
                                                                                                                    ""
                                                                                                                }
                                                                                                                alt={
                                                                                                                    item
                                                                                                                        .player
                                                                                                                        ?.name ||
                                                                                                                    "Jogador"
                                                                                                                }
                                                                                                            />
                                                                                                            <AvatarFallback>
                                                                                                                {item.player?.name?.charAt(
                                                                                                                    0
                                                                                                                ) ||
                                                                                                                    "J"}
                                                                                                            </AvatarFallback>
                                                                                                        </Avatar>
                                                                                                        <div>
                                                                                                            <p className="text-lg font-semibold">
                                                                                                                {item
                                                                                                                    .player
                                                                                                                    ?.name ||
                                                                                                                    "Nome não disponível"}
                                                                                                            </p>
                                                                                                            <p className="text-sm text-muted-foreground">
                                                                                                                Posição:{" "}
                                                                                                                {
                                                                                                                    item.position
                                                                                                                }
                                                                                                            </p>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div className="space-y-2">
                                                                                                        <p className="text-sm">
                                                                                                            <strong>
                                                                                                                Melhor
                                                                                                                mão:
                                                                                                            </strong>{" "}
                                                                                                            {item
                                                                                                                .player
                                                                                                                ?.best_hand ||
                                                                                                                "n/a"}
                                                                                                        </p>
                                                                                                        <p className="text-sm">
                                                                                                            <strong>
                                                                                                                Tipo
                                                                                                                de
                                                                                                                partida:
                                                                                                            </strong>{" "}
                                                                                                            {item
                                                                                                                .player
                                                                                                                ?.match_type ||
                                                                                                                "n/a"}
                                                                                                        </p>
                                                                                                        <p className="text-sm">
                                                                                                            <strong>
                                                                                                                Sexo:
                                                                                                            </strong>{" "}
                                                                                                            {item
                                                                                                                .player
                                                                                                                ?.sex ||
                                                                                                                "n/a"}
                                                                                                        </p>
                                                                                                        <p className="text-sm">
                                                                                                            <strong>
                                                                                                                Descrição:
                                                                                                            </strong>{" "}
                                                                                                            {item
                                                                                                                .player
                                                                                                                ?.description ||
                                                                                                                "n/a"}
                                                                                                        </p>
                                                                                                        <p className="text-sm">
                                                                                                            <strong>
                                                                                                                Membro
                                                                                                                desde:
                                                                                                            </strong>{" "}
                                                                                                            {new Date(
                                                                                                                item.player?.created_at
                                                                                                            ).toLocaleDateString()}
                                                                                                        </p>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className="space-y-2">
                                                                                                    <h4 className="text-lg font-semibold">
                                                                                                        Pagamento
                                                                                                    </h4>
                                                                                                    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                                                                                                        <p className="text-sm">
                                                                                                            <strong>
                                                                                                                Valor
                                                                                                                total
                                                                                                                da
                                                                                                                reserva:
                                                                                                            </strong>{" "}
                                                                                                            R$
                                                                                                            120,00
                                                                                                        </p>
                                                                                                        <p className="text-sm">
                                                                                                            <strong>
                                                                                                                Valor
                                                                                                                por
                                                                                                                jogador:
                                                                                                            </strong>{" "}
                                                                                                            R$
                                                                                                            30,00
                                                                                                        </p>
                                                                                                        <p className="text-sm">
                                                                                                            <strong>
                                                                                                                Status
                                                                                                                do
                                                                                                                pagamento:
                                                                                                            </strong>{" "}
                                                                                                            <Badge
                                                                                                                variant={
                                                                                                                    item
                                                                                                                        .player
                                                                                                                        ?.paid
                                                                                                                        ? "default"
                                                                                                                        : "secondary"
                                                                                                                }
                                                                                                            >
                                                                                                                {item
                                                                                                                    .player
                                                                                                                    ?.paid
                                                                                                                    ? "Pago"
                                                                                                                    : "Pendente"}
                                                                                                            </Badge>
                                                                                                        </p>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        ) : (
                                                                                            <div className="space-y-4">
                                                                                                <h3 className="text-xl font-semibold">
                                                                                                    Vaga
                                                                                                    Disponível
                                                                                                </h3>
                                                                                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                                                                    <div className="space-y-2">
                                                                                                        <p className="text-sm">
                                                                                                            <strong>
                                                                                                                Posição:
                                                                                                            </strong>{" "}
                                                                                                            {
                                                                                                                item.position
                                                                                                            }
                                                                                                        </p>
                                                                                                        <p className="text-sm">
                                                                                                            <strong>
                                                                                                                Nível
                                                                                                                esperado:
                                                                                                            </strong>{" "}
                                                                                                            Intermediário
                                                                                                        </p>
                                                                                                        <p className="text-sm">
                                                                                                            <strong>
                                                                                                                Duração:
                                                                                                            </strong>{" "}
                                                                                                            1
                                                                                                            hora
                                                                                                        </p>
                                                                                                    </div>
                                                                                                    <div className="space-y-2">
                                                                                                        <p className="text-sm">
                                                                                                            <strong>
                                                                                                                Requisitos:
                                                                                                            </strong>
                                                                                                        </p>
                                                                                                        <ul className="list-disc list-inside text-sm text-muted-foreground">
                                                                                                            <li>
                                                                                                                Nível
                                                                                                                intermediário
                                                                                                                ou
                                                                                                                superior
                                                                                                            </li>
                                                                                                            <li>
                                                                                                                Confirmar
                                                                                                                presença
                                                                                                                com
                                                                                                                15
                                                                                                                minutos
                                                                                                                de
                                                                                                                antecedência
                                                                                                            </li>
                                                                                                        </ul>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className="space-y-2">
                                                                                                    <h4 className="text-lg font-semibold">
                                                                                                        Pagamento
                                                                                                    </h4>
                                                                                                    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                                                                                                        <p className="text-sm">
                                                                                                            <strong>
                                                                                                                Valor
                                                                                                                total
                                                                                                                da
                                                                                                                reserva:
                                                                                                            </strong>{" "}
                                                                                                            R$
                                                                                                            120,00
                                                                                                        </p>
                                                                                                        <p className="text-sm">
                                                                                                            <strong>
                                                                                                                Valor
                                                                                                                por
                                                                                                                jogador:
                                                                                                            </strong>{" "}
                                                                                                            R$
                                                                                                            30,00
                                                                                                        </p>
                                                                                                        <p className="text-sm">
                                                                                                            <strong>
                                                                                                                Valor
                                                                                                                a
                                                                                                                pagar:
                                                                                                            </strong>{" "}
                                                                                                            R$
                                                                                                            30,00
                                                                                                        </p>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <Button className="mt-4">
                                                                                                    Entrar
                                                                                                    na
                                                                                                    Vaga
                                                                                                </Button>
                                                                                            </div>
                                                                                        )}
                                                                                    </div>
                                                                                </TabsContent>
                                                                            )
                                                                        )}
                                                                    </Tabs>
                                                                </div>
                                                                <DialogFooter>
                                                                    <DialogClose
                                                                        asChild
                                                                    >
                                                                        <Button
                                                                            type="button"
                                                                            variant="outline"
                                                                        >
                                                                            Cancelar
                                                                        </Button>
                                                                    </DialogClose>
                                                                    <Button type="submit">
                                                                        Salvar
                                                                    </Button>
                                                                </DialogFooter>
                                                            </DialogContent>
                                                        </Dialog>
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
