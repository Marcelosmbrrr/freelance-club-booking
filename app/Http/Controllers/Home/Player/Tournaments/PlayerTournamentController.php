<?php

namespace App\Http\Controllers\Home\Player\Tournaments;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Reservation;
use App\Http\Resources\Player\Reservations\ReservationsResource;
use App\Http\Resources\Player\Reservations\ShowReservationResource;
use App\Http\Resources\Player\Reservations\EditReservationResource;

class PlayerTournamentController extends Controller
{
    function __construct(Reservation $reservationModel)
    {
        $this->reservationModel = $reservationModel;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $searchBy = $request->input('search_by', 'id');
        $orderBy = $request->input('order_by', 'id');
        $order = $request->input('order', 'asc');
        $limit = $request->input('limit', 10);
        $page = $request->input('page', 1);
        $group = $request->input('group', 'pending');
        
        return Inertia::render('Home/Player/Tournaments/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Home/Player/Tournaments/CreateInscription');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Inertia::render('Home/Player/Tournaments/ShowInscription');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return Inertia::render('Home/Player/Tournaments/EditInscription');
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
