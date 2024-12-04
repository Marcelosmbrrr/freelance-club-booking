<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Player;

class PlayerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::create([
            'name' => 'User Player',
            'email' => 'player@app.com',
            'email_verified_at' => now(),
            'password' => Hash::make('player123'),
            'role' => 'player'
        ]);

        Player::create([
            'cpf' => '040.410.456-22'
        ]);
    }
}
