<?php

namespace App\Http\Resources\Club\Reservations;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

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

        $data["time_slots"] = $this->timeSlots();

        return $data;
    }

    function timeSlots() {

        $time_slots = [];

        foreach($this->timeSlots as $index => $timeSlot){
            $time_slots[$index] = [
                "id" => $timeSlot->timeSlot->id,
                "start_time" => $timeSlot->timeSlot->start_time,
                "end_time" => $timeSlot->timeSlot->end_time,
            ];
        }  

        return $time_slots;

    }
}
