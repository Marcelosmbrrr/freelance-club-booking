<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class ClubRegistrationRequest extends Model
{
    use Notifiable;

    protected $table = 'clubs_registration_requests';

    protected $fillable = [
        'name',
        'email',
        'cnpj',
        'trading_name',
        'state',
        'city',
        'phonenumber',
    ];
}
