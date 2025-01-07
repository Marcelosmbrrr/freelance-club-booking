import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const breadCrumb = [
    { name: "Minhas Reservas", href: "/player/reservations" },
    { name: "Ver" },
];

export default function ShowReservation() {
    return (
        <AuthenticatedLayout breadCrumb={breadCrumb}>
            MOSTRAR RESERVA
        </AuthenticatedLayout>
    );
}
