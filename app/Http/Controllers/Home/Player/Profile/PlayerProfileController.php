<?php

namespace App\Http\Controllers\Home\Player\Profile;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\User;
use App\Http\Requests\ProfileUpdateRequest;
use App\Http\Requests\Player\Profile\ChangePasswordRequest;
use App\Http\Requests\Player\Profile\DeactivateAccountRequest;
use App\Http\Resources\Player\PlayerProfileResource;

class PlayerProfileController extends Controller
{
    function __construct(User $userModel)
    {
        $this->userModel = $userModel;
    }

    public function index() {

        $user = $this->userModel->with("player")->find(Auth::user()->id);

        return Inertia::render('Home/Player/Profile/Index', [
            "user" => new PlayerProfileResource($user)
        ]);
    }

    public function updateProfile(ProfileUpdateRequest $request, string $user_id) {
        //
    }

    public function changePassword(ChangePasswordRequest $request, string $user_id) {
        //
    }

    public function deactivateAccount(DeactivateAccountRequest $request, string $user_id) {
        //
    }
}
