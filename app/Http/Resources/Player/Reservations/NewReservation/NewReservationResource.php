<?php

namespace App\Http\Resources\Player\Reservations\NewReservation;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NewReservationResource extends JsonResource
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
            "min_price" => $this->min_price,
            "name" => $this->name,
            "address" => $this->address,
            "description" => $this->description,
            "slug" => $this->slug,
            "geolocalization" => $this->geolocalization,
            "sports" => $this->sports,
            "images" => $this->images
        ];
    }
}
