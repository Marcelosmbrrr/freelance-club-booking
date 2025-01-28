import * as React from "react";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { router } from "@inertiajs/react";

export function ReservationDrawer({ children, reservation }) {
    console.log(reservation)
    return (
        <Drawer>
            <DrawerTrigger asChild>{children}</DrawerTrigger>
            <DrawerContent>
                <div className="py-2 mx-auto w-full h-[calc(100vh-100px)] max-w-7xl">
                    <DrawerHeader className="flex justify-between items-center">
                        <div>
                            <DrawerTitle className="text-2xl">
                                Reserva de {reservation.creator_name}
                            </DrawerTitle>
                            <DrawerDescription>
                                <Badge>{reservation.status}</Badge>
                            </DrawerDescription>
                        </div>
                        <DrawerClose asChild>
                            <Button>Fechar</Button>
                        </DrawerClose>
                    </DrawerHeader>
                    <div className="p-4 space-y-4">
                        <div>
                            <div className="flex gap-4">
                                <div className="grid gap-2">
                                    <Label>Data Agendada</Label>
                                    <Input
                                        type="text"
                                        className="w-72"
                                        value={format(
                                            reservation.date,
                                            "EEEE, dd 'de' MMMM 'de' yyyy",
                                            {
                                                locale: ptBR,
                                            }
                                        )}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label>Quadra</Label>
                                    <Input
                                        type="text"
                                        className="w-72"
                                        value={reservation.court.name}
                                    />
                                </div>
                                <div className="flex items-end">
                                    <Button
                                        onClick={() =>
                                            router.get(
                                                route("club.courts.show", {
                                                    court: reservation
                                                        .court.id,
                                                })
                                            )
                                        }
                                    >
                                        Ver Quadra <Search />
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[140px]">
                                        Horário
                                    </TableHead>
                                    <TableHead className="w-[140px]">
                                        Promoção
                                    </TableHead>
                                    <TableHead className="text-right">
                                        Preço Total
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        {
                                            reservation.start_time
                                        }{" "}
                                        -{" "}
                                        {reservation.end_time}
                                    </TableCell>
                                    <TableCell>
                                        {reservation
                                            .promotion ?? "Sem promoção"}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        R${reservation.price}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <div className="container w-full">
                            <Tabs defaultValue="1">
                                <TabsList className="flex h-auto w-full flex-col gap-2 bg-background md:flex-row">
                                    {reservation.players.map(
                                        (player) => (
                                            <TabsTrigger
                                                value={player.position}
                                                className="flex w-full flex-col items-start justify-start gap-1 whitespace-normal rounded-md border p-4 text-left text-primary hover:border-primary/40 data-[state=active]:border-primary"
                                            >
                                                <div className="flex items-center gap-2 md:flex-col md:items-start lg:gap-4">
                                                    <Avatar className="size-12">
                                                        <AvatarImage
                                                            src={
                                                                player.user
                                                                    ?.avatar ||
                                                                ""
                                                            }
                                                            alt="@shadcn"
                                                        />
                                                        <AvatarFallback>
                                                            P{player.position}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <p className="text-lg font-semibold md:text-2xl lg:text-xl">
                                                        {player.user
                                                            ? player.user.name
                                                            : "Jogador " +
                                                              player.position}
                                                    </p>
                                                </div>
                                                <p className="font-normal text-muted-foreground md:block">
                                                    <Badge>
                                                        {player.user
                                                            ? "Vaga Preenchida"
                                                            : "Aguardando Jogador"}
                                                    </Badge>
                                                </p>
                                            </TabsTrigger>
                                        )
                                    )}
                                </TabsList>
                                {reservation.players.map((player) => (
                                    <TabsContent
                                        value={player.position}
                                        className="rounded-lg border p-8 space-y-4"
                                    >
                                        <div className="flex justify-between items-center">
                                            <h3 className="font-medium text-xl">
                                                {player.user
                                                    ? "Informações da Reserva"
                                                    : "Aguardando jogador..."}
                                            </h3>
                                            <Button disabled={!player.user}>
                                                Ver Cliente <Search />
                                            </Button>
                                        </div>
                                        {player.user && (
                                            <div className="space-y-4">
                                                <div className="flex gap-4">
                                                    <div className="grid w-full items-center gap-1.5">
                                                        <Label htmlFor="phonenumber">
                                                            Entrou em
                                                        </Label>
                                                        <Input
                                                            type="text"
                                                            id="phonenumber"
                                                            value="21/01/2025"
                                                        />
                                                    </div>
                                                    <div className="grid w-full items-center gap-1.5">
                                                        <Label htmlFor="name">
                                                            Situação
                                                        </Label>
                                                        <Input
                                                            type="text"
                                                            id="name"
                                                            value="Aguardando pagamento"
                                                        />
                                                    </div>
                                                    <div className="grid w-full items-center gap-1.5">
                                                        <Label htmlFor="email">
                                                            Valor a pagar
                                                        </Label>
                                                        <Input
                                                            type="text"
                                                            id="email"
                                                            value="R$12.5"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </TabsContent>
                                ))}
                            </Tabs>
                        </div>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
