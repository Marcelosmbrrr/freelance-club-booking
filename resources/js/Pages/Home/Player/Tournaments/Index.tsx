import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const breadCrumb = [{ name: "Inscrições" }];

export default function Inscriptions() {
    return (
        <AuthenticatedLayout breadCrumb={breadCrumb}>
            INSCRIÇÕES
        </AuthenticatedLayout>
    );
}
