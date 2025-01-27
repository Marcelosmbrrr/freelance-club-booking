import React from "react";

import { ReservationDrawer } from "./ReservationDrawer";

const courts = ["Quadra 1", "Quadra 2", "Quadra 3"];
const reservations = [
    {
        court: "Quadra 1",
        time: "10:00",
        duration: 2,
        creator: "João Silva",
        status: "Confirmado",
    },
    {
        court: "Quadra 2",
        time: "14:00",
        duration: 3,
        creator: "Maria Souza",
        status: "Aguardando Pagamento",
    },
    {
        court: "Quadra 3",
        time: "18:00",
        duration: 4,
        creator: "Carlos Oliveira",
        status: "Em andamento",
    },
];

export const Scheduler = () => {
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

    const calculateEndTime = (startTime, duration) => {
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
                {courts.map((court, courtIndex) => (
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
                    {courts.map((court, courtIndex) => (
                        <div key={courtIndex} className="flex-1 border-l">
                            {timeSlots.map((time, timeIndex) => {
                                const reservation = reservations.find(
                                    (res) =>
                                        res.court === court && res.time === time
                                );

                                if (reservation) {
                                    const endTime = calculateEndTime(
                                        reservation.time,
                                        reservation.duration
                                    );
                                    return (
                                        <ReservationDrawer reservation={reservation}>
                                            <div
                                                key={timeIndex}
                                                className="flex flex-col justify-center p-2 bg-gradient-to-r bg-neutral-800 dark:bg-white rounded-lg cursor-pointer shadow-md hover:scale-[102%] transition-all duration-200"
                                                style={{
                                                    height: `${
                                                        reservation.duration * 3
                                                    }rem`,
                                                }}
                                            >
                                                <div className="text-sm font-semibold text-white dark:text-neutral-800">
                                                    {reservation.creator}
                                                </div>
                                                <div className="text-xs text-gray-400">
                                                    {reservation.time} -{" "}
                                                    {endTime}
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
                    ))}
                </div>
            </div>
        </div>
    );
};
