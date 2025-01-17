import * as React from "react";
// Components
import { timeList } from "@/utils/data/timeList";
// Types
import { TimeSlot, Weekday } from "../types/types";
// Shadcn
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

type Data = {
    [key in Weekday]: {
        discount: number;
        start_time: string;
        end_time: string;
    }[];
};

export function PromotionsSelector(props: {
    setData: Function;
    time_slots: TimeSlot;
    data?: Data;
}) {
    const [promotions, setPromotions] = React.useState<Data>({
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
            setPromotions(props.data);
        }
    }, []);

    const availableTimeSlots = Object.fromEntries(
        Object.entries(props.time_slots).filter(
            ([key, value]) =>
                value.length > 0 &&
                value[0].start_time != "" &&
                value[0].end_time != ""
        )
    );

    function handleCheck(toggle: boolean, weekday: Weekday) {
        const clone = Object.assign({}, promotions);
        clone[weekday] = toggle
            ? [{ discount: 0, start_time: "", end_time: "" }]
            : [];
        setPromotions(clone);
        props.setData(clone);
    }

    function addPromotion(weekday: Weekday) {
        const clone = Object.assign({}, promotions);
        clone[weekday].push({
            discount: 0,
            start_time: "",
            end_time: "",
        });
        setPromotions(clone);
        props.setData(clone);
    }

    function removePromotion(weekday: Weekday, index: number) {
        const clone = Object.assign({}, promotions);
        clone[weekday].splice(index, 1);
        setPromotions(clone);
        props.setData(clone);
    }

    function handleSelect(
        value: string,
        field: "start_time" | "end_time",
        weekday: Weekday,
        index: number
    ) {
        const clone = Object.assign({}, promotions);
        clone[weekday][index][field] = value;
        setPromotions(clone);
        props.setData(clone);
    }

    function getTimeSlotsInRange(
        weekday_time_slots: { start_time: string; end_time: string }[]
    ) {
        const startIndex = timeList.indexOf(weekday_time_slots[0].start_time);
        const endIndex = timeList.indexOf(
            weekday_time_slots.slice(-1)[0].end_time
        );

        if (startIndex === -1 || endIndex === -1) {
            throw new Error("Os valores fornecidos não existem na lista.");
        }

        return timeList.slice(startIndex, endIndex + 1);
    }

    return (
        <div className="w-1/2 space-y-4">
            {Object.keys(availableTimeSlots).map((weekday: string) => (
                <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id={weekday}
                            value={weekday}
                            checked={promotions[weekday as Weekday].length > 0}
                            onCheckedChange={(v: boolean) =>
                                handleCheck(v, weekday as Weekday)
                            }
                        />
                        <label
                            htmlFor={weekday}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            {weekday}
                        </label>
                    </div>
                    {Object.keys(promotions).length > 0 &&
                        promotions[weekday as Weekday].length > 0 && (
                            <div className="space-y-2 py-2">
                                {promotions[weekday as Weekday].map(
                                    (promotion, index) => (
                                        <div key={index}>
                                            <div className="flex space-x-2">
                                                <Input
                                                    type="number"
                                                    min="0"
                                                    max="100"
                                                    step="1"
                                                    placeholder="Desconto (%)"
                                                    value={promotion.discount}
                                                    onChange={(e) => {
                                                        const clone = {
                                                            ...promotions,
                                                        };
                                                        clone[
                                                            weekday as Weekday
                                                        ][index].discount =
                                                            Number(
                                                                e.target.value
                                                            );
                                                        setPromotions(clone);
                                                        props.setData(clone);
                                                    }}
                                                />
                                                <Select
                                                    onValueChange={(v) =>
                                                        handleSelect(
                                                            v,
                                                            "start_time",
                                                            weekday as Weekday,
                                                            index
                                                        )
                                                    }
                                                    value={promotion.start_time}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="De" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            {getTimeSlotsInRange(
                                                                availableTimeSlots[
                                                                    weekday
                                                                ]
                                                            ).map(
                                                                (time_slot) => (
                                                                    <SelectItem
                                                                        value={
                                                                            time_slot
                                                                        }
                                                                    >
                                                                        {
                                                                            time_slot
                                                                        }
                                                                    </SelectItem>
                                                                )
                                                            )}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                                <Select
                                                    onValueChange={(v) =>
                                                        handleSelect(
                                                            v,
                                                            "end_time",
                                                            weekday as Weekday,
                                                            index
                                                        )
                                                    }
                                                    value={promotion.end_time}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Até" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            {getTimeSlotsInRange(
                                                                availableTimeSlots[
                                                                    weekday
                                                                ]
                                                            ).map(
                                                                (time_slot) => (
                                                                    <SelectItem
                                                                        value={
                                                                            time_slot
                                                                        }
                                                                    >
                                                                        {
                                                                            time_slot
                                                                        }
                                                                    </SelectItem>
                                                                )
                                                            )}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                                <div className="flex items-end">
                                                    {index === 0 && (
                                                        <TooltipProvider>
                                                            <Tooltip>
                                                                <TooltipTrigger
                                                                    asChild
                                                                >
                                                                    <Button
                                                                        variant="ghost"
                                                                        type="button"
                                                                        onClick={() =>
                                                                            addPromotion(
                                                                                weekday as Weekday
                                                                            )
                                                                        }
                                                                    >
                                                                        <Plus />
                                                                    </Button>
                                                                </TooltipTrigger>
                                                                <TooltipContent>
                                                                    <p>
                                                                        Adicionar
                                                                        Horário
                                                                    </p>
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </TooltipProvider>
                                                    )}
                                                    {index > 0 && (
                                                        <TooltipProvider>
                                                            <Tooltip>
                                                                <TooltipTrigger
                                                                    asChild
                                                                >
                                                                    <Button
                                                                        variant="ghost"
                                                                        type="button"
                                                                        onClick={() =>
                                                                            removePromotion(
                                                                                weekday as Weekday,
                                                                                index
                                                                            )
                                                                        }
                                                                    >
                                                                        <Trash2 />
                                                                    </Button>
                                                                </TooltipTrigger>
                                                                <TooltipContent>
                                                                    <p>
                                                                        Deletar
                                                                        Horário
                                                                    </p>
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </TooltipProvider>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        )}
                </div>
            ))}
        </div>
    );
}
