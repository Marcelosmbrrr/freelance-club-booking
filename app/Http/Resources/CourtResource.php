<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class CourtResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = parent::toArray($request);

        $data['images'] = $this->courtImages();

        return $data;
    }

    function courtImages() {

        $files = Storage::files($this->image_folder);

        $images = [];

        if (count($files) === 0) {
            $images = [];
        } 

        return $images;
        
    }
}
