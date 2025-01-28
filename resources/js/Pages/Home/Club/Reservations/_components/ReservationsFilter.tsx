import * as React from "react";
import { router, usePage } from "@inertiajs/react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Filter } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface QueryParams {
    search: string;
    date: string;
}

const defaultParams: QueryParams = {
    search: "",
    date: new Date().toISOString()
};

export function ReservationsFilter() {
    const { queryParams = null }: any = usePage().props;
    const parameters: QueryParams = { ...defaultParams, ...queryParams };

    const [filter, setFilter] = React.useState<QueryParams>(parameters);

    function fetchData() {
        router.get(
            route("club.reservations.index"),
            { ...filter },
            {
                preserveState: true,
            }
        );
    }

    return (
        <div className="flex gap-x-1">
            <Input
                placeholder="Pesquisar"
                className="w-72"
                value={filter.search}
                onChange={(e) =>
                    setFilter({ ...filter, search: e.target.value })
                }
            />
            <Input
                type="date"
                value={filter.date}
                onChange={(e) =>
                    setFilter({
                        ...filter,
                        date: e.target.value,
                    })
                }
                className="w-fit"
            />
            <Button type="button" onClick={fetchData}>
                Pesquisar
                <Search />
            </Button>
        </div>
    );
}
