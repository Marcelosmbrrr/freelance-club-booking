<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Carbon\Carbon;
use App\Models\Player;
use App\Models\Court;
use App\Models\Reservation;
use App\Models\ReservationCourtTimeSlot;
use App\Models\ReservationSlot;

class ReservationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $player = Player::first();
        $court = Court::first();

        $reservation = Reservation::create([
            "player_id" => $player->id,
            "court_id" => $court->id,
            "total_players" => 4, // Pode alterar para qualquer valor desejado
            "is_public" => true,
            "date" => Carbon::create(2025, 1, 7),
            "price" => $court->pricing[0]["price"]
        ]);

        ReservationCourtTimeSlot::insert([
            [
                "reservation_id" => $reservation->id,
                "court_time_slot_id" => 1
            ],
            [
                "reservation_id" => $reservation->id,
                "court_time_slot_id" => 2
            ]
        ]);

        $playerSlots = [];
        for ($i = 1; $i <= $reservation->total_players; $i++) {
            $playerSlots[] = [
                "reservation_id" => $reservation->id,
                "player_id" => $i === 1 ? $player->id : null, 
                "position" => $i
            ];
        }

        ReservationSlot::insert($playerSlots);
    }

}
