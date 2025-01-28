<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('player_id')->constrained('players'); 
            $table->foreignId('court_id')->constrained('courts');  
            $table->integer('total_players'); 
            $table->decimal("price");
            $table->boolean('is_public');
            $table->date("date");
            $table->enum("status", ['pending', 'confirmed', 'completed', 'cancelled'])->default('pending');
            $table->timestamps();
        });

        Schema::create('reservation_court_time_slots', function (Blueprint $table) {
            $table->id();
            $table->foreignId('reservation_id')->constrained('reservations')->onDelete('cascade');
            $table->foreignId('court_time_slot_id')->constrained('court_time_slots')->onDelete('cascade');
            $table->timestamps();
        
            $table->unique(['reservation_id', 'court_time_slot_id'], 'res_court_time_slot_unique');
        });

        Schema::create('reservation_slots', function (Blueprint $table) {
            $table->id();
            $table->foreignId('reservation_id')->constrained('reservations');
            $table->foreignId('player_id')->nullable()->constrained('players');
            $table->integer('position');
            $table->timestamps();

            $table->unique(['reservation_id', 'player_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservation_court_time_slots');
        Schema::dropIfExists('reservation_slots');
        Schema::dropIfExists('reservations');
    }
};
