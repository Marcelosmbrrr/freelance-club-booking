<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Club;

class ClubSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::create([
            'name' => 'User Club',
            'email' => 'club@app.com',
            'email_verified_at' => now(),
            'password' => Hash::make('club123'),
            'role' => 'club'
        ]);

        Club::create([
            'user_id' => $user->id,  
            'phonenumber' => '123456789', 
            'address' => 'Some Club Address', 
            'latitude' => '12.345678', 
            'longitude' => '98.765432'
        ]);
    }
}
