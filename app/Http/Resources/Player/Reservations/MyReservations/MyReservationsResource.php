<?php

namespace App\Http\Resources\Player\Reservations\MyReservations;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MyReservationsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $court_time_slots_collection = $this->courtTimeSlots();

        return [
            "id" => $this->id,
            "court" => [
                "name" => $this->court->name,
                "image" => $this->court->images[0]
            ],
            "date" => $this->date,
            "time" => $court_time_slots_collection->first()["start_time"] . " - " . $court_time_slots_collection->last()["end_time"],
            "sport" => $this->court->sport,
            "status" => $this->status,
            "total_players" => $this->total_players,
            "is_public" => $this->is_public,
            "price" => $this->price
        ];
    }

    function courtTimeSlots() {

        $time_slots = [];

        foreach($this->courtTimeSlots as $index => $timeSlot){
            $time_slots[$index] = [
                "id" => $timeSlot->timeSlot->id,
                "start_time" => $timeSlot->timeSlot->start_time,
                "end_time" => $timeSlot->timeSlot->end_time,
            ];
        }  

        return collect($time_slots);

    }
}
