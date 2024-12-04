<?php

namespace App\Http\Controllers\Home\Player;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;

class DashboardPlayerController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        //Gate::authorize('player');

        return Inertia::render('Home/Player/Dashboard/Index');
    }
}
