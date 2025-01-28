<?php

namespace App\Http\Resources\Club\Reservations;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class ReservationsResource extends JsonResource
{
    public function __construct($resource)
    {
        parent::__construct($resource);
        self::withoutWrapping();
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $timeSlots = $this->courtTimeSlots->pluck('timeSlot');

        $startTime = $timeSlots->first()->start_time;

        $endTime = $timeSlots->last()->end_time;

        $start = Carbon::parse($startTime);
        $end = Carbon::parse($endTime);
        $duration = (int) $start->diffInMinutes($end) / 30;

        return [
            'id' => $this->id,
            'price' => $this->price,
            'date' => $this->date,
            'start_time' => $startTime,
            'end_time' => $endTime,
            'duration' => $duration,
            'status' => $this->status,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'creator_name' => $this->player->user->name, 
            'promotion' => '',
            'court' => [
                'id' => $this->court->id,
                'name' => $this->court->name
            ],
            "players" => []
        ];
    }
}
