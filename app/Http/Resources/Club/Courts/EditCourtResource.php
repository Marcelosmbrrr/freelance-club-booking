<?php

namespace App\Http\Resources\Club\Courts;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class EditCourtResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = parent::toArray($request);

        $data['time_slots'] = $this->courtTimeSlots();

        return $data;
    }

    
    /**
     * Agrupa os horários disponíveis de uma quadra por dia da semana e retorna apenas os 
     * blocos contínuos de horários. Cada bloco contém o primeiro e o último horário antes 
     * de um intervalo. Essa resposta atende a estrutura de seleção de horários do frontend.
     * 
     * Um intervalo é definido como:
     * 1. Diferença de mais de 30 minutos entre o horário de término de um registro e o 
     *    horário de início do próximo.
     * 2. Diferença de ID maior que 1 entre registros consecutivos.
     * 
     * Exemplo:
     * Se os horários são:
     * - IDs 1 a 4 (06:30 - 08:30, sem intervalos)
     * - IDs 8 a 10 (10:00 - 11:00, após um intervalo)
     * - IDs 15 a 16 (13:30 - 14:30, após outro intervalo)
     * 
     * A saída será:
     * [
     *     'monday' => [
     *         ['start_time' => '06:30', 'end_time' => '08:30'],
     *         ['start_time' => '10:00', 'end_time' => '11:00'],
     *         ['start_time' => '13:30', 'end_time' => '14:30'],
     *     ],
     * ]
     * 
     * @return array Retorna os blocos contínuos de horários organizados por dia da semana.
     */
    function courtTimeSlots() {
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
            $filtered_slots = $slots
                ->where('available', true)
                ->sortBy('start_time');
    
            $day_slots = [];
            $block = [];
            $previous_end_time = null;
            $previous_id = null;
    
            foreach ($filtered_slots as $slot) {
                $start_time = $slot->start_time;
                $end_time = $slot->end_time;
    
                // Identificar intervalo (tempo > 30 minutos ou salto de ID > 1)
                if (
                    $previous_end_time &&
                    (
                        strtotime($start_time) - strtotime($previous_end_time) > 30 * 60 ||
                        $slot->id - $previous_id > 1
                    )
                ) {
                    // Salvar primeiro e último do bloco anterior
                    if (!empty($block)) {
                        $day_slots[] = [
                            'start_time' => $block[0]['start_time'],
                            'end_time' => $block[count($block) - 1]['end_time'],
                        ];
                    }
                    $block = []; // Resetar bloco
                }
    
                // Adicionar ao bloco atual
                $block[] = [
                    'id' => $slot->id,
                    'start_time' => $start_time,
                    'end_time' => $end_time,
                ];
    
                $previous_end_time = $end_time;
                $previous_id = $slot->id;
            }
    
            // Salvar o último bloco
            if (!empty($block)) {
                $day_slots[] = [
                    'start_time' => $block[0]['start_time'],
                    'end_time' => $block[count($block) - 1]['end_time'],
                ];
            }
    
            $time_slots_array[$weekday] = $day_slots;
        }
    
        return $time_slots_array;
    }       
}
