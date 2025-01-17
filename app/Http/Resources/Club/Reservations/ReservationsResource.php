<?php

namespace App\Http\Resources\Club\Reservations;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReservationsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = parent::toArray($request);

        $data["time_slots"] = $this->courtTimeSlots();

        return $data;
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

        return $time_slots;

    }
}
