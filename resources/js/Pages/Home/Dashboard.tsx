import Authenticated from "@/Layouts/AuthenticatedLayout";

const breadCrumb = [{ name: "Dashboard" }];

export default function Dashboard() {
    return (
        <Authenticated breadCrumb={breadCrumb}>
            <div>DASHBOARD</div>
        </Authenticated>
    );
}
