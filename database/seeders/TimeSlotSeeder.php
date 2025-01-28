<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TimeSlotSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $startTime = strtotime('06:00'); // Hora inicial
        $endTime = strtotime('23:30');  // Último intervalo antes de 00:00

        while ($startTime <= $endTime) {
            DB::table('time_slots')->insert([
                'time' => date('H:i', $startTime),
            ]);

            $startTime = strtotime('+30 minutes', $startTime); // Incrementa 30 minutos
        }

        // Adiciona "00:00" ao final
        DB::table('time_slots')->insert([
            'time' => '00:00',
        ]);
    }
}
