import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const breadCrumb = [
    { name: "Clientes", href: "/club/clients" },
    { name: "Criar" },
];

export default function CreateClient() {
    return (
        <AuthenticatedLayout breadCrumb={breadCrumb}>
            CREATE CLIENT
        </AuthenticatedLayout>
    );
}
