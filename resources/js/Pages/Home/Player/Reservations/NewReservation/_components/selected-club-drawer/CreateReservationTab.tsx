import { router, usePage } from "@inertiajs/react";
import { Club } from "../../Index";

interface TabData {
    date: string;
    time: string;
    courts: any[];
}

export function CreateReservationTab(props: { club: Club }) {
    function fetchData() {
        router.get(
            route("player.new-reservation.index", {
                clubId: props.club.id,
            }),
            {
                only: ["selected_club_create_reservation_tab"],
                preserveState: true,
            }
        );
    }
    return <div>ReservationTab</div>;
}
