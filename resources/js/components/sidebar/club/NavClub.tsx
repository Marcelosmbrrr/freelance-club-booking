import { Link, usePage } from "@inertiajs/react";

import { SidebarContent } from "@/components/ui/sidebar";

import {
    Map,
    PieChart,
    SquareTerminal,
    ChevronRight,
} from "lucide-react";

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
        url: "#",
        icon: PieChart,
        requiresVerification: false,
        items: null,
    },
    {
        title: "Clube",
        url: "#",
        icon: SquareTerminal,
        requiresVerification: true,
        items: [
            {
                title: "Quadras e Horários",
                url: "/club/courts",
            },
            {
                title: "Reservas",
                url: "/club/reservations",
            },
            {
                title: "Clientes",
                url: "/club/clients",
            },
        ],
    },
    {
        title: "Torneios",
        url: "/club/tournaments",
        icon: Map,
        requiresVerification: false,
        items: null,
    },
    {
        title: "Financeiro",
        url: "#",
        icon: SquareTerminal,
        requiresVerification: true,
        items: [
            {
                title: "Pagamentos",
                url: "#",
            },
            {
                title: "Contas Bancárias",
                url: "#",
            },
        ],
    },
    {
        title: "Minha Conta",
        url: "/club/profile",
        icon: PieChart,
        requiresVerification: false,
        items: null,
    }
];

export function NavClub() {
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
                                    defaultOpen={item.isActive}
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
