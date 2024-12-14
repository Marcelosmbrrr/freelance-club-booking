import { Head, usePage } from "@inertiajs/react";

import GuestLayout from "@/Layouts/GuestLayout";

import { Header } from "./_components/welcome/header/Header";
import { Hero } from "./_components/welcome/hero/Hero";

export default function Club() {
    const { club }: any = usePage().props;
    return (
        <GuestLayout>
            <Head title={club.data.user.name} />
            <div>
                <Header />
                <Hero />
            </div>
        </GuestLayout>
    );
}
