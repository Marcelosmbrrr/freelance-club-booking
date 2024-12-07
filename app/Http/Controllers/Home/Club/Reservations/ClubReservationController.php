<?php

namespace App\Http\Controllers\Home\Club\Reservations;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Club;
use App\Models\Reservation;
use App\Http\Resources\Club\ClubReservationResource;

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

    // Obtém o clube logado
    $club = $this->clubModel->find(Auth::user()->club->id);

    if (!$club) {
        abort(404, 'Clube não encontrado.');
    }

    $query = $club->reservations();

    $query->where('status', $group);

    if ($search && $searchBy) {
        $query->where($searchBy, 'like', '%' . $search . '%');
    }

    $query->orderBy($orderBy, $order);

    $data = $query->paginate($limit, ['*'], 'page', $page);

    return Inertia::render('Home/Club/Management/Reservations/Index', [
        'pagination' => ClubReservationResource::collection($data), 
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
        $reservation = $this->reservationModel->findOrFail($id);

        return Inertia::render('Home/Club/Management/Reservations/ShowReservation', [
            'reservation' => new ClubReservationResource($reservation)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $reservation = $this->reservationModel->findOrFail($id);

        return Inertia::render('Home/Club/Management/Reservations/EditReservation', [
            'reservation' => new ClubReservationResource($reservation)
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
