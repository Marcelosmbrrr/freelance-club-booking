<?php

namespace App\Http\Controllers\Home\Club\Profile;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Http\Resources\Club\Profile\ClubProfileResource;

class ClubProfileController extends Controller
{
    function __construct(User $userModel)
    {
        $this->userModel = $userModel;
    }

    function index() {

        $user = $this->userModel->find(Auth::user()->id);

        return Inertia::render("Home/Club/Profile/Index", [
            "user" => new ClubProfileResource($user)
        ]);
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
