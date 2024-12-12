import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const breadCrumb = [
    { name: "Torneios", href: "/club/tournaments" },
    { name: "Ver" },
];

export default function ShowTournament() {
    return (
        <AuthenticatedLayout breadCrumb={breadCrumb}>
            MOSTRAR TORNEIO
        </AuthenticatedLayout>
    );
}
