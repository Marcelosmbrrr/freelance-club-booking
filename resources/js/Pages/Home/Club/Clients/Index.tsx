import { Head, router } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import * as React from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { CirclePlus, MoreHorizontal, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const data: Payment[] = [];

export type Payment = {
    id: string;
    amount: number;
    status: "pending" | "processing" | "success" | "failed";
    email: string;
};

export const columns: ColumnDef<Payment>[] = [
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
        accessorKey: "name",
        header: "Nome",
        cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
        accessorKey: "email",
        header: "E-mail",
        cell: ({ row }) => <div>{row.getValue("email")}</div>,
    },
    {
        accessorKey: "cpf",
        header: "CPF",
        cell: ({ row }) => <div>{row.getValue("cpf")}</div>,
    },
    {
        accessorKey: "phonenumber",
        header: "Telefone",
        cell: ({ row }) => <div>{row.getValue("phonenumber")}</div>,
    },
    {
        accessorKey: "balance",
        header: "Saldo",
        cell: ({ row }) => <div>{row.getValue("balance")}</div>,
    },
    {
        accessorKey: "debts",
        header: "Débitos",
        cell: ({ row }) => <div>{row.getValue("debts")}</div>,
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const payment = row.original;

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
                                router.get("/club/courts/" + row.original.id)
                            }
                        >
                            Ver Cliente
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() =>
                                router.get(
                                    "/club/courts/" + row.original.id + "/edit"
                                )
                            }
                        >
                            Editar Cliente
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

const breadCrumb = [{ name: "Clientes" }];

export default function Clients() {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <AuthenticatedLayout breadCrumb={breadCrumb}>
            <Head title="Clubes" />
            <div className="w-full">
                <div className="flex justify-between items-center py-4">
                    <Input placeholder="Pesquisar" className="max-w-sm" />
                    <div className="flex items-center space-x-2">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="outline"
                                        disabled={
                                            !table.getIsSomeRowsSelected()
                                        }
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
                            onClick={() => router.get(route("club.clients.create"))}
                        >
                            Criar Cliente <CirclePlus />
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
                                    <TableRow
                                        key={row.id}
                                        data-state={
                                            row.getIsSelected() && "selected"
                                        }
                                    >
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
                                        className="h-24 text-center"
                                    >
                                        Nenhum cliente encontrado.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex items-center justify-end space-x-2 py-4">
                    <div className="flex-1 text-sm text-muted-foreground">
                        {table.getFilteredSelectedRowModel().rows.length} de{" "}
                        {table.getFilteredRowModel().rows.length} linha(s)
                        selecionadas.
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
            </div>
        </AuthenticatedLayout>
    );
}
