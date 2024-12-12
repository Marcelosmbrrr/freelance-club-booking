import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const breadCrumb = [
    { name: "Clientes", href: "/club/clients" },
    { name: "Editar" },
];

export default function EditClient() {
    return (
        <AuthenticatedLayout breadCrumb={breadCrumb}>
            EDIT CLIENT
        </AuthenticatedLayout>
    );
}
