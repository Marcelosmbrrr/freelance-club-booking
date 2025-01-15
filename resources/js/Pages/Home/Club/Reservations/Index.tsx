import * as React from "react";
import { Head, router, usePage } from "@inertiajs/react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ReservationsFilter } from "./_components/ReservationsFilter";

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
import { Trash2, MoreHorizontal, CirclePlus } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
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

export type Reservation = {
    id: string;
    player_name: string;
    court_name: string;
    date: string;
    status: "confirmed" | "pending" | "canceled";
    player: any;
    court: any;
    time_slots: [];
    price: number;
};

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
        accessorKey: "court_name",
        header: "Quadra",
        cell: ({ row }) => <div>{row.original.court.name}</div>,
    },
    {
        accessorKey: "price",
        header: "Preço",
        cell: ({ row }) => <div>R${row.original.price}</div>,
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
                                        "club.reservations.show",
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
    }: { data: Reservation[]; meta: any; links: any } = pagination;

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
                <ReservationsFilter />
                <div className="flex items-center space-x-2">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="outline"
                                    disabled={!table.getIsSomeRowsSelected()}
                                >
                                    <Trash2 />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Deletar</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <Button
                        variant="outline"
                        className="ml-auto"
                        onClick={() =>
                            router.get(route("club.reservations.create"))
                        }
                        disabled
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
        </AuthenticatedLayout>
    );
}
