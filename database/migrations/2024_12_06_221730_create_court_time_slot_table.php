<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    /*
        - court and time slot set must repeat 
        - one court would have many time slots
    */

    public function up(): void
    {
        Schema::create('court_time_slot', function (Blueprint $table) {
            $table->id();
            $table->foreignId('court_id')->constrained('courts');
            $table->foreignId('time_slot_id')->constrained('time_slots');
            $table->enum('weekday', ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']);
            $table->boolean("available")->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('court_time_slot');
    }
};
