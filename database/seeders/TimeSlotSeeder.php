<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TimeSlotSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $startTime = strtotime('06:00'); 
        $endTime = strtotime('00:00') + 86400;  

        $timeSlots = [];

        while ($startTime < $endTime) {
            $end = strtotime('+30 minutes', $startTime);

            $timeSlots[] = [
                'start_time' => date('H:i', $startTime),
                'end_time' => date('H:i', $end),
                'created_at' => now(),
                'updated_at' => now(),
            ];

            $startTime = $end;
        }

        // Insere os horários na tabela
        DB::table('time_slots')->insert($timeSlots);
    }

}
