import { Head } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const breadCrumb = [
    { name: "Clubes", href: "/admin/clubs" },
    { name: "Ver" }
];

export default function ShowRegisteredClub() {
    return (
        <AuthenticatedLayout breadCrumb={breadCrumb}>
            <Head title="Ver Clube" />
            SHOW REGISTERED CLUBS
        </AuthenticatedLayout>
    );
}
