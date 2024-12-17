import { Head } from "@inertiajs/react";

import Authenticated from "@/Layouts/AuthenticatedLayout";

const breadCrumb = [{ name: "Dashboard" }];

export default function Dashboard() {
    return (
        <Authenticated breadCrumb={breadCrumb}>
            <Head title="Dashboard" />
            <div>DASHBOARD</div>
        </Authenticated>
    );
}
