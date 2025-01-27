import * as React from "react";
import { Head, router, usePage } from "@inertiajs/react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { MyReservationFilter } from "../_components/MyReservationFilter";
import { DeletionModal } from "@/components/modal/DeletionModal";

import { Badge } from "@/components/ui/badge";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal, CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface Reservation {
    id: number;
    court: {
        name: string;
        image: string; 
    };
    date: string; 
    start_time: string[]; 
    end_time: string; 
    sport: string;
    status: string;
    total_players: number;
    is_public: boolean;
    price: number;
}

export const columns: ColumnDef<Reservation>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "status",
        header: "Situação",
        cell: ({ row }) => (
            <Badge>
                {row.getValue("status") === "confirmed"
                    ? "Confirmado"
                    : row.getValue("status") === "pending"
                    ? "Pendente"
                    : "Cancelado"}
            </Badge>
        ),
    },
    {
        accessorKey: "date",
        header: "Data",
        cell: ({ row }) => (
            <div>
                {format(row.getValue("date"), "EEEE, dd 'de' MMMM 'de' yyyy", {
                    locale: ptBR,
                })}
            </div>
        ),
    },
    {
        accessorKey: "time",
        header: "Horário",
        cell: ({ row }) => row.getValue("time"),
    },
    {
        accessorKey: "is_public",
        header: "Público",
        cell: ({ row }) => (row.getValue("is_public") ? "Sim" : "Não"),
    },

    {
        id: "actions",
        header: "Ações",
        enableHiding: false,
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Abrir Menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem
                            onClick={() =>
                                router.get(
                                    route(
                                        "player.reservations.show",
                                        row.original.id
                                    )
                                )
                            }
                        >
                            Ver Reserva
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

const breadCrumb = [{ name: "Reservas" }];

export default function Reservations() {
    const { pagination, queryParams = null, success }: any = usePage().props;

    const {
        data,
        meta,
        links,
    }: {
        data: Reservation[];
        meta: any;
        links: any;
    } = pagination;

    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
            columnVisibility: {},
        },
        enableRowSelection: true,
    });

    return (
        <AuthenticatedLayout breadCrumb={breadCrumb}>
            <Head title="Reservas" />
            <div className="flex justify-between items-center py-4">
                <MyReservationFilter />
                <div className="flex items-center space-x-2">
                    <DeletionModal
                        disabled={
                            table.getFilteredSelectedRowModel().rows.length ===
                            0
                        }
                    />
                    <Button
                        variant="outline"
                        className="ml-auto"
                        onClick={() =>
                            router.get(route("player.new-reservation.index"))
                        }
                    >
                        Nova Reserva <CirclePlus />
                    </Button>
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="text-center"
                                >
                                    Nenhuma reserva encontrada.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} de{" "}
                    {table.getFilteredRowModel().rows.length} quadra(s)
                    selecionada(s).
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Anterior
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Próximo
                    </Button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
