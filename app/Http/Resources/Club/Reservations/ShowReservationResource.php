<?php

namespace App\Http\Resources\Club\Reservations;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

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

        $data["date"] = Carbon::parse($this->date)->format('d/m/Y');

        $data['player'] = [
            'id' => $this->player->id,
            'name' => $this->player->user->name,
            'email' => $this->player->user->email,
            'phonenumber' => $this->player->user->phonenumber,
            'avatar' => $this->player->avatar,
            'birth_date' => $this->player->birth_date,
            'cpf' => $this->player->cpf
        ];

        $data['court'] = [
            'name' => $this->court->name,
            'sport' => $this->court->sport,
            'type' => $this->court->type,
            'images' => []
        ];

        $data['time_slots'] = $this->timeSlots();

        return $data;
    }

    function timeSlots() {

        $data = [];

        foreach($this->courtTimeSlot as $indexx => $courtTimeSlot){
            $data[$indexx] = [
                "id" => $courtTimeSlot->timeSlot->id,
                "time" => $courtTimeSlot->timeSlot->time
            ];
        }   

        return $data;

    }
}
