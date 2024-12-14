"use client";

import * as React from "react";

import { ThemeToggle } from "@/components/theme/ThemeToggle";

import { cn } from "@/lib/utils";

const Header = () => {
    const [isScrolled, setIsScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <section
            className={cn(
                "fixed py-4 px-2 lg:px-0 top-0 left-0 w-full z-50 transition-colors duration-300",
                isScrolled ? "bg-neutral-800 shadow-md" : "bg-transparent"
            )}
        >
            <div className="container mx-auto">
                {/* Menu Desktop */}
                <nav className="hidden lg:flex justify-end">
                    <ThemeToggle />
                </nav>
                {/* Menu Mobile */}
                <div className="block lg:hidden">
                    <div className="flex items-center justify-end">
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </section>
    );
};

export { Header };
