import * as React from "react";
import { Head, router, usePage } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

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
import {
    Trash2,
    MoreHorizontal,
    CirclePlus,
} from "lucide-react";
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
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export type Court = {
    id: string;
    name: string;
    sport: "padel" | "tenis" | "squash";
    type: "indoor" | "outdoor";
    reservations: [];
    status: string;
};

export const columns: ColumnDef<Court>[] = [
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
        accessorKey: "sport",
        header: "Esporte",
        cell: ({ row }) => <div>{row.getValue("sport")}</div>,
    },
    {
        accessorKey: "structure_type",
        header: "Estrutura",
        cell: ({ row }) => (
            <div>
                {row.getValue("structure_type")}
            </div>
        ),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <div className="flex gap-x-2">
                <Badge
                    className={
                        row.getValue("status") ? "bg-green-500 hover:bg-green-400" : "bg-red-500"
                    }
                >
                    {row.getValue("status") ? "Ativo" : "Inativo"}
                </Badge>
                {Boolean(row.original.reservations) && (
                    <Badge>Reservado</Badge>
                )}
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
                                router.get("/club/courts/" + row.original.id)
                            }
                        >
                            Ver Quadra
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() =>
                                router.get(
                                    "/club/courts/" + row.original.id + "/edit"
                                )
                            }
                        >
                            Editar Quadra
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

const breadCrumb = [
    { name: "Quadras" }
];

export default function Courts() {
    const { pagination, queryParams = null, success }: any = usePage().props;

    const { data, meta, links }: { data: Court[]; meta: any; links: any } =
        pagination;

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
            columnVisibility: {
                trading_name: false,
                phonenumber: false,
            },
        },
        enableRowSelection: true,
    });

    return (
        <AuthenticatedLayout breadCrumb={breadCrumb}>
            <Head title="Clubes" />
            <div className="w-full">
                <div className="flex justify-between items-center py-4">
                    <Input placeholder="Pesquisar" className="max-w-sm"/>
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
                            onClick={() => router.get("/club/courts/create")}
                        >
                            Criar Quadra <CirclePlus />
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
                                        Nenhuma quadra encontrada.
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
