export type Weekday =
    | "sunday"
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday";

export type TimeSlot = {
    [key in Weekday]: { start_time: string; end_time: string }[];
};

export interface CreateEditCourtSchema {
    name: string;
    sport: string;
    description: string;
    time_slots: TimeSlot;
    grass_type: string;
    floor_type: string;
    type: string;
    can_play_outside: boolean;
    installation_year: string;
    manufacturer: string;
    is_covered: boolean;
    status: boolean;
    images: string[];
    sponsor_image: string[];
}
