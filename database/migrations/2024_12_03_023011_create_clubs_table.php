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
            $table->string("trading_name")->unique();
            $table->string("phonenumber")->unique();
            $table->string("zip_code")->nullable();
            $table->string("address")->nullable();
            $table->string("city");
            $table->string("state");
            $table->text("description")->nullable();
            $table->string("images")->nullable();
            $table->string("slug");
            $table->string("instagram")->nullable();
            $table->string("facebook")->nullable();
            $table->string("whatsapp")->nullable();
            $table->string("geolocalization")->nullable();
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
