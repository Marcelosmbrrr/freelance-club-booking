<?php

namespace App\Http\Controllers\Home\Club\Profile;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\User;
use App\Http\Resources\Club\ClubProfileResource;
use App\Http\Requests\Club\Profile\ChangePasswordRequest;
use App\Http\Requests\Club\Profile\ProfileUpdateRequest;
use App\Http\Requests\Club\Profile\DeactivateAccountRequest;

class ClubProfileController extends Controller
{
    function __construct(User $userModel)
    {
        $this->userModel = $userModel;
    }

    function index() {

        $user = $this->userModel->with("club")->find(Auth::user()->id);

        return Inertia::render("Home/Club/Profile/Index", [
            "user" => new ClubProfileResource($user)
        ]);
    }

    public function updateProfile(ProfileUpdateRequest $request, string $user_id) {
        //
    }

    public function uploadImages() {
        //
    }

    public function changePassword(ChangePasswordRequest $request, string $user_id) {
        //
    }

    public function deactivateAccount(DeactivateAccountRequest $request, string $user_id) {
        //
    }
}
