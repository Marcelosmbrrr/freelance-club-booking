import { Head, usePage } from "@inertiajs/react";

import { Header } from "./_components/Header";
import { Hero } from "./_components/Hero";
import { CourtList } from "./_components/court-list/CourtList";

export default function ClubHomepage() {
    const { club }: any = usePage().props;
    return (
        <div>
            <Head title={club.data.user.name} />
            <Header />
            <Hero />
            <CourtList />
        </div>
    );
}
