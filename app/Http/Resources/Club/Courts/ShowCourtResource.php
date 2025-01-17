<?php

namespace App\Http\Resources\Club\Courts;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class ShowCourtResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = parent::toArray($request);

        $data['time_slots'] = $this->courtTimeSlotsByWeekday();
        $data["reservations"] = $this->courtReservations();

        return $data;
    }

    function courtTimeSlotsByWeekday() {

        $grouped_court_time_slots = $this->timeSlots->groupBy('weekday');

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

            // Ordenar os horários
            $sorted_slots = $slots->sortBy('start_time');
    
            // Pegar o primeiro e o último horário
            $first_slot = $sorted_slots->first();
            $last_slot = $sorted_slots->last();
    
            $time_slots_array[$weekday] = [
                'start_time' => $first_slot ? $first_slot->start_time : null,
                'end_time' => $last_slot ? $last_slot->end_time : null,
            ];
        }

        return $time_slots_array;

    }

    function courtReservations() {

        $data = [];

        if($this->reservations) {
            foreach($this->reservations as $index => $reservation) {

                $player = [
                    "id" => $reservation->player->id,
                    "name" => $reservation->player->user->name,
                    "email" =>$reservation->player->user->email
                ];

                $time_slots = [];

                foreach($reservation->courtTimeSlots as $indexx => $courtTimeSlot){
                    $time_slots[$indexx] = [
                        "id" => $courtTimeSlot->timeSlot->id,
                        "start_time" => $courtTimeSlot->timeSlot->start_time,
                        "end_time" => $courtTimeSlot->timeSlot->end_time
                    ];
                }   
                
                $data[$index] = [ 
                    "id" => $reservation->id,
                    "status" => $reservation->status,
                    "created_at" => Carbon::parse($reservation->created_at)->format('d/m/Y H:i'),
                    "player" => $player,
                    "time_slots" => $time_slots
                ];
            }
        }

        return $data;

    }
}
