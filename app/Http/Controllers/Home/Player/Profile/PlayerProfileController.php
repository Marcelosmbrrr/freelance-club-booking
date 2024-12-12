<?php

namespace App\Http\Controllers\Home\Player\Profile;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PlayerProfileController extends Controller
{
    public function index() {
        return Inertia::render('Home/Player/Profile/Index');
    }
}
