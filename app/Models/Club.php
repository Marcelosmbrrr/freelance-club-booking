<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Client;

class Club extends Model
{
    protected $fillable = [
        'user_id',
        'cnpj',
        'trading_name',
        'phonenumber',
        'zip_code',
        'address',
        'city',
        'state',
        'description',
        'images',
        'slug',
        'instagram',
        'facebook',
        'whatsapp',
        'geolocalization',
    ];   

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function courts()
    {
        return $this->hasMany(Court::class);
    }

    public function clients()
    {
        return $this->hasMany(Client::class);
    }

    public function reservations()
    {
        return $this->hasManyThrough(Reservation::class, Court::class, 'club_id', 'court_id', 'id', 'id');
    }
}
