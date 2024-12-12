import { Head } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const breadCrumb = [
    { name: "Clubes", href: "/admin/clubs" },
    { name: "Editar" }
];

export default function EditRegisteredClub() {
    return (
        <AuthenticatedLayout breadCrumb={breadCrumb}>
            <Head title="Editar Clube" />
            EDIT REGISTERED CLUB
        </AuthenticatedLayout>
    );
}
