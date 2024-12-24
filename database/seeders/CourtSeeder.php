<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use App\Models\TimeSlot;
use App\Models\Court;
use App\Models\Club;

class CourtSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $club = Club::first();

        if (!$club) {
            $this->command->error('No clubs found. Please seed the clubs table first.');
            return;
        }

        $court = Court::create([
            'club_id' => $club->id,
            'name' => 'Quadra A',
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
            'price' => 100.00,
        ]);

        // Configura imagens da quadra
        $courtImagesPath = "images/courts/$court->id/";

        $court->update([
            'images' => $courtImagesPath
        ]);

        // Adiciona imagem principal
        Storage::disk('public')->put(
            $courtImagesPath . 'main.jpg',
            file_get_contents("https://monteseunegocio.boasideias.com.br/wp-content/uploads/sites/8/2022/01/como-montar-quadra-de-tenisd.jpg")
        );

        // Obtém todos os horários disponíveis
        $timeSlots = TimeSlot::all();

        if ($timeSlots->isEmpty()) {
            $this->command->error('No time slots found. Please seed the time slots table first.');
            return;
        }

        // Define uma lista de horários diferentes por dia
        $weekdaysTimeSlotMap = [
            'monday'    => $timeSlots->whereBetween('start_time', ['06:30', '12:00'])->pluck('id'),
            'tuesday'   => $timeSlots->whereBetween('start_time', ['14:00', '20:00'])->pluck('id'),
            'wednesday' => $timeSlots->whereIn('id', [3, 4, 5]), // Exemplo com IDs específicos
            'thursday'  => $timeSlots->whereBetween('start_time', ['08:00', '16:00'])->pluck('id'),
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
    }
}