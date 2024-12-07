<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Club;
use App\Models\Court;

class ClubSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::create([
            'name' => 'Parque Tênis Clube',
            'email' => 'club@app.com',
            'email_verified_at' => now(),
            'password' => Hash::make('club123'),
            'role' => 'club'
        ]);

        $club = Club::create([
            'user_id' => $user->id,  
            'phonenumber' => '123456789', 
            'cnpj' => '11.111.111/1111-11',
            'trading_name' => 'Parque Tênis Clube',
            'address' => 'Some Club Address', 
            'latitude' => '-31.708636360342698', 
            'longitude' => '-52.3397577498608'
        ]);

        $court = Court::create([
            "club_id" => $club->id,
            "name" => "court1",
            "sport" => "padel",
            "type" => "indoor",
            "status" => true,
            "image_folder" => "/clubs/$club->id/courts/"
        ]);

        $court->time_slots()->attach([
            1 => ['available' => true],
            2 => ['available' => true],
            3 => ['available' => true],
        ]);
    }
}
