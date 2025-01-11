<?php

namespace App\Http\Resources\Player\Reservations\MyReservations;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MyReservationsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "club" => [
                "name" => $this->club->name,
                "geolocalization" => $this->club->geolocalization,
                "images" => $this->club->images
            ],
            "court" => [
                "name" => $this->court->name,
                "images" => $this->court->images,
                "price" => $this->court->price
            ],
            "sport" => $this->court->sport,
            "status" => $this->status,
            "total_players" => $this->total_players,
            "is_public" => $this->is_public
        ];
    }
}
