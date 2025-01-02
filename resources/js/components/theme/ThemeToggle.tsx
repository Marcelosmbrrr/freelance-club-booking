"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle(props: { colorToggle?: boolean }) {
    const { setTheme, theme, resolvedTheme } = useTheme();
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    const handleThemeChange = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    const sunClassName = props.colorToggle
        ? "text-black dark:text-white"
        : "text-white dark:text-white";

    const moonClassName = props.colorToggle
        ? "text-black dark:text-white"
        : "text-white dark:text-white";

    return (
        <Button
            variant="ghost"
            className="hover:bg-white/20"
            onClick={handleThemeChange}
        >
            {theme === "dark" || resolvedTheme === "dark" ? (
                <Moon className={"size-8 " + moonClassName} />
            ) : (
                <Sun className={"size-8 " + sunClassName} />
            )}
        </Button>
    );
}
