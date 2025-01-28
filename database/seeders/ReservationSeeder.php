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
        $firstCourt = Court::first(); // Primeira quadra
        $secondCourt = Court::skip(1)->first(); // Segunda quadra (pode ajustar o índice conforme necessário)

        // Criação da reserva para a primeira quadra
        $reservationFirstCourt = Reservation::create([
            "player_id" => $player->id,
            "court_id" => $firstCourt->id,
            "total_players" => 4, // Pode alterar para qualquer valor desejado
            "is_public" => true,
            "date" => Carbon::today(),
            "price" => $firstCourt->pricing[0]["price"] // preço por 60 min
        ]);

        ReservationCourtTimeSlot::insert([
            [
                "reservation_id" => $reservationFirstCourt->id,
                "court_time_slot_id" => 1
            ],
            [
                "reservation_id" => $reservationFirstCourt->id,
                "court_time_slot_id" => 2
            ]
        ]);

        $playerSlotsFirstCourt = [];
        for ($i = 1; $i <= $reservationFirstCourt->total_players; $i++) {
            $playerSlotsFirstCourt[] = [
                "reservation_id" => $reservationFirstCourt->id,
                "player_id" => $i === 1 ? $player->id : null, 
                "position" => $i
            ];
        }

        ReservationSlot::insert($playerSlotsFirstCourt);

        // Criação da reserva para a segunda quadra
        $reservationSecondCourt = Reservation::create([
            "player_id" => $player->id,
            "court_id" => $secondCourt->id,
            "total_players" => 4, // Pode alterar para qualquer valor desejado
            "is_public" => true,
            "date" => Carbon::today(),
            "price" => $secondCourt->pricing[1]["price"] // preço por 90 min (ajustado para a segunda quadra)
        ]);

        ReservationCourtTimeSlot::insert([
            [
                "reservation_id" => $reservationSecondCourt->id,
                "court_time_slot_id" => 1
            ],
            [
                "reservation_id" => $reservationSecondCourt->id,
                "court_time_slot_id" => 2
            ],
            [
                "reservation_id" => $reservationSecondCourt->id,
                "court_time_slot_id" => 3
            ]
        ]);

        $playerSlotsSecondCourt = [];
        for ($i = 1; $i <= $reservationSecondCourt->total_players; $i++) {
            $playerSlotsSecondCourt[] = [
                "reservation_id" => $reservationSecondCourt->id,
                "player_id" => $i === 1 ? $player->id : null, 
                "position" => $i
            ];
        }

        ReservationSlot::insert($playerSlotsSecondCourt);
    }


}
