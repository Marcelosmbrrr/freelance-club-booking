<?php

namespace App\Http\Controllers\Home\Club\Courts;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Court;
use App\Models\TimeSlot;
use App\Http\Requests\Club\Courts\CreateCourtRequest;
use App\Http\Requests\Club\Courts\UpdateCourtRequest;
use App\Http\Resources\Club\Courts\CourtsResource;
use App\Http\Resources\Club\Courts\EditCourtResource;
use App\Http\Resources\Club\Courts\ShowCourtResource;

class ClubCourtController extends Controller
{
    function __construct(Court $courtModel, TimeSlot $timeSlotModel)
    {
        $this->courtModel = $courtModel;
        $this->timeSlotModel = $timeSlotModel;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $validated = $request->validate([
            'search' => 'nullable|string',
            'search_by' => 'nullable|in:name,sport,type,status,manufacturer',
            'order_by' => 'nullable|string',
            'order' => 'nullable|in:asc,desc',
            'limit' => 'nullable|integer|min:1',
            'page' => 'nullable|integer|min:1',
            'status' => 'nullable|boolean',
            'type' => 'nullable|string',
            'sport' => 'nullable|string',
            'cover' => 'nullable|in:all,covered,uncovered',
            'manufacturer' => 'nullable|string',
            'installation_year' => 'nullable|integer',
            'weekday' => 'nullable|in:all,monday,tuesday,wednesday,thursday,friday,saturday,sunday',
        ]);

        $search = $validated['search'] ?? null;
        $searchBy = $validated['search_by'] ?? null;
        $orderBy = $validated['order_by'] ?? 'id';
        $order = $validated['order'] ?? 'asc';
        $limit = $validated['limit'] ?? 10;
        $page = $validated['page'] ?? 1;
        $status = $validated['status'] ?? true;
        $type = $validated['type'] ?? 'all';
        $sport = $validated['sport'] ?? 'all';
        $cover = $validated['cover'] ?? 'all';
        $manufacturer = $validated['manufacturer'] ?? null;
        $installation_year = $validated['installation_year'] ?? null;
        $weekday = $validated['weekday'] ?? 'all';

        $query = $this->courtModel->query();
        $query->where('club_id', Auth::user()->club->id);

        if ($search && $searchBy) {
            $query->where($searchBy, 'like', '%' . $search . '%');
        }

        $filters = [
            'status' => $status,
            'type' => $type !== 'all' ? $type : null,
            'sport' => $sport != 'all' ? $sport : null,
            'is_covered' => $cover === 'covered' ? true : ($cover === 'uncovered' ? false : null),
            'manufacturer' => $manufacturer,
            'installation_year' => $installation_year,
        ];

        foreach ($filters as $field => $value) {
            if ($value !== null) {
                $query->where($field, $value);
            }
        }

        if ($weekday && $weekday !== 'all') {
            $query->whereHas('timeSlots', function ($query) use ($weekday) {
                $query->where('weekday', $weekday);
            });
        }

        $validColumns = ['id', 'name', 'sport', 'type', 'status', 'manufacturer', 'installation_year'];
        $orderBy = in_array($orderBy, $validColumns) ? $orderBy : 'id';
        $query->orderBy($orderBy, $order);

        $data = $query->paginate($limit, ['*'], 'page', $page);

        return Inertia::render('Home/Club/Courts/Index', [
            'pagination' => CourtsResource::collection($data),
            'queryParams' => $validated,
            'success' => session('success'),
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Home/Club/Courts/CreateCourt');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateCourtRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $court = $this->courtModel
        ->where("id", $id)
        ->with(["timeSlots" => function($query) {
                $query->select('time_slots.id', 'time_slots.start_time', 'time_slots.end_time') 
                    ->addSelect('court_time_slot.weekday', 'court_time_slot.available'); 
            }
        ])
        ->firstOrFail();
      
        return Inertia::render('Home/Club/Courts/ShowCourt', [
            "court" => new ShowCourtResource($court)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $court = $this->courtModel
        ->where("id", $id)
        ->with(["timeSlots" => function($query) {
                $query->select(['time_slots.id', 'time_slots.start_time', 'time_slots.end_time']) 
                    ->addSelect('court_time_slot.weekday', 'court_time_slot.available'); 
            }
        ])
        ->firstOrFail();
      
        return Inertia::render('Home/Club/Courts/EditCourt', [
            "court" => new EditCourtResource($court),
            "time_slots" => $this->timeSlotModel->select(['id', 'start_time', 'end_time'])->get()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCourtRequest $request, string $id)
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
