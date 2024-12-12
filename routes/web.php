<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\Home\DashboardController;

// Admin
use App\Http\Controllers\Home\Admin\Clubs\RegisteredClubController;
use App\Http\Controllers\Home\Admin\RegistrationRequests\ClubRequestController;

// Club
use App\Http\Controllers\Home\Club\Reservations\ClubReservationController;
use App\Http\Controllers\Home\Club\Courts\ClubCourtController;
use App\Http\Controllers\Home\Club\Tournaments\ClubTournamentController;
use App\Http\Controllers\Home\Club\Clients\ClientsController;
use App\Http\Controllers\Home\Club\Profile\ClubProfileController;

// Player
use App\Http\Controllers\Home\Player\Reservations\PlayerReservationController;
use App\Http\Controllers\Home\Player\Tournaments\PlayerTournamentController;
use App\Http\Controllers\Home\Player\Profile\PlayerProfileController;

Route::inertia("/", 'Public/Welcome');

Route::middleware(['auth'])->group(function () {
    // Shared
    Route::get("/dashboard", DashboardController::class)->name("dashboard");
    // Admin
    Route::prefix("admin")->middleware(["user-access:admin", "verified"])->group(function () {
        Route::resource("clubs", RegisteredClubController::class)->names("admin.clubs");
        Route::resource("requests", ClubRequestController::class)->names("admin.requests");
    });
    // Club
    Route::prefix("club")->middleware(["user-access:club", "verified"])->group(function () {
        Route::resource("courts", ClubCourtController::class)->names("club.courts");
        Route::resource("reservations", ClubReservationController::class)->names("club.reservations");
        Route::resource("tournaments", ClubTournamentController::class)->names("club.tournaments");
        Route::resource("clients", ClientsController::class)->names("club.clients");
        Route::get("profile", [ClubProfileController::class, "index"]);
    });
    // Player
    Route::prefix("player")->middleware(["user-access:player", "verified"])->group(function () {
        Route::resource("reservations", PlayerReservationController::class)->names("player.reservations");
        Route::resource("tournaments", PlayerTournamentController::class)->names("player.tournaments");
        Route::get("profile", [PlayerProfileController::class, "index"]);
    });

});

require __DIR__.'/auth.php';
