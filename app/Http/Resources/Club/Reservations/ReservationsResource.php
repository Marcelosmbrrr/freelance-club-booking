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

        $data["date"] = Carbon::parse($this->date)->format("d/m/Y");
        $data["time_slots"] = $this->timeSlots();

        return $data;
    }

    function timeSlots() {

        $time_slots = [];

        foreach($this->courtTimeSlot as $index => $courtTimeSlot){
            $time_slots[$index] = [
                "id" => $courtTimeSlot->timeSlot->id,
                "time" => $courtTimeSlot->timeSlot->time
            ];
        }  

        return $time_slots;

    }
}
