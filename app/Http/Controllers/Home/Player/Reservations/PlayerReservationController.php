<?php

namespace App\Http\Controllers\Home\Player\Reservations;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Reservation;
use App\Models\Club;
use App\Http\Resources\Player\Reservations\CreateReservationResource;
use App\Http\Resources\Player\Reservations\ReservationsResource;
use App\Http\Resources\Player\Reservations\EditReservationResource;
use App\Http\Resources\Player\Reservations\ShowReservationResource;

class PlayerReservationController extends Controller
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
        $searchBy = $request->input('search_by', 'id');
        $orderBy = $request->input('order_by', 'id');
        $order = $request->input('order', 'asc');
        $limit = $request->input('limit', 10);
        $page = $request->input('page', 1);
        $group = $request->input('group', 'pending');

        $query = $this->reservationModel->query();

        $query->where("player_id", Auth::user()->player->id);

        $query->with([
            'court' => function ($query) {
                $query->select('id', 'name', 'description', 'images');
            },
        ]);

        if ($search && $searchBy) {
            $query->where($searchBy, 'like', '%' . $search . '%');
        }

        $query->orderBy('reservations.' . $orderBy, $order);

        $data = $query->paginate($limit, ['*'], 'page', $page);

        return Inertia::render('Home/Player/Reservations/Index', [
            'pagination' => ReservationsResource::collection($data), 
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $search = $request->input('search');
        $searchBy = $request->input('search_by', 'id');
        $orderBy = $request->input('order_by', 'id');
        $order = $request->input('order', 'asc');
        $limit = $request->input('limit', 10);
        $page = $request->input('page', 1);

        $query = $this->clubModel->query();

        if ($search && $searchBy) {
            $query->where($searchBy, 'like', '%' . $search . '%');
        }

        $query->orderBy('clubs.' . $orderBy, $order);

        $data = $query->paginate($limit, ['*'], 'page', $page);

        return Inertia::render('Home/Player/Reservations/CreateReservation', [
            'pagination' =>  CreateReservationResource::collection($data),
            'queryParams' => request()->query() ?: null,
            'success' => session('success')
        ]);
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
        $reservation = $this->reservationModel->where("player_id", Auth::user()->id)->firstOrFail();

        return Inertia::render('Home/Player/Reservations/ShowReservation', [
            'reservation' => new ShowReservationResource($reservation)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return Inertia::render('Home/Player/Reservations/EditReservation');
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
