import { router, usePage } from "@inertiajs/react";

import { Club } from "../../Index";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Volleyball } from "lucide-react";

interface TabData {
    time_slots_by_weekday: any[];
}

export function AboutTab(props: { club: Club }) {
    function fetchData() {
        router.get(
            route("player.new-reservation.index", {
                clubId: props.club.id,
            }),
            {
                only: ["selected_club_about_tab"],
                preserveState: true,
            }
        );
    }

    return (
        <div>
            {/* Informações do clube */}
            <div className="my-4">
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">
                        Informações do Clube
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-4">
                        {props.club.sports.map((sport, index) => (
                            <div key={index} className="flex items-center">
                                <Volleyball className="size-4" />
                                <span className="ml-2 text-gray-600">
                                    {sport}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="text-gray-600 mt-4">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[140px]">
                                        Dia da Semana
                                    </TableHead>
                                    <TableHead className="text-right">
                                        Horário
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {[].map((time_slot) => (
                                    <TableRow key={time_slot.invoice}>
                                        <TableCell className="font-medium">
                                            {time_slot.invoice}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {time_slot.totalAmount}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>

            {/* Mapa */}
            <div className="my-4 sticky">
                <iframe
                    src={
                        props.club.geolocalization
                            ? `https://www.google.com/maps/embed/v1/place?key=AIzaSyBGkVceXOyvDwgH5mYQRyXYD7bzi6W7ygg&q=${props.club.geolocalization.lat},${props.club.geolocalization.lng}`
                            : `https://www.google.com/maps/embed/v1/place?key=AIzaSyBGkVceXOyvDwgH5mYQRyXYD7bzi6W7ygg&q=São+Paulo`
                    }
                    className="w-full h-[250px]"
                    frameBorder="0"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
}
