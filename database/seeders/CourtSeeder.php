<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use App\Models\Club;
use App\Models\Court;
use App\Models\CourtImage;
use App\Models\CourtTimeSlot;
use App\Models\CourtPricing;
use App\Models\CourtPromotion;
use App\Models\TimeSlot;

class CourtSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Obtém o primeiro clube cadastrado
        $club = Club::first();

        // Cria uma quadra
        $court = Court::create([
            'club_id' => $club->id,
            'name' => 'Quadra Central',
            'sport' => 'padel',
            'is_covered' => true,
            'type' => 'masonry',
            'grass_type' => null,
            'floor_type' => 'cimento',
            'can_play_outside' => false,
            'description' => 'Quadra principal do clube, com piso de cimento e cobertura.',
            'installation_year' => 2020,
            'manufacturer' => 'PadelCourtPro',
            'status' => true,
            'sponsor_image' => null, 
        ]);

        // Caminho para a imagem do patrocinador
        $courtSponsorImagePath = "courts/$court->id/images/sponsor/img.jpg";

        // Baixa a imagem do patrocinador e salva no Storage
        $sponsorImageUrl = 'https://www.logotipo.pt/wp-content/uploads/2016/09/coca-cola-classic-1.jpg';
        $sponsorImageContents = file_get_contents($sponsorImageUrl);
        Storage::disk('public')->put($courtSponsorImagePath, $sponsorImageContents);

        // Atualiza a quadra com o caminho da imagem do patrocinador
        $court->update(['sponsor_image' => $courtSponsorImagePath]);

        // Baixa a imagem da quadra e salva no Storage
        $courtImageUrl = 'https://th.bing.com/th/id/R.334a435eeff488e6a965f7a8b6a6e1d3?rik=XiHScBJF2vVjAw&pid=ImgRaw&r=0';
        $courtImageContents = file_get_contents($courtImageUrl);

        // Caminho para a imagem geral da quadra
        $courtGeneralImagePath = "courts/$court->id/images/general/img1.jpg";
        Storage::disk('public')->put($courtGeneralImagePath, $courtImageContents);

        // Adiciona a imagem à quadra
        CourtImage::create([
            'court_id' => $court->id,
            'image_path' => $courtGeneralImagePath,
        ]);

        // Obtém todos os time slots disponíveis
        $timeSlots = TimeSlot::all();

        // Verifica se há time slots disponíveis
        if ($timeSlots->isEmpty()) {
            throw new \Exception("Nenhum time slot encontrado na tabela time_slots.");
        }

        // Cria time slots disponíveis para a quadra em todos os dias da semana
        foreach ($timeSlots as $timeSlot) {
            for ($weekday = 1; $weekday <= 7; $weekday++) {
                CourtTimeSlot::create([
                    'court_id' => $court->id,
                    'time_slot_id' => $timeSlot->id,
                    'weekday' => $weekday,
                    'available' => true,
                ]);
            }
        }

        // Verifica se os CourtTimeSlots foram criados corretamente
        $courtTimeSlots = CourtTimeSlot::where('court_id', $court->id)->get();
        if ($courtTimeSlots->isEmpty()) {
            throw new \Exception("Nenhum CourtTimeSlot foi criado.");
        }

        CourtPricing::insert([
            [
                'court_id' => $court->id,
                'duration' => 2, // 2 time slots - 1h
                'price' => 10,
                'vip_discount' => 10.00,
            ],
            [
                'court_id' => $court->id,
                'duration' => 3, // 3 time slots - 1h30
                'price' => 15,
                'vip_discount' => 15.00,
            ],
            [
                'court_id' => $court->id,
                'duration' => 4, // 4 time slots - 2h
                'price' => 20,
                'vip_discount' => 18.00,
            ]
        ]);

        // Cria uma promoção para um time slot específico
        $courtTimeSlot = CourtTimeSlot::where('court_id', $court->id)->first();

        if (!$courtTimeSlot) {
            throw new \Exception("Nenhum CourtTimeSlot encontrado para a quadra.");
        }

        CourtPromotion::create([
            'court_id' => $court->id,
            'court_time_slot_id' => $courtTimeSlot->id,
            'duration' => 2, // 1 hora = 2 time slots
            'discount' => 20, // 20% de desconto
        ]);
    }
}