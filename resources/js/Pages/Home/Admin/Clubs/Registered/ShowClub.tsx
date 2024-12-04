import { Head } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function ShowRegisteredClub() {
    return (
        <AuthenticatedLayout pageName="Ver Clube">
            <Head title="" />
            SHOW REGISTERED CLUBS
        </AuthenticatedLayout>
    );
}
