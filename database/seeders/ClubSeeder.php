<?php

namespace Database\Seeders;

//use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
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
                'zip_code' => '12345-678',
                'address' => 'Some Club Address 1',
                'city' => 'São Paulo',
                'state' => 'SP',
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
                'zip_code' => '23456-789',
                'address' => 'Some Club Address 2',
                'city' => 'Rio de Janeiro',
                'state' => 'RJ',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            ]
        ];

        foreach ($clubs as $clubData) {
            // Criação do usuário
            $user = User::create([
                'name' => $clubData['name'],
                'email' => $clubData['email'],
                'email_verified_at' => now(),
                'password' => Hash::make($clubData['password']),
                'role' => $clubData['role']
            ]);

            // Criação do clube
            $club = Club::create([
                'user_id' => $user->id,
                'sports' => $clubData['sports'],
                'phonenumber' => $clubData['phonenumber'],
                'cnpj' => $clubData['cnpj'],
                'trading_name' => $clubData['trading_name'],
                'zip_code' => $clubData['zip_code'],
                'address' => $clubData['address'],
                'city' => $clubData['city'],
                'state' => $clubData['state'],
                'description' => $clubData['description'],
                'slug' => Str::slug($user->name)
            ]);

            // Configuração de imagens
            $clubImagesPath = "images/clubs/$club->id/";

            $club->update([
                'images' => $clubImagesPath
            ]);

            // Armazenamento das imagens
            Storage::disk("public")->put($clubImagesPath . "main.jpg", file_get_contents(public_path('images/no-image.jpg')));
            Storage::disk("public")->put($clubImagesPath . "background.jpg", file_get_contents(public_path('images/no-image.jpg')));
        }
    }

}
