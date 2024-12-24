<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Player;
use App\Models\Club;
use App\Models\Client;

class ClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $player = Player::first(); 
        $club = Club::first();

        Client::create([
            "player_id" => $player->id,
            "club_id" => $club->id
        ]);


    }
}
