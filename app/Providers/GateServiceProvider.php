<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class GateServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {

        // ==== ADMIN ABILITIES ==== //

        Gate::define('admin', function ($user = null): bool {
            return Auth::user()->role === 'admin';
        });

        // ==== CLUB AND WORKER ABILITIES ==== //

        Gate::define('club:admin', function ($user = null): bool {
            return Auth::user()->role === 'club';
        });

        Gate::define('club:worker', function ($user = null): bool {
            return Auth::user()->role === 'worker';
        });

        // ==== PLAYER ABILITIES ==== //

        Gate::define('player', function ($user = null): bool {
            return Auth::user()->role === 'player';
        });
    }
}
