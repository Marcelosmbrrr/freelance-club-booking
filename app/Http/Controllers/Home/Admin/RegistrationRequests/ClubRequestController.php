<?php

namespace App\Http\Controllers\Home\Admin\RegistrationRequests;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ClubRegistrationRequest;
use App\Http\Resources\Admin\RegistrationRequests\ClubRegistrationRequestResource;

class ClubRequestController extends Controller
{
    function __construct(ClubRegistrationRequest $clubRegistrationRequestModel)
    {
        $this->clubRegistrationRequestModel = $clubRegistrationRequestModel;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $searchBy = $request->input('search_by', 'name');  
        $orderBy = $request->input('order_by', 'id');  
        $order = $request->input('order', 'asc');  
        $limit = $request->input('limit', 10);  
        $page = $request->input('page', 1); 

        $query = $this->clubRegistrationRequestModel->query();

        if ($search) {
            if (in_array($searchBy, ['name', 'email', 'cnpj', 'city', 'state'])) { 
                $query->where($searchBy, 'like', '%' . $search . '%');
            }
        }

        $query->orderBy($orderBy, $order);

        $data = $query->paginate($limit, ['*'], 'page', $page);

        return Inertia::render('Home/Admin/Clubs/Requests/Index', [
            'pagination' => ClubRegistrationRequestResource::collection($data),
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
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $club_request = $this->clubRegistrationRequestModel->find($id);

        return Inertia::render('Home/Admin/Clubs/Requests/EditRequest',[
            'result' => new ClubRegistrationRequestResource($club_request)
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
