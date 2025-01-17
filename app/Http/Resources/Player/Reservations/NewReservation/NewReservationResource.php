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

        $geolocation = explode(",", $this->geolocalization);

        return [
            "clubId" => $classname === "App\Models\Club" ? $this->id : $this->club->id,
            "courtId" => $classname === "App\Models\Club" ? null : $this->id,
            "min_price" => $this->min_price,
            "name" => $this->name,
            "description" => $this->description,
            "slug" => $this->slug,
            "geolocalization" => ["lat" => $geolocation[0], "lng" => $geolocation[1]],
            "sports" => $classname === "App\Models\Club" ? $this->sports : [$this->sport],
            "images" => $this->images,
            "sponsor_image" => $classname === "App\Models\Club" ? "" : $this->sponsor_image
        ];
    }
}
