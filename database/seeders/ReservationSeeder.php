<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Carbon\Carbon;
use App\Models\Player;
use App\Models\Reservation;
use App\Models\ReservationCourtTimeSlot;
use App\Models\ReservationSlot;
use App\Models\CourtTimeSlot;
use App\Models\CourtPricing;

class ReservationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Obtém o primeiro jogador cadastrado
        $player = Player::first();

        // Obtém dois time slots disponíveis consecutivos para a quadra (1 hora = 2 time slots)
        $courtTimeSlots = CourtTimeSlot::where('available', true)
            ->orderBy('weekday')
            ->orderBy('time_slot_id')
            ->take(2) // Reserva de 1 hora (2 time slots)
            ->get();

        // Obtém o preço da quadra para 1 hora (2 time slots)
        $courtPricing = CourtPricing::where('court_id', $courtTimeSlots->first()->court_id)
            ->where('duration', 2) // 1 hora = 2 time slots
            ->first();

        // Cria a reserva
        $reservation = Reservation::create([
            'player_id' => $player->id,
            'court_id' => $courtTimeSlots->first()->court_id,
            'total_players' => 4, // Exemplo: 4 jogadores
            'price' => $courtPricing->price, // Preço baseado no CourtPricing
            'is_public' => true, // Reserva pública
            'date' => Carbon::today()->toDateString(), // Data de hoje
            'status' => 'confirmed', // Status da reserva
        ]);

        // Associa os time slots à reserva
        foreach ($courtTimeSlots as $courtTimeSlot) {
            ReservationCourtTimeSlot::create([
                'reservation_id' => $reservation->id,
                'court_time_slot_id' => $courtTimeSlot->id,
            ]);

            // Atualiza o time slot para indisponível
            $courtTimeSlot->update(['available' => false]);
        }

        // Cria os slots de reserva para os jogadores
        for ($i = 1; $i <= $reservation->total_players; $i++) {
            ReservationSlot::create([
                'reservation_id' => $reservation->id,
                'player_id' => $i == 1 ? $player->id : null, // O primeiro slot é para o jogador que criou a reserva
                'position' => $i,
            ]);
        }
    }

}
