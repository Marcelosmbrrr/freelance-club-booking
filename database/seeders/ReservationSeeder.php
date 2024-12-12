<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Reservation;
use App\Models\Court;
use App\Models\Player;
use App\Models\ReservationCourtTimeSlot;

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
            'player_id' => $player->id,
            'court_id' => $court->id,
            'status' => 'confirmed',
            'date' => '2024-12-25'
        ]);

        ReservationCourtTimeSlot::insert([
            'reservation_id' => $reservation->id,
            'court_time_slot_id' => $court->time_slots[0]->id
        ]);
    }
}
