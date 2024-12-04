import { Link } from "@inertiajs/react";

import { SidebarContent } from "@/components/ui/sidebar";

import { PieChart, SquareTerminal, ChevronRight } from "lucide-react";

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
        url: "/player/dashboard",
        icon: PieChart,
        items: null,
    },
    {
        title: "Reservas",
        url: "#",
        icon: SquareTerminal,
        isActive: true,
        items: [
            {
                title: "Criar Reserva",
                url: "/player/reservations/create",
            },
            {
                title: "Minhas Reservas",
                url: "/player/reservations",
            },
        ],
    },
    {
        title: "Torneios",
        url: "#",
        icon: SquareTerminal,
        isActive: true,
        items: [
            {
                title: "Criar Inscrição",
                url: "/player/tournaments/create",
            },
            {
                title: "Inscrições",
                url: "/player/tournaments/inscriptions",
            },
        ],
    },
    {
        title: "Pagamentos",
        url: "#",
        icon: SquareTerminal,
        isActive: true,
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
        url: "/player/account",
        icon: PieChart,
        items: null,
    },
];

export function NavPlayer() {
    return (
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel>Sistema</SidebarGroupLabel>
                <SidebarMenu>
                    {navMain.map((item) =>
                        item.items && item.items.length > 0 ? (
                            <Collapsible
                                key={item.title}
                                asChild
                                defaultOpen={item.isActive}
                                className="group/collapsible"
                            >
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton tooltip={item.title}>
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
                                                            href={subItem.url}
                                                        >
                                                            <span>
                                                                {subItem.title}
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
                                <SidebarMenuButton tooltip={item.title} asChild>
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
