<?php

use Illuminate\Support\Facades\Route;

// Shared
use App\Http\Controllers\Home\Shared\DashboardController;

// Admin
use App\Http\Controllers\Home\Admin\Clubs\RegisteredClubController;
use App\Http\Controllers\Home\Admin\RegistrationRequests\ClubRegistrationRequestController;
use App\Http\Controllers\Home\Admin\Profile\AdminProfileController;

// Club
use App\Http\Controllers\Home\Club\Reservations\ClubReservationController;
use App\Http\Controllers\Home\Club\Courts\ClubCourtController;
use App\Http\Controllers\Home\Club\Profile\ClubProfileController;

// Player
use App\Http\Controllers\Home\Player\Reservations\MyReservationController;
use App\Http\Controllers\Home\Player\Reservations\NewReservationController;
use App\Http\Controllers\Home\Player\Profile\PlayerProfileController;

// Public
use App\Http\Controllers\Public\WelcomeController;

Route::get("/", WelcomeController::class)->name("guest.welcome");

Route::middleware(['auth'])->group(function () {
    // Shared
    Route::get("/dashboard", DashboardController::class)->name("dashboard");
    // Admin
    Route::prefix("admin")->middleware(["user-access:admin", "verified"])->group(function () {
        Route::resource("clubs", RegisteredClubController::class)->except(["create", "store"])->names("admin.clubs");
        Route::resource("registration-requests", ClubRegistrationRequestController::class)->except(["store", "create", "show"])->names("admin.registration-requests");
        Route::get("profile", [AdminProfileController::class, "index"])->name("admin.profile");
    });
    // Club
    Route::prefix("club")->middleware(["user-access:club", "verified"])->group(function () {
        Route::resource("courts", ClubCourtController::class)->names("club.courts");
        Route::resource("reservations", ClubReservationController::class)->names("club.reservations");
        Route::get("profile", [ClubProfileController::class, "index"])->name("club.profile");
    });
    // Player
    Route::prefix("player")->middleware(["user-access:player", "verified"])->group(function () {
        Route::resource("reservations", MyReservationController::class)->names("player.reservations")->except(['create', 'store'])->names("player.reservations");
        Route::resource("new-reservation", NewReservationController::class)->names("player.new-reservation")->only(['index', 'store'])->names("player.new-reservation");
        Route::get("new-reservation/create/{clubId}", [NewReservationController::class, "create"])->name("player.new-reservation.create");
        Route::get("profile", [PlayerProfileController::class, "index"])->name("player.profile");
    });
});

require __DIR__.'/auth.php';
