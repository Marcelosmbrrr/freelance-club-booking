import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const breadCrumb = [{ name: "Torneios" }];

export default function Tournaments() {
    return (
        <AuthenticatedLayout breadCrumb={breadCrumb}>TORNEIOS</AuthenticatedLayout>
    );
}
