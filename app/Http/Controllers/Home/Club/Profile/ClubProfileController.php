<?php

namespace App\Http\Controllers\Home\Club\Profile;

use App\Http\Controllers\Controller;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClubProfileController extends Controller
{
    function index(string $tab = "index") {
        $page_filename = Str::studly($tab);
        return Inertia::render("Home/Club/Profile/$page_filename");
    }

    function updateProfile(Request $request) {
        //
    }

    function updatePassword(Request $request) {
        //
    }

    function deleteAccount(Request $request) {
        //
    }
}
