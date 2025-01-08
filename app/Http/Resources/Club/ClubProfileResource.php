<?php

namespace App\Http\Resources\Club;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ClubProfileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = parent::toArray($request);

        $data["club"] = [
            'cnpj' => $this->club->cnpj,
            'trading_name' => $this->club->trading_name,
            'phonenumber' => $this->club->phonenumber,
            'zip_code' => $this->club->zip_code ?? null,
            'address' => $this->club->address ?? null,
            'city' => $this->club->city,
            'state' => $this->club->state,
            'description' => $this->club->description ?? null,
            'images' => $this->club->images ?? null,
            'slug' => $this->club->slug,
            'instagram' => $this->club->instagram ?? null,
            'facebook' => $this->club->facebook ?? null,
            'whatsapp' => $this->club->whatsapp ?? null,
            'geolocalization' => $this->club->geolocalization ?? null,
        ];

        return $data;
    }
}
