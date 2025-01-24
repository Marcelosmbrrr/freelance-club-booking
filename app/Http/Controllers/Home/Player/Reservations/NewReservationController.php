<?php

namespace App\Http\Controllers\Home\Player\Reservations;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
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
        $searchBy = $request->input('searchBy', 'name');
        $orderBy = $request->input('orderBy', 'id');
        $order = $request->input('order', 'asc'); 
        $limit = $request->input('limit', 10); 
        $page = $request->input('page', 1);

        $entity = $request->input('entity', 'clubs');

        // Club and Court
        $sport = $request->input('sport', 'all');
        $type = $request->input('type', "all"); 
        $cover = $request->input('cover', "all"); 
        $manufacturer = $request->input('manufacturer'); 
        $installation_year = $request->input('installation_year');

        $query = $entity === "clubs" ? $this->clubModel->query() : $this->courtModel->query();

        if ($entity === "clubs") {
            $query->with(['user', 'courts']);
            if ($sport && $sport != "all") {
                $query->whereHas('courts', function ($courtQuery) use ($sport) {
                    $courtQuery->where('sport', $sport);
                });
            }
        } else {
            $query->with('club');
            if ($sport && $sport != "all") {
                $query->where('sport', $sport);
            }
        }

        if ($search) {
            if(in_array($searchBy, ['city', 'state'])) {
                $query->where($searchBy, 'like', '%' . $search . '%');

                if ($entity === 'courts') {
                    $query->orWhereHas('club', function ($clubQuery) use ($search, $searchBy) {
                        $clubQuery->where($searchBy, 'like', '%' . $search . '%');
                    });
                }
            }
        }

        if ($entity === 'courts') {
            $query->where('status', true);

            if ($type && $type != "all") {
                $query->where('type', $type);
            }

            if ($cover && $cover !== "all") {
                $query->where('is_covered', $cover === "covered");
            }

            if ($manufacturer) {
                $query->where('manufacturer', $manufacturer);
            }

            if ($installation_year) {
                $query->whereYear('installation_year', $installation_year);
            }
        }

        $query->orderBy("$entity." . $orderBy, $order);

        $data = $query->paginate($limit, ['*'], 'page', $page);

        return Inertia::render('Home/Player/Reservations/NewReservation/Index', [
            'pagination' =>  NewReservationResource::collection($data)->additional([
                'entity' => $entity,
            ]),
            'queryParams' => request()->query() ?: null,
            'success' => session('success')
        ]);
    }



    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request, string $clubId)
    {
        $courtId = $request->input('courtId');
        $search = $request->input('search'); 

        $date = $request->input('date', Carbon::today());
        $sport = $request->input('sport', 'padel');
        $type = $request->input('type'); 
        $cover = $request->input('cover', "all"); 
        //$min_price = $request->input("min_price", 0);
        //$max_price = $request->input("max_price", 100);

        $weekday = strtolower(Carbon::parse($date)->format('l'));

        return Inertia::render('Home/Player/Reservations/NewReservation/CreateReservation', [
            'club' => new CreateReservationResource(
                $this->clubModel->with(['courts' => function ($query) use ($sport, $type, $cover, $search) {
                    if ($sport && $sport != "all") {
                        $query->where('sport', $sport);
                    }
                    if ($type && $type != "all") {
                        $query->where('type', $type);
                    }
                    if ($cover && $cover !== "all") {
                        $query->where('is_covered', $cover === "covered");
                    }
                    if ($search) {
                        $query->where("name", 'like', '%' . $search . '%');
                    }
                }])->find($clubId)
            ),
            'court_available_time_slots' => Inertia::lazy(fn () => new CourtTimeSlotsAvailabilityResource(
                $this->courtModel->with([
                    'timeSlots' => function ($query) use ($weekday) {
                        $query->where('weekday', $weekday);
                    },
                    'reservations' => function ($query) use ($date) {
                        $query->whereDate('date', $date);
                    }
                ])->find($courtId)
            )),
            'queryParams' => request()->query() ?: null,
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
