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
        $club = Club::first();

        // Criação da primeira quadra
        $court1Name = 'Quadra 1';
        $court1 = Court::create([
            'club_id' => $club->id,
            'name' => $court1Name, 
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
                    'price' => 06.00
                ],
                [
                    'time' => '01:30',
                    'price' => 08.00
                ],
                [
                    'time' => '02:00',
                    'price' => 10.00
                ]
            ],
        ]);

        // Configura imagens da primeira quadra
        $court1ImagesPath = "images/courts/$court1->id/common/";
        $court1SponsorImagePath = "images/courts/$court1->id/sponsor/img.jpg";

        $court1->update([
            'images' => $court1ImagesPath,
            'sponsor_image' => $court1SponsorImagePath
        ]);

        // Adicionar imagens da primeira quadra
        Storage::disk('public')->put(
            $court1ImagesPath . 'img1.jpg',
            file_get_contents("https://monteseunegocio.boasideias.com.br/wp-content/uploads/sites/8/2022/01/como-montar-quadra-de-tenisd.jpg")
        );

        Storage::disk('public')->put(
            $court1SponsorImagePath,
            file_get_contents("https://www.logotipo.pt/wp-content/uploads/2016/09/coca-cola-classic-1.jpg")
        );

        // Criação da segunda quadra
        $court2Name = 'Quadra 2';
        $court2 = Court::create([
            'club_id' => $club->id,
            'name' => $court2Name, 
            'sport' => 'padel',
            'is_covered' => true,
            'type' => 'masonry',
            'grass_type' => 'synthetic',
            'floor_type' => 'concrete',
            'can_play_outside' => true,
            'description' => 'Outra excelente quadra de padel coberta, com piso de concreto e grama sintética.',
            'installation_year' => 2022,
            'manufacturer' => 'XYZ Sports',
            'status' => true,
            'pricing' => [
                [
                    'time' => '01:00',
                    'price' => 06.00
                ],
                [
                    'time' => '01:30',
                    'price' => 08.00
                ],
                [
                    'time' => '02:00',
                    'price' => 10.00
                ]
            ],
        ]);

        // Configura imagens da segunda quadra
        $court2ImagesPath = "images/courts/$court2->id/common/";
        $court2SponsorImagePath = "images/courts/$court2->id/sponsor/img.jpg";

        $court2->update([
            'images' => $court2ImagesPath,
            'sponsor_image' => $court2SponsorImagePath
        ]);

        // Adicionar imagens da segunda quadra
        Storage::disk('public')->put(
            $court2ImagesPath . 'img1.jpg',
            file_get_contents("https://th.bing.com/th/id/R.334a435eeff488e6a965f7a8b6a6e1d3?rik=XiHScBJF2vVjAw&pid=ImgRaw&r=0")
        );

        Storage::disk('public')->put(
            $court2SponsorImagePath,
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
            'monday'    => $timeSlots->whereBetween('start_time', ['06:00', '11:00'])->pluck('id')
                            ->merge($timeSlots->whereBetween('start_time', ['14:00', '18:00'])->pluck('id')),
            'tuesday'   => $timeSlots->whereBetween('start_time', ['06:00', '11:00'])->pluck('id')
                            ->merge($timeSlots->whereBetween('start_time', ['14:00', '18:00'])->pluck('id')),
            'wednesday' => $timeSlots->whereBetween('start_time', ['06:00', '11:00'])->pluck('id')
                            ->merge($timeSlots->whereBetween('start_time', ['14:00', '18:00'])->pluck('id')),
            'thursday'  => $timeSlots->whereBetween('start_time', ['06:00', '11:00'])->pluck('id')
                            ->merge($timeSlots->whereBetween('start_time', ['14:00', '18:00'])->pluck('id')),
            'friday'    => $timeSlots->whereBetween('start_time', ['06:00', '11:00'])->pluck('id')
                            ->merge($timeSlots->whereBetween('start_time', ['14:00', '18:00'])->pluck('id')),
            'saturday'  => $timeSlots->whereBetween('start_time', ['06:00', '23:59'])->pluck('id'),
            'sunday'    => $timeSlots->whereBetween('start_time', ['06:00', '23:59'])->pluck('id'),
        ];

        // Associa os horários à primeira quadra por dia da semana
        foreach ($weekdaysTimeSlotMap as $weekday => $timeSlotIds) {
            foreach ($timeSlotIds as $timeSlotId) {
                $court1->timeSlots()->attach($timeSlotId, [
                    'weekday' => $weekday,
                    'available' => true,
                ]);
            }
        }

        // Associa os horários à segunda quadra por dia da semana
        foreach ($weekdaysTimeSlotMap as $weekday => $timeSlotIds) {
            foreach ($timeSlotIds as $timeSlotId) {
                $court2->timeSlots()->attach($timeSlotId, [
                    'weekday' => $weekday,
                    'available' => true,
                ]);
            }
        }

        // Cria promoção para a primeira quadra
        $court1->promotions()->create([
            "start_time" => "18:00",
            "end_time" => "00:00",
            "weekday" => "saturday",
            "discount" => 10
        ]);

        // Cria promoção para a segunda quadra
        $court2->promotions()->create([
            "start_time" => "18:00",
            "end_time" => "00:00",
            "weekday" => "saturday",
            "discount" => 10
        ]);
    }

}
