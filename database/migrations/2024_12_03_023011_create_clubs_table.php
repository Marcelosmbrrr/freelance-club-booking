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
        Schema::create('clubs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->nullable()->constrained('users');
            $table->string("cnpj")->unique();
            $table->string("sports");
            $table->string("trading_name")->unique();
            $table->string("phonenumber")->unique();
            $table->string("address");
            $table->string("latitude");
            $table->string("longitude");
            $table->string("description")->nullable();
            $table->string("images")->nullable();
            $table->string("logo_image")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clubs');
    }
};
