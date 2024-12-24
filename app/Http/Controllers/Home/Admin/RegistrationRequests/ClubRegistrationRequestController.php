<?php

namespace App\Http\Controllers\Home\Admin\RegistrationRequests;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Inertia;
use App\Models\ClubRegistrationRequest;
use App\Models\User;
use App\Http\Resources\Admin\RegistrationRequests\ClubRegistrationRequestResource;

class ClubRegistrationRequestController extends Controller
{
    function __construct(ClubRegistrationRequest $clubRegistrationRequestModel, User $userModel)
    {
        $this->clubRegistrationRequestModel = $clubRegistrationRequestModel;
        $this->userModel = $userModel;
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

        return Inertia::render('Home/Admin/Clubs/RegistrationRequests/Index', [
            'pagination' => ClubRegistrationRequestResource::collection($data),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $club_request = $this->clubRegistrationRequestModel->find($id);

        return Inertia::render('Home/Admin/Clubs/RegistrationRequests/EditRequest',[
            'result' => new ClubRegistrationRequestResource($club_request)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $club_request = $this->clubRegistrationRequestModel->find($id);

        $slug = Str::slug($club_request->trading_name);

        $user = $this->userModel->create([
            "name" => $club_request->name,
            "email" => $club_request->email,
            "role" => "club",
            "email_verified_at" => now(),
            "password" => Hash::make($slug),
        ]);

        $user->club()->create([
            "trading_name" => $club_request->trading_name,
            "state" => $club_request->state,
            "city" => $club_request->city,
            "phonenumber" => $club_request->phonenumber,
            "slug" => $slug
        ]);

        // Enviar notificação

        return to_route('admin.registration-requests')
        ->with('success', 'A solicitação de registro do clube foi aceita.');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $club_request = $this->clubRegistrationRequestModel->find($id);

        $club_request->delete();

        return to_route('admin.registration-requests')
            ->with('success', 'A solicitação de registro do clube foi recusada.');
    }
}
