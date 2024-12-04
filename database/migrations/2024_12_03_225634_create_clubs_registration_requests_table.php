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
        Schema::create('clubs_registration_requests', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->string("email");
            $table->string("cnpj");
            $table->string("trading_name");
            $table->string("state");
            $table->string("city");
            $table->string("phonenumber");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clubs_registration_requests');
    }
};
