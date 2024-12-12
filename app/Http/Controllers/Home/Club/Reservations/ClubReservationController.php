<?php

namespace App\Http\Controllers\Home\Club\Reservations;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Club;
use App\Models\Reservation;
use App\Http\Resources\Club\Reservations\ReservationsResource;
use App\Http\Resources\Club\Reservations\EditReservationResource;
use App\Http\Resources\Club\Reservations\ShowReservationResource;

class ClubReservationController extends Controller
{
    function __construct(Club $clubModel, Reservation $reservationModel)
    {
        $this->clubModel = $clubModel;
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

        $clubId = Auth::user()->club->id;

        if (!$clubId) {
            abort(403, 'Usuário não está associado a um clube.');
        }

        $query = $this->reservationModel->query();

        $query->select('id', 'status', 'date', 'court_id', 'player_id');

        $query->whereHas('club', function ($q) use ($clubId) {
            $q->where('clubs.id', $clubId); 
        });  
        
        $query->with([
            'player' => function ($query) {
                $query->select('id', 'user_id') 
                      ->with(['user' => function ($query) {
                          $query->select('id', 'name', 'email'); 
                      }]);
            },
            'court' => function ($query) {
                $query->select('id', 'name');
            },
        ]);
                    
        if ($search && $searchBy) {
            $query->where($searchBy, 'like', '%' . $search . '%');
        }

        $query->orderBy('reservations.' . $orderBy, $order);

        $data = $query->paginate($limit, ['*'], 'page', $page);

        return Inertia::render('Home/Club/Reservations/Index', [
            'pagination' => ReservationsResource::collection($data), 
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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
        $query = $this->reservationModel->query();

        $query->select('id', 'status', 'date', 'court_id', 'player_id');

        $reservation = $query->firstOrFail();

        return Inertia::render('Home/Club/Reservations/ShowReservation', [
            'reservation' => new ShowReservationResource($reservation)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $reservation = $this->reservationModel->findOrFail($id);

        return Inertia::render('Home/Club/Reservations/EditReservation', [
            'reservation' => new EditReservationResource($reservation)
        ]);
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
