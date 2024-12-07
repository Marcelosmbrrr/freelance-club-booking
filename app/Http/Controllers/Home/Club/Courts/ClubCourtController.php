<?php

namespace App\Http\Controllers\Home\Club\Courts;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Court;
use App\Http\Resources\CourtResource;
use App\Models\TimeSlot;
use App\Http\Requests\Club\Courts\CreateCourtRequest;
use App\Http\Requests\Club\Courts\UpdateCourtRequest;

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
        $search = $request->input('search');
        $searchBy = $request->input('search_by');  
        $orderBy = $request->input('order_by', 'id');  
        $order = $request->input('order', 'asc');  
        $limit = $request->input('limit', 10);  
        $page = $request->input('page', 1); 

        $query = $this->courtModel->query();

        $query->where("club_id", Auth::user()->club->id);

        if ($search) {
            if (in_array($searchBy, ['name', 'sport', 'type', 'status'])) { 
                $query->where($searchBy, 'like', '%' . $search . '%');
            }
        }

        $query->orderBy($orderBy, $order);

        $data = $query->paginate($limit, ['*'], 'page', $page);

        return Inertia::render('Home/Club/Management/Courts/Index', [
            'pagination' => CourtResource::collection($data),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Home/Club/Management/Courts/CreateCourt', [
            "time_slots" => $this->timeSlotModel->select(['id', 'time'])->get()
        ]);
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
        $court = $this->courtModel->where("id", $id)->with(["time_slots:id,time"])->firstOrFail();
      
        return Inertia::render('Home/Club/Management/Courts/ShowCourt', [
            "court" => new CourtResource($court)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $court = $this->courtModel->where("id", $id)->with(["time_slots:id"])->firstOrFail();
      
        return Inertia::render('Home/Club/Management/Courts/EditCourt', [
            "court" => new CourtResource($court),
            "time_slots" => $this->timeSlotModel->select(['id', 'time'])->get()
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
