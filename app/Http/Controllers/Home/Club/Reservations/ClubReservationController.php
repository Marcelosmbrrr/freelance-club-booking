<?php

namespace App\Http\Controllers\Home\Club\Reservations;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Club;
use App\Models\Court;
use App\Models\Reservation;
use App\Http\Resources\Club\Reservations\ReservationsResource;
use App\Http\Resources\Club\Reservations\ShowReservationResource;

class ClubReservationController extends Controller
{
    function __construct(Club $clubModel, Reservation $reservationModel, Court $courtModel)
    {
        $this->clubModel = $clubModel;
        $this->reservationModel = $reservationModel;
        $this->courtModel = $courtModel;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $searchBy = $request->input('search_by', 'id');
        $reservationId = $request->input("reservation");
        $date = $request->input('date', Carbon::today()); 
        $clubId = Auth::user()->club->id;

        if (!$clubId) {
            abort(403, 'Usuário não está associado a um clube.');
        }

        $query = $this->reservationModel->query();

        $query->whereDate('date', '=', $date);

        $query->whereHas('court', function ($query) use ($clubId) {
            $query->where('club_id', $clubId);
        });

        $query->with(['player', 'court', 'courtTimeSlots']);

        if ($search && $searchBy) {
            $query->where($searchBy, 'like', '%' . $search . '%');
        }

        $reservations = $query->get();

        $reservations_grouped_by_court = $reservations->groupBy('court.name');

        return Inertia::render('Home/Club/Reservations/Index', [
            'reservations' => $reservations_grouped_by_court->map(function ($court_reservations) {
                return ReservationsResource::collection($court_reservations);
            }), 
            'reservation' => fn () => [],
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Home/Club/Reservations/CreateReservation');
    }

    public function store() {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
