"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Switch } from "@/components/ui/switch";

export function ThemeToggle() {
    const { setTheme, theme, resolvedTheme } = useTheme();
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
        // Garante que o componente só renderize após ser montado no cliente
        setIsMounted(true);
    }, []);

    // Evita renderizar antes de o tema estar disponível
    if (!isMounted) return null;

    const handleThemeChange = (checked: boolean) => {
        setTheme(checked ? "dark" : "light");
    };

    return (
        <div className="flex items-center space-x-2">
            <Switch
                id="theme-toggle"
                checked={theme === "dark" || resolvedTheme === "dark"}
                onCheckedChange={handleThemeChange}
            />
            <div className="flex space-x-2">
                {theme === "dark" || resolvedTheme === "dark" ? (
                    <Moon className="h-5 w-5 text-gray-800 dark:text-gray-200" />
                ) : (
                    <Sun className="h-5 w-5 text-yellow-400" />
                )}
            </div>
        </div>
    );
}
