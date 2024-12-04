import { Head } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function CreateRegisteredClub() {
    return (
        <AuthenticatedLayout pageName="Criar Clube">
            <Head title="" />
            CREATE REGISTERED CLUB
        </AuthenticatedLayout>
    );
}
