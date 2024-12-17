<?php

namespace App\Http\Controllers\Home\Shared;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Club;
use App\Http\Resources\Shared\ClubHomepageResource;

class ClubHomepageController extends Controller
{
    function __construct(Club $clubModel)
    {
        $this->clubModel = $clubModel;
    }

    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, string $club_slug)
    {
        $club = $this->clubModel->where("slug", $club_slug)->with(["user", "courts"])->firstOrFail();

        return Inertia::render("Home/Shared/ClubHomepage/Index", [
            "club" => new ClubHomepageResource($club)
        ]);
    }
}
