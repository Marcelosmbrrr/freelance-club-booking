import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const breadCrumb = [
    { name: "Inscrições", href: "/player/tournaments" },
    { name: "Ver" },
];

export default function ShowInscription() {
    return (
        <AuthenticatedLayout breadCrumb={breadCrumb}>
            VER INSCRIÇÃO
        </AuthenticatedLayout>
    );
}
