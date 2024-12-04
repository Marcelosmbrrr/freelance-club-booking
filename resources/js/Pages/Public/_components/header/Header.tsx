"use client";

import * as React from "react";
import { Link } from "@inertiajs/react";

import { ThemeToggle } from "@/components/theme/ThemeToggle";

import { useHomePage } from "@/context/HomePageContext";
import { AppIcon } from "@/components/icons/AppIcon";

import { Menu, User, Store } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const menuOptions: { name: string; href: string }[] = [
    { name: "Início", href: "begin" },
    { name: "Funcionalidades", href: "features" },
    { name: "Vantagens", href: "advantages" },
    { name: "Planos", href: "pricing" },
];

const selectItems = [
    {
        title: "Acesso de Jogador",
        description: "Aplicativo para jogadores",
        icon: <User className="size-5 shrink-0" />,
        href: "player/login",
    },
    {
        title: "Acesso de Clube",
        description: "Aplicativo para clubes",
        icon: <Store className="size-5 shrink-0" />,
        href: "club/login",
    },
];

const data = {
    player: {
        button: "Sou Clube",
    },
    club: {
        button: "Sou Jogador",
    },
};

const Header = () => {
    const { handleChangeHomePage, homePageType } = useHomePage();
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
                <nav className="hidden lg:flex justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-white">
                            <AppIcon w="28" h="28" />
                            <span className="text-xl font-bold">App</span>
                        </div>
                        <div className="flex items-center">
                            {menuOptions.map((option, idx) => (
                                <a
                                    key={idx}
                                    href={`#${option.href}`}
                                    className={cn(
                                        "text-muted-foreground text-gray-300",
                                        navigationMenuTriggerStyle,
                                        buttonVariants({ variant: "ghost" })
                                    )}
                                >
                                    {option.name}
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem className="text-muted-foreground text-black">
                                    <NavigationMenuTrigger
                                        className={cn(
                                            "text-gray-900 bg-white hover:bg-gray-200 focus:ring-2 focus:ring-gray-400",
                                            "dark:text-gray-900 dark:bg-white dark:hover:bg-neutral-400 dark:focus:ring-gray-400"
                                        )}
                                    >
                                        <span>Acessar</span>
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="w-80 p-3">
                                            {selectItems.map((item, idx) => (
                                                <li key={idx}>
                                                    <Link
                                                        href={item.href}
                                                        className={cn(
                                                            "flex select-none gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                                        )}
                                                    >
                                                        {item.icon}
                                                        <div>
                                                            <div className="text-sm font-semibold">
                                                                {item.title}
                                                            </div>
                                                            <p className="text-sm leading-snug text-muted-foreground">
                                                                {
                                                                    item.description
                                                                }
                                                            </p>
                                                        </div>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                        <Button
                            onClick={handleChangeHomePage}
                            className="bg-amber-300 text-neutral-800 font-medium hover:bg-amber-200"
                        >
                            <Store />
                            {data[homePageType].button}
                        </Button>
                        <ThemeToggle />
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
                                    <Button variant="outline" size="icon">
                                        <Menu className="size-4" />
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
                                                href={`#${option.href}`}
                                                className="font-semibold"
                                            >
                                                {option.name}
                                            </a>
                                        ))}
                                    </div>
                                    <div className="border-t pt-4">
                                        <div className="mt-2 flex flex-col gap-3">
                                            {selectItems.map((item, idx) => (
                                                <Button key={idx}>
                                                    {item.title}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                </SheetContent>
                            </Sheet>
                            <Button
                                onClick={handleChangeHomePage}
                                className="bg-amber-300 text-neutral-800 font-medium hover:bg-amber-200"
                            >
                                <Store />
                                {data[homePageType].button}
                            </Button>
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export { Header };
