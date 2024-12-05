<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EmailVerificationPromptController extends Controller
{
    /**
     * Display the email verification prompt.
     */
    public function __invoke(Request $request): RedirectResponse|Response
    {
        $dashboard_route_name = "dashboard." . $request->user()->role;

        return $request->user()->hasVerifiedEmail()
                    ? redirect()->intended(route($dashboard_route_name, absolute: false))
                    : Inertia::render('Auth/VerifyEmail', ['status' => session('status')]);
    }
}
