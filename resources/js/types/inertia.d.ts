import type { Page } from "@inertiajs/core";

interface AuthenticatedUser {
    id: string;
    name: string;
    role: string;
    authorization: {};
}

declare module "@inertiajs/core" {
    interface PageProps extends Page<PageProps> {
        auth: {
            user: AuthenticatedUser | null;
        }
    }
}
