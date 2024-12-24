<?php

namespace App\Http\Resources\Player\Reservations\Create;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;
use App\Models\Court;

class CreateReservationForSelectedClubResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = parent::toArray($request);

        $data["name"] = $this->user->name;
        $data["images"] = Storage::url($this->images . "main.jpg");
        $data["sports"] = explode(",", $this->sports);

        foreach($this->courts as $index => $court) {
            $data["courts"][$index]["time_slots"] = $this->courtTimeSlots($court);
        }

        return $data;
    }

    function courtTimeSlots(Court $court) {
        $grouped_court_time_slots = $court->time_slots->groupBy('pivot.weekday');

        $time_slots_array = [
            'monday' => [],
            'tuesday' => [],
            'wednesday' => [],
            'thursday' => [],
            'friday' => [],
            'saturday' => [],
            'sunday' => [],
        ];

        foreach ($grouped_court_time_slots as $weekday => $slots) {
            
            $slots = $slots->map(function ($slot) {
                return [
                    'id' => $slot->id,
                    'start_time' => $slot->start_time,
                    'end_time' => $slot->end_time,
                ];
            });
    
            $time_slots_array[$weekday] = $slots->toArray();
        }

        return $time_slots_array;

    }
}
