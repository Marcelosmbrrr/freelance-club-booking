import { PropsWithChildren, ReactNode } from "react";

import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { AppSidebar } from "@/components/sidebar/AppSidebar";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { router } from "@inertiajs/react";

type AuthenticatedProps = PropsWithChildren<{
    header?: ReactNode;
    breadCrumb: { name: string; href?: string }[];
}>;

export default function Authenticated({
    children,
    breadCrumb,
}: AuthenticatedProps) {
    function onClick(item: { name: string; href?: string }) {
        if (item.href) {
            router.get(item.href);
        }
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="#">
                                        Home
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                {breadCrumb.map((item, index) => (
                                    <>
                                        <BreadcrumbItem key={item.name}>
                                            {item.href ? (
                                                <BreadcrumbLink
                                                    href={item.href}
                                                    className="hover:underline"
                                                    onClick={() =>
                                                        onClick(item)
                                                    }
                                                >
                                                    {item.name}
                                                </BreadcrumbLink>
                                            ) : (
                                                <BreadcrumbPage>
                                                    {item.name}
                                                </BreadcrumbPage>
                                            )}
                                        </BreadcrumbItem>
                                        {index + 1 < breadCrumb.length && (
                                            <BreadcrumbSeparator className="hidden md:block" />
                                        )}
                                    </>
                                ))}
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <div className="px-4">
                        <ThemeToggle />
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="p-4 min-h-[100vh] flex-1 flex-col rounded-xl md:min-h-min">
                        {children}
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
