import { Head } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const breadCrumb = [
    { name: "Clubes", href: "/admin/clubs/create" },
    { name: "Criar" }
];

export default function CreateRegisteredClub() {
    return (
        <AuthenticatedLayout breadCrumb={breadCrumb}>
            <Head title="" />
            CREATE REGISTERED CLUB
        </AuthenticatedLayout>
    );
}
