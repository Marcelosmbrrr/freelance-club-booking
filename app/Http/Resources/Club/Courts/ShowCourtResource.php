<?php

namespace App\Http\Resources\Club\Courts;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ShowCourtResource extends JsonResource
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

        $data["reservations"] = $this->reservationCourtTimeSlots();


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

    function reservationCourtTimeSlots() {

        $data = [];

        if($this->reservations) {
            foreach($this->reservations as $index => $reservation) {

                $player = [
                    "id" => $reservation->player->id,
                    "name" => $reservation->player->user->name,
                    "email" =>$reservation->player->user->email
                ];

                $time_slots = [];

                foreach($reservation->courtTimeSlot as $indexx => $courtTimeSlot){
                    $time_slots[$indexx] = [
                        "id" => $courtTimeSlot->timeSlot->id,
                        "time" => $courtTimeSlot->timeSlot->time
                    ];
                }   
                
                $data[$index] = [ 
                    "id" => $reservation->id,
                    "status" => $reservation->status,
                    "created_at" => Carbon::parse($reservation->created_at)->format('d/m/Y H:i'),
                    "player" => $player,
                    "time_slots" => $time_slots
                ];
            }
        }

        return $data;

    }
}
