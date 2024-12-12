import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const breadCrumb = [
    { name: "Inscrições", href: "/player/tournaments" },
    { name: "Criar" },
];

export default function CreateInscription() {
    return (
        <AuthenticatedLayout breadCrumb={breadCrumb}>
            CRIAR INSCRIÇÃO
        </AuthenticatedLayout>
    );
}
