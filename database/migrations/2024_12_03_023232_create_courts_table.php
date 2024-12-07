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
        Schema::create('courts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('club_id')->nullable()->constrained('clubs');
            $table->string("name");
            $table->enum("sport", ["padel", "tennis", "beach tennis", "squash"]);
            $table->enum("type", ["indoor", "outdoor"]);
            $table->boolean("status");
            $table->string("description")->nullable();
            $table->string("image_folder");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courts');
    }
};
