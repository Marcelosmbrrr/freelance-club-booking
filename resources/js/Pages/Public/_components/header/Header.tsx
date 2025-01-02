"use client";

import * as React from "react";
import { router } from "@inertiajs/react";

import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { LanguageSelector } from "@/components/translator/LanguageSelector";

import { useHomePage } from "@/context/HomePageContext";
import { AppIcon } from "@/components/icons/AppIcon";

import { Menu, Store } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const menuOptions: string[] = ["begin", "features", "advantages", "pricing"];

const Header = () => {
    const { handleChangeHomePage, homePageType } = useHomePage();
    const [isScrolled, setIsScrolled] = React.useState(false);
    const { t } = useTranslation();

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
                <nav className="hidden lg:flex justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-white">
                            <AppIcon w="28" h="28" />
                            <span className="text-xl font-bold">App</span>
                        </div>
                        <div className="flex items-center">
                            {menuOptions.map((option, idx) => (
                                <Button
                                    key={idx}
                                    variant="ghost"
                                    className="hover:bg-transparent"
                                >
                                    <a
                                        href={`#${option}`}
                                        className="text-gray-300 hover:text-white"
                                    >
                                        {t(`welcome.${homePageType}.header.${option}`)}
                                    </a>
                                </Button>
                            ))}
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <Button
                            className="bg-white hover:bg-white text-neutral-800"
                            onClick={() => router.get("/login")}
                        >
                            {t("general.login")}
                        </Button>
                        <Button
                            onClick={handleChangeHomePage}
                            className="bg-amber-300 text-neutral-800 font-medium hover:bg-amber-200"
                        >
                            <Store />
                            {t(`welcome.${homePageType}.header.page-toggle`)}
                        </Button>
                        <ThemeToggle />
                        <LanguageSelector />
                    </div>
                </nav>
                {/* Menu Mobile */}
                <div className="block lg:hidden">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-white">
                            <AppIcon w="28" h="28" />
                            <span className="text-xl font-bold">App</span>
                        </div>
                        <div className="flex space-x-2">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button
                                        className="bg-white dark:bg-white border-none"
                                        variant="outline"
                                        size="icon"
                                    >
                                        <Menu className="size-4 text-neutral-900 dark:text-neutral-900" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent className="overflow-y-auto">
                                    <SheetHeader>
                                        <SheetTitle>
                                            <div className="flex items-center gap-2">
                                                <AppIcon w="28" h="28" />
                                                <span className="text-xl font-bold">
                                                    App
                                                </span>
                                            </div>
                                        </SheetTitle>
                                    </SheetHeader>
                                    <div className="my-8 flex flex-col gap-4">
                                        {menuOptions.map((option, idx) => (
                                            <a
                                                key={idx}
                                                href={`#${option}`}
                                                className="font-semibold"
                                            >
                                                {t(`welcome.${homePageType}.header.${option}`)}
                                            </a>
                                        ))}
                                    </div>
                                    <div className="border-t pt-4">
                                        <div className="mt-2 flex flex-col gap-3">
                                            <Button>
                                                {t(`welcome.player.header.mobile-login`)}
                                            </Button>
                                            <Button>
                                                {t(`welcome.club.header.mobile-login`)}
                                            </Button>
                                        </div>
                                    </div>
                                </SheetContent>
                            </Sheet>
                            <Button
                                onClick={handleChangeHomePage}
                                className="bg-amber-300 text-neutral-800 font-medium hover:bg-amber-200"
                            >
                                <Store />
                                {t(`welcome.${homePageType}.header.page-toggle`)}
                            </Button>
                            <ThemeToggle />
                            <LanguageSelector />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export { Header };
