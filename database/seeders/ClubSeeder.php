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
            ],
            [
                'name' => 'Tênis Club Jardim Paulista',
                'email' => 'club2@app.com',
                'password' => 'club123',
                'role' => 'club',
                'phonenumber' => '987654321',
                'cnpj' => '22.222.222/2222-22',
                'trading_name' => 'Tênis Club Jardim Paulista',
                'zip_code' => '23456-789',
                'address' => 'Some Club Address 2',
                'city' => 'São Paulo',
                'state' => 'SP',
                'description' => 'Aenean sollicitudin libero et orci viverra, nec bibendum elit condimentum.',
                'instagram' => 'https://instagram.com/tenisclubjp',
                'facebook' => 'https://facebook.com/tenisclubjp',
                'whatsapp' => '5519987654321',
                'geolocalization' => '-23.561, -46.642'
            ],
            [
                'name' => 'Clube de Tênis Vila Progredior',
                'email' => 'club3@app.com',
                'password' => 'club123',
                'role' => 'club',
                'phonenumber' => '1122334455',
                'cnpj' => '33.333.333/3333-33',
                'trading_name' => 'Clube de Tênis Vila Progredior',
                'zip_code' => '34567-890',
                'address' => 'Some Club Address 3',
                'city' => 'São Paulo',
                'state' => 'SP',
                'description' => 'Sed vulputate, arcu non euismod dapibus, nulla risus aliquam velit, nec efficitur lacus magna et elit.',
                'instagram' => 'https://instagram.com/ctvprogredior',
                'facebook' => 'https://facebook.com/ctvprogredior',
                'whatsapp' => '5519112233445',
                'geolocalization' => '-23.570, -46.630'
            ],
            [
                'name' => 'Clube Recreativo São José',
                'email' => 'club4@app.com',
                'password' => 'club123',
                'role' => 'club',
                'phonenumber' => '543216789',
                'cnpj' => '44.444.444/4444-44',
                'trading_name' => 'Clube Recreativo São José',
                'zip_code' => '45678-901',
                'address' => 'Some Club Address 4',
                'city' => 'São Paulo',
                'state' => 'SP',
                'description' => 'Donec ac dui in lacus luctus aliquam. Aenean id magna vitae magna tincidunt gravida.',
                'instagram' => 'https://instagram.com/crsaojose',
                'facebook' => 'https://facebook.com/crsaojose',
                'whatsapp' => '5519543216789',
                'geolocalization' => '-23.550, -46.634'
            ],
            [
                'name' => 'Clube Tênis do Centro',
                'email' => 'club5@app.com',
                'password' => 'club123',
                'role' => 'club',
                'phonenumber' => '6655443322',
                'cnpj' => '55.555.555/5555-55',
                'trading_name' => 'Clube Tênis do Centro',
                'zip_code' => '56789-012',
                'address' => 'Some Club Address 5',
                'city' => 'São Paulo',
                'state' => 'SP',
                'description' => 'Curabitur vehicula, nisi vitae bibendum euismod, felis justo euismod arcu.',
                'instagram' => 'https://instagram.com/ctcentro',
                'facebook' => 'https://facebook.com/ctcentro',
                'whatsapp' => '5519665544332',
                'geolocalization' => '-23.552, -46.638'
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
            Storage::disk("public")->put($clubImagesPath . "img1.jpg", file_get_contents('https://www.industriadeltenis.com/wp-content/uploads/2022/02/WhatsApp-Image-2022-02-09-at-17.12.50-1.jpeg'));
        }
    }

}
