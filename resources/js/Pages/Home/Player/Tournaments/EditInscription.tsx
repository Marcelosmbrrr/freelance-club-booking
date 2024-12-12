import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const breadCrumb = [
    { name: "Inscrições", href: "/player/tournaments" },
    { name: "Editar" },
];

export default function EditInscription() {
    return (
        <AuthenticatedLayout breadCrumb={breadCrumb}>
            EDITAR INSCRIÇÃO
        </AuthenticatedLayout>
    );
}
