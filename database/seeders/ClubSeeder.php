<?php

namespace Database\Seeders;

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
                'phonenumber' => '123456789',
                'cnpj' => '11.111.111/1111-11',
                'trading_name' => 'Parque Tênis Clube',
                'zip_code' => '12345-678',
                'address' => 'Some Club Address 1',
                'city' => 'São Paulo',
                'state' => 'SP',
                'description' => 'Pellentesque eget quam ligula. Sed felis ante, consequat nec ultrices ut, ornare quis metus. Vivamus sit amet tortor vel enim sollicitudin hendrerit.',
                'instagram' => 'https://instagram.com/parquetenis',
                'facebook' => 'https://facebook.com/parquetenis',
                'whatsapp' => '5519123456789',
                'geolocalization' => '-23.55052,-46.633308'
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
                'phonenumber' => $clubData['phonenumber'],
                'cnpj' => $clubData['cnpj'],
                'trading_name' => $clubData['trading_name'],
                'zip_code' => $clubData['zip_code'],
                'address' => $clubData['address'],
                'city' => $clubData['city'],
                'state' => $clubData['state'],
                'description' => $clubData['description'],
                'instagram' => $clubData['instagram'],
                'facebook' => $clubData['facebook'],
                'whatsapp' => $clubData['whatsapp'],
                'geolocalization' => $clubData['geolocalization'],
                'slug' => Str::slug($clubData['trading_name']),
            ]);

            // Configuração de imagens
            $clubImagesPath = "images/clubs/$club->id/";

            $club->update([
                'images' => $clubImagesPath
            ]);

            // Armazenamento das imagens
            Storage::disk("public")->put($clubImagesPath . "main.jpg", file_get_contents('https://www.industriadeltenis.com/wp-content/uploads/2022/02/WhatsApp-Image-2022-02-09-at-17.12.50-1.jpeg'));
        }
    }
}
