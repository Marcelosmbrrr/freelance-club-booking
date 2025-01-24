<?php

namespace App\Http\Controllers\Home\Player\Reservations;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Reservation;
use App\Models\Club;
use App\Http\Resources\Player\Reservations\MyReservations\MyReservationsResource;
use App\Http\Resources\Player\Reservations\MyReservations\EditMyReservationResource;
use App\Http\Resources\Player\Reservations\MyReservations\ShowMyReservationResource;

class MyReservationController extends Controller
{
    function __construct(Reservation $reservationModel, Club $clubModel)
    {
        $this->reservationModel = $reservationModel;
        $this->clubModel = $clubModel;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $orderBy = $request->input('order_by', 'id');
        $order = $request->input('order', 'asc');
        $limit = $request->input('limit', 10);
        $page = $request->input('page', 1);

        $status = $request->input('status', 'all');
        $date = $request->input('date'); 

        $query = $this->reservationModel->query();

        $query->select('id', 'price', 'is_public', 'status', 'date', 'court_id', 'player_id');

        $query->where("player_id", Auth::user()->player->id);

        $query->with(['player', 'club', 'court']);

        if ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('name', 'like', '%' . $search . '%');
            });
        }

        if ($status && $status != "all") {
            $query->where('status', $status);
        }

        if ($date) {
            $query->whereDate('date', '=', $date);
        }

        $query->orderBy('reservations.' . $orderBy, $order);

        $data = $query->paginate($limit, ['*'], 'page', $page);

        return Inertia::render('Home/Player/Reservations/MyReservations/Index', [
            'pagination' =>  MyReservationsResource::collection($data),
            'clubs' => fn () => Auth::user()->player->saved_clubs,
            'queryParams' => request()->query() ?: null,
            'success' => session('success')
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $reservation = $this->reservationModel->findOrFail($id);

        return Inertia::render('Home/Player/Reservations/MyReservations/ShowReservation', [
            'reservation' => new ShowMyReservationResource($reservation)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $reservation = $this->reservationModel->findOrFail($id);

        return Inertia::render('Home/Player/Reservations/MyReservations/ShowReservation', [
            'reservation' => new EditMyReservationResource($reservation)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $reservation = $this->reservationModel->findOrFail($id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
