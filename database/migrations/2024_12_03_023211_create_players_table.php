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
        Schema::create('players', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->nullable()->constrained('users');
            $table->string("phonenumber")->unique()->nullable();
            $table->enum("sex", ["male", "female", "none"])->nullable();
            $table->string("cpf")->unique()->nullable();
            $table->date("birth_date")->nullable();
            $table->enum("best_hand", ["right-handed", "left-handed", "both"])->nullable();
            $table->enum("court_side", ["backhand", "forehand", "both"])->nullable();
            $table->enum("match_type", ["competitive", "friendly", "both"])->nullable();
            $table->string("avatar_image")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('players');
    }
};
