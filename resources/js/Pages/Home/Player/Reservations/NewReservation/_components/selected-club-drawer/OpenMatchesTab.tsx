import { router, usePage } from "@inertiajs/react";
import { Club } from "../../Index";

interface TabData {
    time_slots_by_weekday: any[];
    courts: { name: string; type: string; images: string[]; pricing: string[] };
}

export function OpenMatchesTab(props: { club: Club }) {
    function fetchData() {
        router.get(
            route("player.new-reservation.index", {
                clubId: props.club.id,
            }),
            {
                only: ["selected_club_open_matches_tab"],
                preserveState: true,
            }
        );
    }
    return <div>OpenMatches</div>;
}
