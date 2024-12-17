export type Weekday =
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday";

export type TimeSlot = {
    [key in Weekday]: string[];
};

export type CreateEditCourtSchema = {
    name: string;
    sport: string;
    description: string;
    time_slots: TimeSlot;
    grass_type: string;
    structure_type: string;
    can_play_outside: boolean;
    installation_year: string;
    manufacturer: string;
    area_type: string;
    status: boolean;
    images: string[];
};
