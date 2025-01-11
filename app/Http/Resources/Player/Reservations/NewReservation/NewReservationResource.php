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
        $classname = get_class($this->resource);

        return [
            "clubId" => $classname === "App\Models\Club" ? $this->id : $this->club->id,
            "name" => $this->name,
            "description" => $this->description,
            "slug" => $this->slug,
            "geolocalization" => $this->geolocalization,
            "sports" => $classname === "App\Models\Club" ? $this->sports : [$this->sport],
            "images" => $this->images
        ];
    }
}
