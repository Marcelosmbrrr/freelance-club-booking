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

        $data['images'] = $this->courtImages("court");
        $data['sponsor_images'] = $this->courtImages("sponsor");

        return $data;
    }

    // Custom

    function courtImages(string $type) {

        $urls = [];

        if($type === "court") {
            $images = Storage::disk('public')->allFiles($this->images);
        } else {
            $images = Storage::disk('public')->allFiles($this->sponsor_images);
        }

        if (count($images) > 0) {
            $urls = array_map(fn($image) => Storage::url($image), $images);
        }

        return $urls;
    }
}
