<?php

namespace App\Http\Resources\Player\Reservations;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;

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
        $data["court"]["image"] = Storage::url($this->images . "/image1.jpg"); 

        return $data;
    }

    function timeSlots() {

        $time_slots = [];

        foreach($this->courtTimeSlot as $index => $courtTimeSlot){
            $time_slots[$index] = [
                "id" => $courtTimeSlot->timeSlot->id,
                "start_time" => $courtTimeSlot->timeSlot->start_time,
                "end_time" => $courtTimeSlot->timeSlot->end_time,
            ];
        }  

        return $time_slots;

    }
}
