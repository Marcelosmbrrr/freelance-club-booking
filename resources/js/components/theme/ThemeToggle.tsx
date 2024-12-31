"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
    const { setTheme, theme, resolvedTheme } = useTheme();
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    const handleThemeChange = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <Button
            variant="ghost"
            className="hover:bg-white/20"
            onClick={handleThemeChange}
        >
            {theme === "dark" || resolvedTheme === "dark" ? (
                <Moon className="size-8 text-white" />
            ) : (
                <Sun className="size-8 text-white" />
            )}
        </Button>
    );
}
