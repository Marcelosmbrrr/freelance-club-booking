<?php

namespace Database\Seeders;

//use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use App\Models\User;
use App\Models\Club;

class ClubSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $clubs = [
            [
                'name' => 'Parque Tênis Clube',
                'email' => 'club1@app.com',
                'password' => 'club123',
                'role' => 'club',
                'sports' => 'tennis,beach tennis,padel',
                'phonenumber' => '123456789',
                'cnpj' => '11.111.111/1111-11',
                'trading_name' => 'Parque Tênis Clube',
                'address' => 'Some Club Address 1',
                'latitude' => '-31.708636360342698',
                'longitude' => '-52.3397577498608',
                'description' => 'Pellentesque eget quam ligula. Sed felis ante, consequat nec ultrices ut, ornare quis metus. Vivamus sit amet tortor vel enim sollicitudin hendrerit.'
            ],
            [
                'name' => 'Clube da Praia',
                'email' => 'club2@app.com',
                'password' => 'club123',
                'role' => 'club',
                'sports' => 'beach volleyball,beach tennis',
                'phonenumber' => '987654321',
                'cnpj' => '22.222.222/2222-22',
                'trading_name' => 'Clube da Praia',
                'address' => 'Some Club Address 2',
                'latitude' => '-32.000000000000000',
                'longitude' => '-52.0000000000000',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            ],
            [
                'name' => 'Montanha Esportes Clube',
                'email' => 'club3@app.com',
                'password' => 'club123',
                'role' => 'club',
                'sports' => 'hiking,climbing',
                'phonenumber' => '456123789',
                'cnpj' => '33.333.333/3333-33',
                'trading_name' => 'Montanha Esportes Clube',
                'address' => 'Some Club Address 3',
                'latitude' => '-33.333333333333333',
                'longitude' => '-53.3333333333333',
                'description' => 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
            ],
            [
                'name' => 'Clube Aquático',
                'email' => 'club4@app.com',
                'password' => 'club123',
                'role' => 'club',
                'sports' => 'swimming,water polo',
                'phonenumber' => '321654987',
                'cnpj' => '44.444.444/4444-44',
                'trading_name' => 'Clube Aquático',
                'address' => 'Some Club Address 4',
                'latitude' => '-34.444444444444444',
                'longitude' => '-54.4444444444444',
                'description' => 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
            ]
        ];

        foreach ($clubs as $clubData) {
            $user = User::create([
                'name' => $clubData['name'],
                'email' => $clubData['email'],
                'email_verified_at' => now(),
                'password' => Hash::make($clubData['password']),
                'role' => $clubData['role']
            ]);

            $club = Club::create([
                'user_id' => $user->id,
                'sports' => $clubData['sports'],
                'phonenumber' => $clubData['phonenumber'],
                'cnpj' => $clubData['cnpj'],
                'trading_name' => $clubData['trading_name'],
                'address' => $clubData['address'],
                'latitude' => $clubData['latitude'],
                'longitude' => $clubData['longitude'],
                'description' => $clubData['description']
            ]);

            $clubImagesPath = "images/clubs/$club->id/";
            $clubLogoPath = "$clubImagesPath/logo/logo.jpg";

            $club->update([
                'images' => $clubImagesPath,
                'logo_image' => $clubLogoPath
            ]);

            Storage::disk("public")->put($clubImagesPath . "image1.jpg", file_get_contents(public_path('images/no-image.jpg')));
            Storage::disk("public")->put($clubLogoPath, file_get_contents(public_path('images/no-image.jpg')));
        }
    }

}
