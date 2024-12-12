import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const breadCrumb = [
    { name: "Clientes", href: "/club/clients" },
    { name: "Ver" },
];

export default function ShowClient() {
    return (
        <AuthenticatedLayout breadCrumb={breadCrumb}>
            SHOW CLIENT
        </AuthenticatedLayout>
    );
}
