import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const breadCrumb = [
    { name: "Minhas Reservas", href: "/player/reservations" },
    { name: "Editar" },
];

export default function EditReservation() {
    return (
        <AuthenticatedLayout breadCrumb={breadCrumb}>
            EDITAR RESERVAS
        </AuthenticatedLayout>
    );
}
