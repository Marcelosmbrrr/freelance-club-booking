import React from "react";
import { ReservationDrawer } from "./ReservationDrawer";

type Reservation = {
    id: number;
    price: number;
    date: string;
    start_time: string;
    end_time: string;
    duration: number;
    status: string;
    created_at: string;
    updated_at: string;
    creator_name: string;
};

type ReservationsByCourt = {
    [court: string]: Reservation[];
};

export const Scheduler = (props: { reservations: ReservationsByCourt }) => {
    const generateTimeSlots = () => {
        const timeSlots = [];
        for (let hour = 6; hour <= 24; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const time = `${hour.toString().padStart(2, "0")}:${minute
                    .toString()
                    .padStart(2, "0")}`;
                timeSlots.push(time);
            }
        }
        return timeSlots;
    };

    const timeSlots = generateTimeSlots();

    const calculateEndTime = (startTime: string, duration: number) => {
        const [hour, minute] = startTime.split(":").map(Number);
        const totalMinutes = hour * 60 + minute + duration * 30;
        const endHour = Math.floor(totalMinutes / 60) % 24;
        const endMinute = totalMinutes % 60;
        return `${endHour.toString().padStart(2, "0")}:${endMinute
            .toString()
            .padStart(2, "0")}`;
    };

    return (
        <div className="flex flex-col font-sans">
            <div className="flex">
                <div className="w-20 border-b"></div>
                {Object.keys(props.reservations).map((court, courtIndex) => (
                    <div
                        key={courtIndex}
                        className="flex-1 flex items-center justify-center font-bold border-b h-12"
                    >
                        {court}
                    </div>
                ))}
            </div>

            <div className="flex">
                <div className="w-20">
                    {timeSlots.map((time, index) => {
                        const isNextHalfHour =
                            timeSlots[index + 1]?.includes("30");

                        return (
                            <div
                                key={index}
                                className={`h-12 flex items-center justify-center ${
                                    isNextHalfHour ? "" : "border-b"
                                }`}
                            >
                                {time.includes("30") ? "" : time}
                            </div>
                        );
                    })}
                </div>

                <div className="flex flex-grow">
                    {Object.keys(props.reservations).map(
                        (court, courtIndex) => (
                            <div key={courtIndex} className="flex-1 border-l">
                                {timeSlots.map((time, timeIndex) => {
                                    const reservation = props.reservations[
                                        court
                                    ].find((res) => res.start_time === time);

                                    if (reservation) {
                                        const endTime = calculateEndTime(
                                            reservation.start_time,
                                            reservation.duration
                                        );
                                        return (
                                            <ReservationDrawer
                                                key={reservation.id}
                                                reservation={reservation}
                                            >
                                                <div
                                                    className="flex flex-col justify-center p-2 bg-gradient-to-r bg-neutral-800 dark:bg-white rounded-lg cursor-pointer shadow-md hover:scale-[102%] transition-all duration-200"
                                                    style={{
                                                        height: `${
                                                            reservation.duration *
                                                            3
                                                        }rem`,
                                                    }}
                                                >
                                                    <div className="text-sm font-semibold text-white dark:text-neutral-800">
                                                        {
                                                            reservation.creator_name
                                                        }
                                                    </div>
                                                    <div className="text-xs text-gray-400">
                                                        {reservation.start_time}{" "}
                                                        - {endTime}
                                                    </div>
                                                    <div
                                                        className={`text-xs font-semibold ${
                                                            reservation.status ===
                                                            "Confirmado"
                                                                ? "text-green-600"
                                                                : reservation.status ===
                                                                  "Aguardando Pagamento"
                                                                ? "text-yellow-600"
                                                                : "text-blue-600"
                                                        }`}
                                                    >
                                                        {reservation.status}
                                                    </div>
                                                </div>
                                            </ReservationDrawer>
                                        );
                                    }

                                    return (
                                        <div
                                            key={timeIndex}
                                            className="h-12 border-b"
                                        />
                                    );
                                })}
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};
