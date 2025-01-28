import * as React from "react";

import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

type Pricing = {
    time: string;
    price: string;
};

const initialValue = [{ time: "", price: "" }];

const times = [
    { label: "60 minutos", value: "01:00" },
    { label: "90 minutos", value: "01:30" },
    { label: "120 minutos", value: "02:00" },
    { label: "180 minutos", value: "03:00" },
    { label: "210 minutos", value: "03:30" },
    { label: "240 minutos", value: "04:00" },
    { label: "270 minutos", value: "04:30" },
    { label: "300 minutos", value: "05:00" },
];

export function PricingSelector(props: {
    setData: Function;
    data?: Pricing[];
}) {
    const [items, setItems] = React.useState<Pricing[]>(initialValue);

    function addItem() {
        setItems([...items, { time: "", price: "" }]);
        props.setData([...items, { time: "", price: "" }]);
    }

    function removeItem(index: number) {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
        props.setData(updatedItems);
    }

    function isDisabled(time: string): boolean {
        return items.some((item) => item.time === time);
    }

    function updateItemTime(index: number, time: string) {
        const updatedItems = [...items];
        updatedItems[index].time = time;
        setItems(updatedItems);
        props.setData(updatedItems);
    }

    function updateItemPrice(index: number, value: string) {
        const updatedItems = [...items];
        updatedItems[index].price = value;
        setItems(updatedItems);
        props.setData(updatedItems);
    }

    return (
        <div className="w-full space-y-4">
            {items.map((item, index) => (
                <div key={index} className="flex space-x-2">
                    <div>
                        <Select
                            onValueChange={(value) =>
                                updateItemTime(index, value)
                            }
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue
                                    placeholder={
                                        item.time != ""
                                            ? item.time
                                            : "Preço por"
                                    }
                                />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {times.map((time) => (
                                        <SelectItem
                                            key={time.value}
                                            value={time.value}
                                            disabled={isDisabled(time.value)}
                                        >
                                            {time.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Input
                            type="number"
                            placeholder="Preço"
                            value={item.price}
                            onChange={(e) =>
                                updateItemPrice(index, e.target.value)
                            }
                        />
                    </div>
                    {index === 0 && (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        onClick={() => addItem()}
                                    >
                                        <Plus />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Adicionar Precificação</p>
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
                                        onClick={() => removeItem(index)}
                                    >
                                        <Trash2 />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Remover Precificação</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                </div>
            ))}
        </div>
    );
}
