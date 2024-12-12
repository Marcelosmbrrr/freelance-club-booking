import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const breadCrumb = [
    { name: "Torneios", href: "/club/tournaments" },
    { name: "Editar" },
];

export default function EditTournament() {
    return (
        <AuthenticatedLayout breadCrumb={breadCrumb}>
            EDITAR TORNEIO
        </AuthenticatedLayout>
    );
}
