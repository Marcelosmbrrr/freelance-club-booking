<?php

namespace App\Http\Controllers\Home\Club;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;

class DashboardClubController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        //Gate::authorize('club:admin');

        return Inertia::render('Home/Club/Dashboard/Index');
    }
}
