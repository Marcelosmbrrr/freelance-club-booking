<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
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
            "total_players" => 4,
            "is_public" => true,
            "date" => now(),
            "is_filled" => false
        ]);

        ReservationCourtTimeSlot::create([
            "reservation_id" => $reservation->id,
            "court_time_slot_id" => 1
        ]);

        ReservationSlot::create(["reservation_id" => $reservation->id, "player_id" => $player->id, "position" => 1]);

    }
}
