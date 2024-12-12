<?php

namespace Database\Seeders;

//use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
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
            'status' => true
        ]);

        $courtImagesPath = "images/courts/$court->id/";
        $courtSponsorImagesPath = "$courtImagesPath/sponsors/";

        $court->update([
            'images' => $courtImagesPath,
            'sponsor_images' => $courtSponsorImagesPath
        ]);

        Storage::disk("public")->put($courtImagesPath . "image1.jpg", file_get_contents(public_path('images/no-image.jpg')));
        Storage::disk("public")->put($courtSponsorImagesPath . "sponsor1.jpg", file_get_contents(public_path('images/no-image.jpg')));

        $court->time_slots()->attach([1, 2, 3]);
    }
}
