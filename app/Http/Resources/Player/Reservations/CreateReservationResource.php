<?php

namespace App\Http\Resources\Player\Reservations;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class CreateReservationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = parent::toArray($request);

        $data["name"] = $this->user->name;
        $data["image"] = Storage::url($this->images . "/image1.jpg");
        $data["sports"] = explode(",", $this->sports);


        return $data;
    }
}
