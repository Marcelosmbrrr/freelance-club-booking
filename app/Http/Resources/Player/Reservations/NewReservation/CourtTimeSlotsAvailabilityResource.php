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
        $courtTimeSlots = $this->timeSlots;
        $reservations = $this->reservations;

        $timeSlotsWithAvailability = [];

        $groupedTimeSlots = $this->groupTimeSlotsByReservation($courtTimeSlots, $reservations);

        foreach ($groupedTimeSlots as $group) {
            $timeSlotsWithAvailability[] = $this->createTimeSlotGroup($group);
        }

        return $timeSlotsWithAvailability;
    }

    /**
     * Agrupa os time slots por reserva.
     *
     * @param Collection $courtTimeSlots
     * @param Collection $reservations
     * @return array
     */
    private function groupTimeSlotsByReservation($courtTimeSlots, $reservations): array
    {
        $groupedTimeSlots = [];

        foreach ($courtTimeSlots as $timeSlot) {
            // Verifica se o time slot está associado a uma reserva
            $reservation = $reservations->first(function ($reservation) use ($timeSlot) {
                return $reservation->courtTimeSlots->contains('id', $timeSlot->id);
            });

            if ($reservation) {
                // Se o time slot estiver associado a uma reserva, agrupa por reserva
                $reservationId = $reservation->id;
                if (!isset($groupedTimeSlots[$reservationId])) {
                    $groupedTimeSlots[$reservationId] = [
                        'reservation' => $reservation,
                        'timeSlots' => [],
                    ];
                }
                $groupedTimeSlots[$reservationId]['timeSlots'][] = $timeSlot;
            } else {
                // Se o time slot não estiver associado a uma reserva, trata como disponível
                $groupedTimeSlots[] = [
                    'reservation' => null,
                    'timeSlots' => [$timeSlot],
                ];
            }
        }

        return $groupedTimeSlots;
    }

    /**
     * Cria um grupo de time slots para exibição.
     *
     * @param array $group
     * @return array
     */
    private function createTimeSlotGroup($group): array
    {
        $timeSlots = $group['timeSlots'];
        $reservation = $group['reservation'];

        // Determina o status e as vagas
        $availabilityStatus = 'available';
        $vacancies = [];

        if ($reservation) {
            if ($reservation->status === 'pending' && $reservation->is_public) {
                $availabilityStatus = 'available vacancy';
                // Coleta todas as vagas (preenchidas ou não) com o status 'filled'
                $vacancies = $reservation->playerSlots->map(function ($player_slot) use ($reservation) {
                    // Determina o time com base na posição e no total de players
                    $team = $this->determineTeam($player_slot->position, $reservation->total_players);

                    return [
                        'position' => $player_slot->position,
                        'team' => $team, // Adiciona o time ao array de vagas
                        'player' => is_null($player_slot->player_id) ? [] : [
                            'name' => $player_slot->player->user->name,
                            'image' => $player_slot->player->avatar_image,
                            'best_hand' => $player_slot->player->best_hand,
                            'match_type' => $player_slot->player->match_type,
                            'sex' => $player_slot->player->sex,
                            'description' => $player_slot->player->description,
                            'created_at' => $player_slot->player->user->created_at
                        ],
                        'filled' => !is_null($player_slot->player_id),
                    ];
                })->toArray();
            } else {
                $availabilityStatus = 'unavailable';
            }
        }

        // Determina o start_time e end_time do grupo
        $startTime = $timeSlots[0]->start_time;
        $endTime = end($timeSlots)->end_time;

        return [
            'id' => $timeSlots[0]->id,
            'label' => $startTime . "-" . $endTime,
            'start_time' => $startTime,
            'end_time' => $endTime,
            'status' => $availabilityStatus,
            'vacancies' => $vacancies,
        ];
    }

    /**
     * Determina o time com base na posição e no total de players.
     *
     * @param int $position
     * @param int $totalPlayers
     * @return string
     */
    private function determineTeam(int $position, int $totalPlayers): string
    {
        if ($totalPlayers == 2) {
            return $position == 1 ? 'A' : 'B';
        } elseif ($totalPlayers == 4) {
            return $position <= 2 ? 'A' : 'B';
        }

        // Caso o número de players não seja 2 ou 4, você pode retornar um valor padrão ou lançar uma exceção
        return 'Unknown';
    }
}
