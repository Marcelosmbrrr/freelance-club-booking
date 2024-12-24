<?php

namespace App\Http\Controllers\Home\Admin\Clubs;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Http\Resources\Admin\RegisteredClubs\RegisteredClubResource;

class RegisteredClubController extends Controller
{
    function __construct(User $userModel)
    {
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

        $query = $this->userModel->query();

        $query->where("role", "club");

        $query->with("club");
        
        if ($search) {
            if (in_array($searchBy, ['name', 'email', 'cnpj', 'city', 'state'])) { 
                $query->where($searchBy, 'like', '%' . $search . '%');
            }
        }

        $query->orderBy($orderBy, $order);

        $data = $query->paginate($limit, ['*'], 'page', $page);

        return Inertia::render('Home/Admin/Clubs/Registered/Index', [
            'pagination' => RegisteredClubResource::collection($data),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = $this->userModel->with("club")->find($id);

        return Inertia::render('Home/Admin/Clubs/Registered/ShowClub', [
            'club' => $user
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $user = $this->userModel->find($id);

        return Inertia::render('Home/Admin/Clubs/Registered/EditClub', [
            'club' => $user
        ]);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = $this->userModel->find($id);

        //

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = $this->userModel->find($id);

        $user->delete();

        return to_route('admin.clubs')
            ->with('success', 'O clube foi excluído com sucesso.');
    }
}
