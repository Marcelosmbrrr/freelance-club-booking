<?php

namespace App\Http\Controllers\Home\Club\Reservations;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Club;
use App\Models\Court;
use App\Models\Reservation;
use App\Http\Resources\Club\Reservations\ReservationsResource;
use App\Http\Resources\Club\Reservations\EditReservationResource;
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
        $orderBy = $request->input('order_by', 'id');
        $order = $request->input('order', 'asc');
        $limit = $request->input('limit', 10);
        $page = $request->input('page', 1);

        $courtId = $request->input('court');
        $status = $request->input('status', 'all');
        $date = $request->input('date'); 
        $min_price = $request->input('min_price', 0); 
        $max_price = $request->input('max_price', 100); 

        $clubId = Auth::user()->club->id;

        if (!$clubId) {
            abort(403, 'Usuário não está associado a um clube.');
        }

        $query = $this->reservationModel->query();

        $query->select('id', 'price', 'is_public', 'status', 'date', 'court_id', 'player_id');

        $query->whereHas('club', function ($q) use ($clubId) {
            $q->where('clubs.id', $clubId); 
        });  

        if ($courtId) {
            $query->where('court_id', $courtId);
        } else {
            $firstCourtId = $this->courtModel->where('club_id', $clubId)->orderBy('id')->first()->id;
            $query->where('court_id', $firstCourtId);
        }

        if ($status && $status != "all") {
            $query->where('status', $status);
        }

        if ($date) {
            $query->whereDate('date', '=', $date);
        }

        if ($min_price && $max_price) {
            $query->whereBetween('price', [$min_price, $max_price]);
        }

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
            'courts' => fn () => $this->courtModel->where("club_id", $clubId)->select(['id', 'name'])->get(),
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

        $query->with([
            'court.promotions',
            'courtTimeSlots'
        ]);

        $query->select('id', 'status', 'date', 'total_players', 'court_id', 'player_id', 'price'); // Incluído 'price'

        $reservation = $query->findOrFail($id); // findOrFail garante a busca pelo ID específico

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
