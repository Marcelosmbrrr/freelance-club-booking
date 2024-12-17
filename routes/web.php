<?php

use Illuminate\Support\Facades\Route;

// Shared
use App\Http\Controllers\Home\Shared\DashboardController;

// Admin
use App\Http\Controllers\Home\Admin\Clubs\RegisteredClubController;
use App\Http\Controllers\Home\Admin\RegistrationRequests\ClubRegistrationRequestController;
use App\Http\Controllers\Home\Admin\UpdateRequests\ClubUpdateRequestControlller;

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

// Public
use App\Http\Controllers\Public\WelcomeController;

Route::get("/", WelcomeController::class)->name("guest.welcome");

Route::middleware(['auth'])->group(function () {
    // Shared
    Route::get("/dashboard", DashboardController::class)->name("dashboard");
    // Admin
    Route::prefix("admin")->middleware(["user-access:admin", "verified"])->group(function () {
        Route::resource("clubs", RegisteredClubController::class)->names("admin.clubs");
        Route::resource("registration-requests", ClubRegistrationRequestController::class)->names("admin.registration-requests");
        Route::resource("update-requests", ClubUpdateRequestControlller::class)->names("admin.update-requests");
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
