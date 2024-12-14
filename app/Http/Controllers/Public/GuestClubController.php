<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Club;
use App\Http\Resources\Public\GuestClubResource;

class GuestClubController extends Controller
{
    function __construct(Club $clubModel)
    {
        $this->clubModel = $clubModel;
    }

    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, string $club_id)
    {
        $club = $this->clubModel->with(["user", "courts"])->firstOrFail();

        return Inertia::render("Public/Club", [
            "club" => new GuestClubResource($club)
        ]);
    }
}
