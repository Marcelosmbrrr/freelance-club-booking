<?php

namespace App\Http\Resources\Shared;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ClubHomepageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = parent::toArray($request);

        $data["images"] = $this->clubImages();

        return $data;
    }

    function clubImages() {

        $urls = [];

        $images = Storage::disk('public')->allFiles($this->images);

        if (count($images) > 0) {
            $urls = array_map(fn($image) => Storage::url($image), $images);
        }

        return $urls;
    }
}
