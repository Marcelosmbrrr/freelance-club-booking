"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface Framework {
    value: string;
    label: string;
}

interface ComboboxProps {
    options: Framework[];
    placeholder: string;
    name: string;
    id: string;
    value: string;
    setValue: (value: string) => void;
}

export function Combobox({
    options,
    placeholder,
    name,
    id,
    value,
    setValue,
}: ComboboxProps) {
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState<string>(value ?? "");

    function onSelect(newValue: string) {
        setSelectedValue(newValue);
        setValue(newValue);
        setOpen(false);
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    id={id}
                    name={name}
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {selectedValue
                        ? options.find((option) => option.value === selectedValue)
                              ?.label
                        : placeholder}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder={placeholder} className="h-9" />
                    <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    value={option.value}
                                    onSelect={onSelect}
                                >
                                    {option.label}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            value === option.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
