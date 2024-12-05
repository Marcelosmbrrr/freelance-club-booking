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

Route::get('/', function () {
    return Inertia::render('Public/Welcome');
});

Route::get("/dashboard", DashboardController::class)->name("dashboard");

Route::prefix("admin")->group(function () {
    Route::resource("clubs", RegisteredClubController::class)->names("clubs.admin");
    Route::resource("requests", ClubRequestController::class)->names("requests.admin");
});

Route::prefix("club")->group(function () {
    Route::resource("courts", ClubCourtController::class)->names("courts.club");
    Route::resource("reservations", ClubReservationController::class)->names("reservations.club");
    Route::resource("tournaments", ClubTournamentController::class)->names("tournaments.club");
    Route::resource("clients", ClientsController::class)->names("clients");
    Route::get("profile", [ClubProfileController::class, "index"]);
});

Route::prefix("player")->group(function () {
    //
});


/*
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get("/admin/dashboard", [DashboardAdminController::class, 'index'])->name("dashboard.admin");
    Route::get("/club/dashboard", [DashboardClubController::class, 'index'])->name("dashboard.club");
    Route::get("/player/dashboard", [DashboardPlayerController::class, 'index'])->name("dashboard.player");
});
*/

require __DIR__.'/auth.php';
