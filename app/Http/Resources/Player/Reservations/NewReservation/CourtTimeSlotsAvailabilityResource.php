<?php

namespace App\Http\Resources\Player\Reservations\NewReservation;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CourtTimeSlotsAvailabilityResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = parent::toArray($request);

        $data["time_slots"] = $this->timeSlotsAvailability();

        dd($data);

        return $data;
    }

    public function timeSlotsAvailability() {

        // TIME SLOTS FECHADOS:
            // time slots das reservas com status confirmed
            // time slots das reservas pending e com campo is_public false

        // TIME SLOTS DE JOGOS COM VAGA
            // time slots das reservas com status pending, campo is_public e true e campo total_players maior que a quantidade de vagas preenchidas (relacionamentos "slots" com "player_id" preenchidos)

        // TIME SLOTS DISPONÍVEIS
            // time slots que não tem reserva nenhuma

        return [];

    }
}
