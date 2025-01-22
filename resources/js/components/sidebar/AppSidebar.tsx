import * as React from "react";
import { usePage } from "@inertiajs/react";

import { NavAdmin } from "./admin/NavAdmin";
import { NavPlayer } from "./player/NavPlayer";
import { NavClub } from "./club/NavClub";
import { NavUser } from "./NavUser";

import { SidebarMenuButton } from "@/components/ui/sidebar";
import { Volleyball } from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";

const app: { [key: string]: string } = {
    admin: "Admin",
    player: "Jogador",
    club: "Clube"
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const user = usePage().props.auth.user;

    return (
        <Sidebar collapsible="icon" {...props}>
            {/* Header - Logo */}
            <SidebarHeader>
                <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                    <div className="flex items-center gap-2">
                        <Volleyball className="size-8" />
                        <span className="text-xl font-bold">
                            App - {app[user.role]}
                        </span>
                    </div>
                </SidebarMenuButton>
            </SidebarHeader>
            {/* Middle - Content */}
            <SidebarContent>
                {user.role === "admin" && <NavAdmin />}
                {user.role === "player" && <NavPlayer />}
                {user.role === "club" && <NavClub />}
            </SidebarContent>
            {/* Bottom - User */}
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
