<?php

namespace Database\Seeders;

//use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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

        $court = Court::create([
            'club_id' => $club->id,
            'name' => 'Quadra A',
            'sport' => 'padel',
            'structure_type' => 'masonry',
            'can_play_outside' => true,
            'description' => 'Uma quadra de padel excelente para jogar futebol.',
            'installation_year' => 2022,
            'manufacturer' => 'XYZ Sports',
            'status' => true,
            'area_type' => 'indoor'
        ]);

        $courtImagesPath = "images/courts/$court->id/";

        $court->update([
            'images' => $courtImagesPath
        ]);

        Storage::disk("public")->put($courtImagesPath . "main.jpg", file_get_contents("https://monteseunegocio.boasideias.com.br/wp-content/uploads/sites/8/2022/01/como-montar-quadra-de-tenisd.jpg"));

        // Court time slots
        $timeSlot = TimeSlot::first();

        $weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

        foreach ($weekdays as $weekday) {
            $court->time_slots()->attach($timeSlot->id, [
                'weekday' => $weekday,
                'available' => true,
            ]);
        }
    }
}
