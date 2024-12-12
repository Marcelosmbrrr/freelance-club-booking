<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
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

        $player = Player::create([
            'user_id' => $user->id,
            'cpf' => '040.410.456-22'
        ]);

        $playerAvatarPath = "images/players/$player->id/avatar/avatar.jpg";

        $player->update([
            'avatar_image' => $playerAvatarPath
        ]);

        Storage::disk("public")->put($playerAvatarPath, file_get_contents(public_path('images/no-image.jpg')));
    }
}
