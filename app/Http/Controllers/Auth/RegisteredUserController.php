<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\ClubRegistrationRequest;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;
use App\Http\Requests\Auth\Register\ClubRegisterRequest;
use App\Http\Requests\Auth\Register\PlayerRegisterRequest;
use App\Notifications\Club\RegisterRequestNotification;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(string $user_type): Response
    {
        $page = "Auth/" . ucfirst($user_type) . "/Register";

        return Inertia::render($page);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function storePlayer(PlayerRegisterRequest $request)
    {
        
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'role' => 'player',
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        return Inertia::render('Auth/Player/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function storeClub(ClubRegisterRequest $request)
    {
        $club = ClubRegistrationRequest::create([
            'name' => $request->name,
            'email' => $request->email,
            'cnpj' => $request->cnpj,
            'trading_name' => $request->trading_name,
            'state' => $request->state,
            'city' => $request->ciy,
            'phonenumber' => $request->phonenumber
        ]);

        // Send notification to club
        $club->notify(new RegisterRequestNotification($request->password));

        return Inertia::render('Auth/Club/Register');
    } 
}
