import * as React from "react";
import { Head, router, usePage } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { CourtsFilter } from "./_components/CourtsFilter";
import { DeletionModal } from "@/components/modal/DeletionModal";

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
import { Trash2, CirclePlus, Eye, SquarePen, Volleyball } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import { Pricing } from "./types/types";

export type Court = {
    id: string;
    name: string;
    sport: "padel" | "tennis" | "squash";
    type: "indoor" | "outdoor";
    reservations: [];
    status: string;
    images: string[];
    description: string;
    sponsor_image: string;
    pricing: Pricing[];
    min_price: string;
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
                <CourtsFilter />
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
                                    className="absolute bottom-2 left-4 w-12 h-12 rounded border-white"
                                />
                            </div>
                            <div className="p-4 flex flex-col grow">
                                <ul className="flex gap-x-2 mb-2 text-sm text-neutral-600">
                                    <li className="flex items-center">
                                        <Volleyball className="w-4 h-4 mr-1 text-gray-800 dark:text-white" />
                                        <span>{item.original.sport}</span>
                                    </li>
                                    <li className="flex items-center">
                                        <svg
                                            className="w-4 h-4 mr-1 text-gray-800 dark:text-white"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-width="2"
                                                d="M8 7V6a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1M3 18v-7a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                                            />
                                        </svg>
                                        <span>
                                            a partir de R$
                                            {item.original.min_price}
                                        </span>
                                    </li>
                                </ul>
                                <div className="space-y-2">
                                    <div className="line-clamp-3 break-words text-lg font-medium lg:text-2xl">
                                        {item.original.name}
                                    </div>
                                    <div className="line-clamp-3 break-words text-sm font-medium">
                                        {item.original.description}
                                    </div>
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
