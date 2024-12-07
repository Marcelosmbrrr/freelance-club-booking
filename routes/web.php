<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\Home\DashboardController;

// Admin
use App\Http\Controllers\Home\Admin\RegisteredClubController;
use App\Http\Controllers\Home\Admin\ClubRequestController;

// Club
use App\Http\Controllers\Home\Club\Reservations\ClubReservationController;
use App\Http\Controllers\Home\Club\Courts\ClubCourtController;
use App\Http\Controllers\Home\Club\Tournaments\ClubTournamentController;
use App\Http\Controllers\Home\Club\Clients\ClientsController;
use App\Http\Controllers\Home\Club\Profile\ClubProfileController;

// Player

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
    Route::prefix("player")->middleware(["useraccess:player", "verified"])->group(function () {
        //
    });

});

require __DIR__.'/auth.php';
