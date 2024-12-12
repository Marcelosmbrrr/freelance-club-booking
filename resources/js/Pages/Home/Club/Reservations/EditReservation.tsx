import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const breadCrumb = [
    { name: "Reservas", href: "/club/reservations" },
    { name: "Editar" },
];

export default function EditReservation() {
    return <AuthenticatedLayout breadCrumb={breadCrumb}>EDIT CLIENT RESERVATION</AuthenticatedLayout>;
}
