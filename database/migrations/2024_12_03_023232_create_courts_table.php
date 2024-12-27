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
            $table->enum("sport", ["padel"]);
            $table->boolean("is_covered");
            $table->enum('type', ['masonry', 'panoramic', 'mixed']); 
            $table->string('grass_type')->nullable(); 
            $table->string('floor_type')->nullable(); 
            $table->boolean('can_play_outside')->default(false);
            $table->string("description")->nullable();
            $table->year('installation_year')->nullable();
            $table->string('manufacturer')->nullable();
            $table->boolean("status")->default(true);
            $table->string("images")->nullable();
            $table->string("sponsor_image")->nullable();
            $table->decimal("price")->nullable();
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
