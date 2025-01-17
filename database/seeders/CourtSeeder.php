<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use App\Models\TimeSlot;
use App\Models\Court;
use App\Models\Club;
use App\Models\Promotion;

class CourtSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $clubs = Club::all();

        if ($clubs->isEmpty()) {
            $this->command->error('No clubs found. Please seed the clubs table first.');
            return;
        }

        // Loop para cada clube
        foreach ($clubs as $club) {
            // Criação da quadra
            $courtName = 'Quadra - Clube ' . $club->id; // Nome da quadra variado com o nome do clube
            $court = Court::create([
                'club_id' => $club->id,
                'name' => $courtName, 
                'sport' => 'padel',
                'is_covered' => true,
                'type' => 'masonry',
                'grass_type' => 'synthetic',
                'floor_type' => 'concrete',
                'can_play_outside' => true,
                'description' => 'Uma excelente quadra de padel coberta, com piso de concreto e grama sintética.',
                'installation_year' => 2022,
                'manufacturer' => 'XYZ Sports',
                'status' => true,
                'pricing' => [
                    [
                        'time' => '01:00',
                        'price' => 50.00
                    ],
                    [
                        'time' => '03:00',
                        'price' => 70.00
                    ],
                    [
                        'time' => '05:00',
                        'price' => 99.00
                    ]
                ],
            ]);

            // Configura imagens da quadra
            $courtImagesPath = "images/courts/$court->id/common/";
            $sponsorImagePath = "images/courts/$court->id/sponsor/img.jpg";

            $court->update([
                'images' => $courtImagesPath,
                'sponsor_image' => $sponsorImagePath
            ]);

            // Adicionar imagens
            Storage::disk('public')->put(
                $courtImagesPath . 'img1.jpg',
                file_get_contents("https://monteseunegocio.boasideias.com.br/wp-content/uploads/sites/8/2022/01/como-montar-quadra-de-tenisd.jpg")
            );

            Storage::disk('public')->put(
                $sponsorImagePath,
                file_get_contents("https://www.logotipo.pt/wp-content/uploads/2016/09/coca-cola-classic-1.jpg")
            );

            // Obtém todos os horários disponíveis
            $timeSlots = TimeSlot::all();

            if ($timeSlots->isEmpty()) {
                $this->command->error('No time slots found. Please seed the time slots table first.');
                return;
            }

            // Define uma lista de horários diferentes por dia
            $weekdaysTimeSlotMap = [
                'monday'    => [1, 2, 3, 4, 5, 6, 7, 8, 14, 15, 16, 17, 18],
                'wednesday' => $timeSlots->whereIn('id', [3, 4, 5])->pluck('id'),
                'friday'    => $timeSlots->whereNotBetween('start_time', ['12:00', '18:00'])->pluck('id'),
            ];

            // Associa os horários à quadra por dia da semana
            foreach ($weekdaysTimeSlotMap as $weekday => $timeSlotIds) {
                foreach ($timeSlotIds as $timeSlotId) {
                    $court->timeSlots()->attach($timeSlotId, [
                        'weekday' => $weekday,
                        'available' => true,
                    ]);
                }
            }

            $court->promotions()->create([
                "start_time" => $court->timeSlots[0]->start_time,
                "end_time" => $court->timeSlots[2]->end_time,
                "weekday" => "monday",
                "discount" => 10
            ]);
        }
    }

}
