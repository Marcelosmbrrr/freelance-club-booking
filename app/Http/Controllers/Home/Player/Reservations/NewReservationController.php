<?php

namespace App\Http\Controllers\Home\Player\Reservations;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Reservation;
use App\Models\Club;
use App\Models\Court;
use App\Http\Resources\Player\Reservations\NewReservation\NewReservationResource;
use App\Http\Resources\Player\Reservations\NewReservation\CreateReservationResource;
use App\Http\Resources\Player\Reservations\NewReservation\CourtTimeSlotsAvailabilityResource;

class NewReservationController extends Controller
{
    function __construct(Reservation $reservationModel, Club $clubModel, Court $courtModel)
    {
        $this->reservationModel = $reservationModel;
        $this->clubModel = $clubModel;
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

        $query = $this->clubModel->query();

        if ($search && $searchBy) {
            $query->where($searchBy, 'like', '%' . $search . '%');
        }

        $query->orderBy('clubs.' . $orderBy, $order);

        $data = $query->paginate($limit, ['*'], 'page', $page);

        return Inertia::render('Home/Player/Reservations/NewReservation/Index', [
            'pagination' =>  NewReservationResource::collection($data),
            'queryParams' => request()->query() ?: null,
            'success' => session('success')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $clubId = $request->input('clubId');
        $courtId = $request->input('courtId');
        $date = $request->input('date');

        return Inertia::render('Home/Player/Reservations/NewReservation/CreateReservation', [
            'club' =>  new CreateReservationResource($this->clubModel->with(['courts'])->find($clubId)),
            'court_available_time_slots' => Inertia::lazy(fn () => new CourtTimeSlotsAvailabilityResource($this->courtModel->with(['reservations' => function ($query) use ($date) {
                $query->whereDate('date', $date);
            }])->find($courtId)))
        ]);
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }
}
