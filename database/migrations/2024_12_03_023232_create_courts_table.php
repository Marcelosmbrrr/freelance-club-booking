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
            $table->string("sponsor_image")->nullable();
            $table->timestamps();
        });

        Schema::create('court_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('court_id')->constrained('courts')->onDelete('cascade');
            $table->string('image_path');
            $table->timestamps();
        });

        Schema::create('court_time_slots', function (Blueprint $table) {
            $table->id();
            $table->foreignId('court_id')->constrained('courts')->onDelete('cascade');
            $table->foreignId('time_slot_id')->constrained('time_slots')->onDelete('cascade');
            $table->enum('weekday', [1, 2, 3, 4, 5, 6, 7]);
            $table->boolean("available")->default(true);
            $table->timestamps();
        
            $table->unique(['court_id', 'time_slot_id', 'weekday']);
        });

        Schema::create('court_pricings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('court_id')->constrained('courts')->onDelete('cascade');
            $table->integer('duration'); 
            $table->decimal('price', 8, 2);
            $table->decimal('vip_discount', 5, 2)->nullable();
            $table->timestamps();

            $table->unique(['court_id', 'duration']);
        });

        Schema::create('court_promotions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('court_id')->constrained('courts');
            $table->foreignId('court_time_slot_id')->constrained('court_time_slots')->onDelete('cascade');
            $table->integer("duration");
            $table->integer("discount");
            $table->timestamps();

            $table->unique(['court_id', 'court_time_slot_id', 'duration']);
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('court_pricings');
        Schema::dropIfExists('court_time_slots');
        Schema::dropIfExists('court_promotions');
        Schema::dropIfExists('courts');
    }
};
