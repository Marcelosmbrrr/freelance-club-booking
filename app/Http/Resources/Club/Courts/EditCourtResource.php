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

        $data['images'] = $this->courtImages();
        $data['time_slots'] = $this->courtTimeSlots();

        return $data;
    }

    // Custom

    function courtTimeSlots() {

        $grouped_court_time_slots = $this->time_slots->groupBy('weekday');

        $time_slots_array = [
            'monday' => [],
            'tuesday' => [],
            'wednesday' => [],
            'thursday' => [],
            'friday' => [],
            'saturday' => [],
            'sunday' => [],
        ];

        foreach ($grouped_court_time_slots as $weekday => $slots) {
            $time_slots_array[$weekday] = $slots->where('available', true)->pluck('id')->toArray();
        }

        return $time_slots_array;

    }

    function courtImages() {

        $urls = [];

        $images = Storage::disk('public')->allFiles($this->images);

        if (count($images) > 0) {
            $urls = array_map(fn($image) => Storage::url($image), $images);
        }

        return $urls;
    }
}
