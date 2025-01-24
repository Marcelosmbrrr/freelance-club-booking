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
import { CirclePlus, Eye, SquarePen, Volleyball } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Pricing } from "./types/types";
import clsx from "clsx";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

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
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnFilters,
            rowSelection,
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    const handlePageChange = (page: number) => {
        router.get(route("club.courts.index", { ...queryParams, page }));
    };

    return (
        <AuthenticatedLayout breadCrumb={breadCrumb}>
            <Head title="Clubs" />
            <div className="flex justify-between items-center py-4">
                <CourtsFilter />
                <div className="flex items-center space-x-2">
                    <DeletionModal
                        disabled={Object.keys(rowSelection).length === 0}
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
                    table.getRowModel().rows.map((row) => {
                        const isSelected = row.getIsSelected();
                        return (
                            <div
                                key={row.id}
                                className={clsx(
                                    "group flex flex-col border rounded-lg shadow-sm w-full sm:w-auto md:w-[300px] lg:w-[350px] xl:w-[400px] cursor-pointer transition-all duration-200",
                                    "hover:border-yellow-400 hover:shadow-lg", // Hover effect
                                    isSelected
                                        ? "border-2 border-yellow-400 shadow-lg" // Selection effect (yellow)
                                        : "border border-gray-200" // Default state
                                )}
                                onClick={() => row.toggleSelected()}
                            >
                                <div className="flex text-clip relative">
                                    <div
                                        className="aspect-[3/2] size-full rounded-t-lg bg-cover bg-center"
                                        style={{
                                            backgroundImage: `url(${row.original.images[0]})`,
                                        }}
                                    ></div>
                                    <img
                                        src={row.original.sponsor_image}
                                        alt="Miniatura"
                                        className="absolute bottom-2 left-4 w-12 h-12 rounded border-white"
                                    />
                                </div>
                                <div className="p-4 flex flex-col grow">
                                    <ul className="flex gap-x-2 mb-2 text-sm text-neutral-600">
                                        <li className="flex items-center">
                                            <Volleyball className="w-4 h-4 mr-1 text-gray-800 dark:text-white" />
                                            <span>{row.original.sport}</span>
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
                                                    strokeLinecap="round"
                                                    strokeWidth="2"
                                                    d="M8 7V6a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1M3 18v-7a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                                                />
                                            </svg>
                                            <span>
                                                a partir de R$
                                                {row.original.min_price}
                                            </span>
                                        </li>
                                    </ul>
                                    <div className="space-y-2">
                                        <div className="line-clamp-3 break-words text-lg font-medium lg:text-2xl">
                                            {row.original.name}
                                        </div>
                                        <div className="line-clamp-3 break-words text-sm font-medium">
                                            {row.original.description}
                                        </div>
                                    </div>
                                    <div className="flex justify-end items-center gap-2 py-2">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    aria-label="Visualizar Quadra"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        router.get(
                                                            route(
                                                                "club.courts.show",
                                                                {
                                                                    court: row
                                                                        .original
                                                                        .id,
                                                                }
                                                            )
                                                        );
                                                    }}
                                                >
                                                    <Eye />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <p>Visualizar Quadra</p>
                                            </PopoverContent>
                                        </Popover>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    aria-label="Editar Quadra"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        router.get(
                                                            route(
                                                                "club.courts.edit",
                                                                {
                                                                    court: row
                                                                        .original
                                                                        .id,
                                                                }
                                                            )
                                                        );
                                                    }}
                                                >
                                                    <SquarePen />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <p>Editar Quadra</p>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>
                            </div>
                        );
                    })
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
                    {Object.keys(rowSelection).length} de{" "}
                    {table.getFilteredRowModel().rows.length} quadra(s)
                    selecionada(s).
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(meta.current_page - 1)}
                        disabled={meta.current_page === 1}
                    >
                        Anterior
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(meta.current_page + 1)}
                        disabled={meta.current_page === meta.last_page}
                    >
                        Próximo
                    </Button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
