import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const breadCrumb = [
    { name: "Reservas", href: "/club/reservations" },
    { name: "Criar" },
];

export default function CreateReservation() {
    return <AuthenticatedLayout breadCrumb={breadCrumb}>CREATE RESERVATION FOR CLIENT</AuthenticatedLayout>;
}
