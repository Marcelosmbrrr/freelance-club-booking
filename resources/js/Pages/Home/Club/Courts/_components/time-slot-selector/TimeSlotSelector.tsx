import * as React from "react";
// Components
import { Weekday } from "../../types/types";
import { timeSlotsList } from "@/utils/data/timeSlotsList";
// Types
import { TimeSlot } from "../../types/types";
// Shadcn
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Combobox } from "@/components/combobox/Combobox";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { BadgePercent } from "lucide-react";

type Data = {
    [key in Weekday]: { start_time: string; end_time: string }[];
};

const weekdays: Weekday[] = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
];

export function TimeSlotSelector(props: {
    setData: Function;
    data?: TimeSlot;
}) {
    const [data, setData] = React.useState<Data>({
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: [],
    });

    React.useEffect(() => {
        if (props.data) {
            setData(props.data);
        }
    }, []);

    function handleCheck(toggle: boolean, weekday: Weekday) {
        const clone = Object.assign({}, data);
        clone[weekday] = toggle ? [{ start_time: "", end_time: "" }] : [];
        setData(clone);
        props.setData(clone);
    }

    function addTimeSlot(weekday: Weekday) {
        const clone = Object.assign({}, data);
        clone[weekday].push({
            start_time: "",
            end_time: "",
        });
        setData(clone);
        props.setData(clone);
    }

    function removeTimeSlot(weekday: Weekday, index: number) {
        const clone = Object.assign({}, data);
        clone[weekday].splice(index, 1);
        setData(clone);
        props.setData(clone);
    }

    function handleSelect(
        value: string,
        field: "start_time" | "end_time",
        weekday: Weekday,
        index: number
    ) {
        const clone = Object.assign({}, data);
        clone[weekday][index][field] = value;
        setData(clone);
        props.setData(clone);
    }

    return (
        <div className="w-1/3 space-y-4">
            {weekdays.map((weekday: Weekday) => (
                <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id={weekday}
                            value={weekday}
                            onCheckedChange={(v: boolean) =>
                                handleCheck(v, weekday)
                            }
                        />
                        <label
                            htmlFor={weekday}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            {weekday}
                        </label>
                    </div>
                    {data[weekday].length > 0 && (
                        <div className="space-y-2 py-2">
                            {data[weekday].map((time_slot, index) => (
                                <div key={index}>
                                    <div className="flex space-x-2">
                                        <div className="grid gap-2">
                                            <Combobox
                                                options={timeSlotsList.map(
                                                    (item) => ({
                                                        value: item,
                                                        label: item,
                                                    })
                                                )}
                                                placeholder="Open at"
                                                name="start_time"
                                                id="start_time"
                                                value={time_slot.start_time}
                                                setValue={(value) =>
                                                    handleSelect(
                                                        value,
                                                        "start_time",
                                                        weekday,
                                                        index
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Combobox
                                                options={timeSlotsList.map(
                                                    (item) => ({
                                                        value: item,
                                                        label: item,
                                                    })
                                                )}
                                                name="end_time"
                                                id="end_time"
                                                placeholder="Close at"
                                                value={time_slot.end_time}
                                                setValue={(value) =>
                                                    handleSelect(
                                                        value,
                                                        "end_time",
                                                        weekday,
                                                        index
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Popover>
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <PopoverTrigger
                                                                asChild
                                                            >
                                                                <Button variant="ghost">
                                                                    <BadgePercent />
                                                                </Button>
                                                            </PopoverTrigger>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>
                                                                Promotions
                                                            </p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                                <PopoverContent className="w-[420px]">
                                                    <div className="grid gap-4">
                                                        <div className="space-y-2">
                                                            <h4 className="font-medium leading-none">
                                                                Promotions
                                                            </h4>
                                                            <p className="text-sm text-muted-foreground">
                                                                Set price
                                                                discounts for
                                                                this period.
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center gap-x-2">
                                                            <div className="w-full">
                                                                <Input
                                                                    placeholder="Discount"
                                                                    className="col-span-2 h-8"
                                                                />
                                                            </div>
                                                            <div className="w-full">
                                                                <Input
                                                                    placeholder="From"
                                                                    className="col-span-2 h-8"
                                                                />
                                                            </div>
                                                            <div className="w-full">
                                                                <Input
                                                                    placeholder="To"
                                                                    className="col-span-2 h-8"
                                                                />
                                                            </div>
                                                            <TooltipProvider>
                                                                <Tooltip>
                                                                    <TooltipTrigger
                                                                        asChild
                                                                    >
                                                                        <Button
                                                                            variant="ghost"
                                                                            type="button"
                                                                        >
                                                                            <Trash2 />
                                                                        </Button>
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>
                                                                        <p>
                                                                            Delete
                                                                            Promotion
                                                                        </p>
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>
                                                            <TooltipProvider>
                                                                <Tooltip>
                                                                    <TooltipTrigger
                                                                        asChild
                                                                    >
                                                                        <Button
                                                                            variant="ghost"
                                                                            type="button"
                                                                        >
                                                                            <Plus />
                                                                        </Button>
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>
                                                                        <p>
                                                                            Add
                                                                            Promotion
                                                                        </p>
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>
                                                        </div>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        </div>

                                        <div className="flex items-end">
                                            {index === 0 && (
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button
                                                                variant="ghost"
                                                                type="button"
                                                                onClick={() =>
                                                                    addTimeSlot(
                                                                        weekday
                                                                    )
                                                                }
                                                            >
                                                                <Plus />
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Add Time Slot</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            )}
                                            {index > 0 && (
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button
                                                                variant="ghost"
                                                                type="button"
                                                                onClick={() =>
                                                                    removeTimeSlot(
                                                                        weekday,
                                                                        index
                                                                    )
                                                                }
                                                            >
                                                                <Trash2 />
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>
                                                                Delete Time Slot
                                                            </p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
