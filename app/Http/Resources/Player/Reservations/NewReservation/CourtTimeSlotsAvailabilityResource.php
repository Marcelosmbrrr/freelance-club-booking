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
    // Recupera todos os time slots da quadra e as reservas para a data específica
    $courtTimeSlots = $this->timeSlots;
    $reservations = $this->reservations;

    // Inicializa um array para armazenar os time slots com disponibilidade
    $timeSlotsWithAvailability = [];

    // Verifica a disponibilidade de cada time slot
    foreach ($courtTimeSlots as $timeSlot) {
        // Inicializa a disponibilidade como "não disponível"
        $availabilityStatus = 'unavailable';
        $vacancies = [];
        $totalPlayers = null;

        // 1. Verifica se o time slot não tem nenhuma reserva associada (disponível)
        $isAvailable = $reservations->every(function ($reservation) use ($timeSlot) {
            return !$reservation->courtTimeSlots->contains('id', $timeSlot->id);
        });

        if ($isAvailable) {
            // Se não houver reserva, o time slot está disponível
            $availabilityStatus = 'available';
        } else {
            // 2. Verifica time slots públicos com vagas (status pending e is_public true)
            $hasVacancy = $reservations->filter(function ($reservation) use ($timeSlot, &$vacancies) {
                // Verifica se a reserva está associada ao time slot
                if ($reservation->courtTimeSlots->contains('id', $timeSlot->id) && $reservation->status === 'pending' && $reservation->is_public) {
                    
                    // Coleta todas as vagas (preenchidas ou não) com o status 'filled'
                    $slots = $reservation->playerSlots->map(function ($slot) {
                        return [
                            'position' => $slot->position,
                            'filled' => !is_null($slot->player_id),
                        ];
                    });

                    if ($slots->isNotEmpty()) {
                        // Adiciona todas as vagas ao array
                        $vacancies = array_merge($vacancies, $slots->toArray());
                    }

                    return true;
                }

                return false;
            })->isNotEmpty();

            // Se o time slot tem vagas abertas, ele está disponível com vagas
            if ($hasVacancy) {
                $availabilityStatus = 'available vacancy';
            }
        }

        // Adiciona o time slot com o campo de disponibilidade
        $timeSlotsWithAvailability[] = [
            'id' => $timeSlot->id,
            'label' => $timeSlot->start_time . "-" . $timeSlot->end_time, 
            'start_time' => $timeSlot->start_time,
            'end_time' => $timeSlot->end_time,
            'status' => $availabilityStatus, 
            'vacancies' => $vacancies, // Lista completa de vagas com filled true/false
        ];
    }

    return $timeSlotsWithAvailability;
}

}
