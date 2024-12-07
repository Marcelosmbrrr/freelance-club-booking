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
        'address',
        'latitude',
        'longitude',
        'avatar',
        'image_folder',
        'logo'
    ];
    
    public function user()
    {
        return $this->belongsTo(User::class);
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
