<?php

namespace App\Http\Controllers\Home\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;

class DashboardAdminController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        //Gate::authorize('admin');

        return Inertia::render('Home/Admin/Dashboard/Index');
    }
}
