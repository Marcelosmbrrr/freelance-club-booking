import { Link, usePage } from "@inertiajs/react";

import { SidebarContent } from "@/components/ui/sidebar";

import { PieChart, ChevronRight, CalendarDays, Wallet, Trophy, CircleUser } from "lucide-react";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";

const navMain = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: PieChart,
        requiresVerification: false,
        items: null,
    },
    {
        title: "Reservas",
        url: "",
        icon: CalendarDays,
        requiresVerification: true,
        items: [
            {
                title: "Nova Reserva",
                url: "/player/reservations/create",
            },
            {
                title: "Reservas",
                url: "/player/reservations",
            },
        ],
    },
    {
        title: "Torneios",
        url: "#",
        icon: Trophy,
        requiresVerification: true,
        items: [
            {
                title: "Realizar inscrição",
                url: "/player/tournaments/create",
            },
            {
                title: "Inscrições",
                url: "/player/tournaments",
            },
        ],
    },
    {
        title: "Pagamentos",
        url: "#",
        icon: Wallet,
        requiresVerification: true,
        items: [
            {
                title: "Métodos de Pagamento",
                url: "/player/payments/methods",
            },
            {
                title: "Pagamentos Pendentes",
                url: "/player/payments/pending",
            },
            {
                title: "Histórico",
                url: "/player/payments/history",
            },
        ],
    },
    {
        title: "Minha Conta",
        url: "/player/profile",
        icon: CircleUser,
        requiresVerification: false,
        items: null,
    },
];

export function NavPlayer() {
    const user = usePage().props.auth.user;
    const isEmailVerified = Boolean(user.email_verified_at);

    return (
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel>Sistema</SidebarGroupLabel>
                <SidebarMenu>
                    {navMain
                        .filter(
                            (item) =>
                                isEmailVerified || !item.requiresVerification
                        )
                        .map((item) =>
                            item.items && item.items.length > 0 ? (
                                <Collapsible
                                    key={item.title}
                                    asChild
                                    defaultOpen={false}
                                    className="group/collapsible"
                                >
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton
                                                tooltip={item.title}
                                            >
                                                {item.icon && <item.icon />}
                                                <span>{item.title}</span>
                                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {item.items.map((subItem) => (
                                                    <SidebarMenuSubItem
                                                        key={subItem.title}
                                                    >
                                                        <SidebarMenuSubButton
                                                            asChild
                                                        >
                                                            <Link
                                                                href={
                                                                    subItem.url
                                                                }
                                                            >
                                                                <span>
                                                                    {
                                                                        subItem.title
                                                                    }
                                                                </span>
                                                            </Link>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                ))}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                            ) : (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        tooltip={item.title}
                                        asChild
                                    >
                                        <Link href={item.url}>
                                            {item.icon && <item.icon />}
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )
                        )}
                </SidebarMenu>
            </SidebarGroup>
        </SidebarContent>
    );
}
