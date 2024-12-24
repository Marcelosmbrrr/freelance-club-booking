<?php

namespace App\Http\Controllers\Home\Admin\Profile;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\User;
use App\Http\Resources\Admin\AdminProfileResource;

class AdminProfileController extends Controller
{
    function __construct(User $userModel)
    {
        $this->userModel = $userModel;
    }

    function index() {

        $user = $this->userModel->find(Auth::user()->id);

        return Inertia::render("Home/Club/Profile/Index", [
            "user" => new AdminProfileResource($user)
        ]);
    }
}
