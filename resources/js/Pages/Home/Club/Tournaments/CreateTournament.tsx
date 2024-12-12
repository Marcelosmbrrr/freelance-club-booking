import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const breadCrumb = [
    { name: "Torneios", href: "/club/tournaments" },
    { name: "Criar" },
];

export default function CreateTournament() {
    return (
        <AuthenticatedLayout breadCrumb={breadCrumb}>
            CRIAR TORNEIO
        </AuthenticatedLayout>
    );
}
