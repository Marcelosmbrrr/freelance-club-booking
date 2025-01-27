<?php

namespace App\Http\Resources\Player\Reservations\MyReservations;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ShowMyReservationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = parent::toArray($request);

        $data["time_slots"] = $this->courtTimeSlots();
        $data["payment"] = $this->calculatePayment();

        unset($data['court_time_slots']);

        return $data;
    }

    private function courtTimeSlots() {

        $time_slots = [];

        foreach($this->courtTimeSlots as $index => $timeSlot){
            $time_slots[$index] = [
                "id" => $timeSlot->timeSlot->id,
                "start_time" => $timeSlot->timeSlot->start_time,
                "end_time" => $timeSlot->timeSlot->end_time,
            ];
        }  

        return $time_slots;

    }

    private function calculatePayment(): array
    {
        $reservation_start_time = $this->courtTimeSlots->first()->timeSlot->start_time ?? null;
        $reservation_end_time = $this->courtTimeSlots->last()->timeSlot->end_time ?? null;

        if ($reservation_start_time && $reservation_end_time) {
            $promotion = $this->court->promotions
                ->where('weekday', strtolower($this->date->format('l')))
                ->filter(function ($promotion) use ($reservation_start_time, $reservation_end_time) {
                    return $promotion->start_time <= $reservation_start_time && $promotion->end_time >= $reservation_end_time;
                })
                ->first();
        }

        return [
            'start_time' => $reservation_start_time,
            'end_time' => $reservation_end_time,
            'promotion' => $promotion ? [
                'id' => $promotion->id,
                'discount' => $promotion->discount,
            ] : null
        ];
    }
}
