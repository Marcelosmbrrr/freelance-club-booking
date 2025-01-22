import * as React from "react";
// Components
import { Weekday } from "../../types/types";
import { timeList } from "@/utils/data/timeList";
// Types
import { TimeSlot } from "../../types/types";
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

type Data = {
    [key in Weekday]: {
        start_time: string;
        end_time: string;
        is_interval?: boolean;
    }[];
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
    const [timeSlotsByWeekday, setTimeSlotsByWeekday] = React.useState<Data>({
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
            setTimeSlotsByWeekday(props.data);
        }
    }, []);

    function handleCheck(toggle: boolean, weekday: Weekday) {
        const clone = Object.assign({}, timeSlotsByWeekday);
        clone[weekday] = toggle ? [{ start_time: "", end_time: "" }] : [];
        setTimeSlotsByWeekday(clone);
        props.setData(clone);
    }

    function addTimeSlot(weekday: Weekday) {
        const clone = Object.assign({}, timeSlotsByWeekday);
        clone[weekday].push({
            start_time: "",
            end_time: "",
        });
        setTimeSlotsByWeekday(clone);
        props.setData(clone);
    }

    function removeTimeSlot(weekday: Weekday, index: number) {
        const clone = Object.assign({}, timeSlotsByWeekday);
        clone[weekday].splice(index, 1);
        setTimeSlotsByWeekday(clone);
        props.setData(clone);
    }

    function handleSelect(
        value: string,
        field: "start_time" | "end_time",
        weekday: Weekday,
        index: number
    ) {
        const clone = Object.assign({}, timeSlotsByWeekday);
        clone[weekday][index][field] = value;
        setTimeSlotsByWeekday(clone);
        props.setData(clone);
    }

    // Filtra as opções de horários disponíveis para o item atual, removendo os horários já selecionados nos itens anteriores do mesmo dia da semana
    // - weekday: O dia da semana ao qual os horários se referem.
    // - index: O índice do item atual na lista de seleção para o dia da semana.
    // - time_list_aux: Uma lista de horários disponíveis (timeList) para o item atual, excluindo os intervalos já selecionados nos itens anteriores.
    function getTimeList(weekday: Weekday, index: number) {
        if (index === 0) {
            return timeList;
        }

        // Obtenha o end_time do item anterior ao atual
        const previous_end_time =
            timeSlotsByWeekday[weekday][index - 1].end_time;

        // Crie uma cópia de timeList
        let time_list_aux = [...timeList];

        // Encontre o índice do end_time do item anterior
        const start_index = time_list_aux.indexOf(previous_end_time);

        // Se encontrar o end_time, retorne a "sobra", excluindo o previous_end_time
        if (start_index !== -1) {
            return time_list_aux.slice(start_index + 1); // Exclui o previous_end_time
        }

        return time_list_aux; // Caso não encontre o end_time, retorne a lista completa
    }

    return (
        <div className="w-1/3 space-y-4">
            {weekdays.map((weekday: Weekday) => (
                <div className="space-y-4" key={weekday}>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id={weekday}
                            value={weekday}
                            checked={
                                timeSlotsByWeekday[weekday as Weekday].length >
                                0
                            }
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
                    {timeSlotsByWeekday[weekday].length > 0 && (
                        <div className="space-y-2 py-2">
                            {timeSlotsByWeekday[weekday].map(
                                (time_slot, index) => (
                                    <div key={index}>
                                        <div className="flex space-x-2">
                                            <Select
                                                onValueChange={(v) =>
                                                    handleSelect(
                                                        v,
                                                        "start_time",
                                                        weekday,
                                                        index
                                                    )
                                                }
                                                value={time_slot.start_time}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="De" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {getTimeList(
                                                            weekday,
                                                            index
                                                        ).map((item) => (
                                                            <SelectItem
                                                                value={item}
                                                            >
                                                                {item}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            <Select
                                                onValueChange={(v) =>
                                                    handleSelect(
                                                        v,
                                                        "end_time",
                                                        weekday,
                                                        index
                                                    )
                                                }
                                                value={time_slot.end_time}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Até" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {getTimeList(
                                                            weekday,
                                                            index
                                                        ).map((item) => (
                                                            <SelectItem
                                                                value={item}
                                                            >
                                                                {item}
                                                            </SelectItem>
                                                        ))}
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
                                                                        addTimeSlot(
                                                                            weekday
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
