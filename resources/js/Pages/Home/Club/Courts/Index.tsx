import * as React from "react";
import { Head, router, usePage } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { SearchCourts } from "./_components/SearchCourts";

import { Badge } from "@/components/ui/badge";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Trash2, CirclePlus, Eye, SquarePen } from "lucide-react";
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
import { TableCell, TableRow } from "@/components/ui/table";

export type Court = {
    id: string;
    name: string;
    sport: "padel" | "tennis" | "squash";
    type: "indoor" | "outdoor";
    reservations: [];
    status: string;
    images: string[];
    description: string;
    sponsor_image: string[];
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
        accessorKey: "price",
        header: "Preço",
        cell: ({ row }) => <div>{row.getValue("price")}</div>,
    },
    {
        accessorKey: "sport",
        header: "Esporte",
        cell: ({ row }) => <div>{row.getValue("sport")}</div>,
    },
];

const breadCrumb = [{ name: "Quadras" }];

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
            <Head title="Clubs" />
            <div className="flex justify-between items-center py-4">
                <SearchCourts />
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
                        onClick={() => router.get("/club/courts/create")}
                    >
                        Nova Quadra <CirclePlus />
                    </Button>
                </div>
            </div>
            <div className="grid gap-x-4 gap-y-8 md:grid-cols-2 lg:gap-x-6 lg:gap-y-12 2xl:grid-cols-6">
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((item) => (
                        <div
                            key={item.id}
                            className={`group flex flex-col border rounded-lg shadow-sm w-full sm:w-auto md:w-[300px] lg:w-[350px] xl:w-[400px] hover:scale-105 transition-all cursor-pointer ${
                                item.getIsSelected() && "scale-105"
                            }`}
                            onClick={() => item.toggleSelected()}
                        >
                            <div className="flex text-clip relative">
                                <div
                                    className="aspect-[3/2] size-full rounded-t-lg bg-cover bg-center"
                                    style={{
                                        backgroundImage: `url(${item.original.images[0]})`,
                                    }}
                                ></div>
                                <img
                                    src={item.original.sponsor_image}
                                    alt="Miniatura"
                                    className="absolute bottom-2 right-2 w-8 h-8 rounded border-2 border-white"
                                />
                            </div>
                            <div className="p-4">
                                <div className="mb-2">
                                    <Badge
                                        className={
                                            item.original.status
                                                ? "bg-green-500 hover:bg-green-400"
                                                : "bg-red-500"
                                        }
                                    >
                                        {item.original.status
                                            ? "Ativo"
                                            : "Inativo"}
                                    </Badge>
                                </div>
                                <div className="line-clamp-3 break-words text-lg font-medium lg:text-2xl">
                                    {item.original.name}
                                </div>
                                <div className="line-clamp-3 break-words text-sm font-medium">
                                    {item.original.description}
                                </div>
                                <div className="flex justify-end items-center gap-2 py-2">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    onClick={() => {
                                                        router.get(
                                                            route(
                                                                "club.courts.show",
                                                                {
                                                                    court: item
                                                                        .original
                                                                        .id,
                                                                }
                                                            )
                                                        );
                                                    }}
                                                >
                                                    <Eye />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Visualizar Quadra</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    onClick={() => {
                                                        router.get(
                                                            route(
                                                                "club.courts.edit",
                                                                {
                                                                    court: item
                                                                        .original
                                                                        .id,
                                                                }
                                                            )
                                                        );
                                                    }}
                                                >
                                                    <SquarePen />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Editar Quadra</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                            </div>
                        </div>
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
