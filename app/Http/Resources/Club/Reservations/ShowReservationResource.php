<?php

namespace App\Http\Resources\Club\Reservations;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ShowReservationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = parent::toArray($request);

        $time_slots = [];

        foreach($data["time_slots"] as $timeSlot) {
            $time_slots[] = $timeSlot["time_slot"];
        }

        $data["time_slots"] = $time_slots;

        return $data;
    }
}
