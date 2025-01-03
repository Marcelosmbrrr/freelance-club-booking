<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Player extends Model
{
    protected $fillable = [
        'user_id',
        'phonenumber',
        'sex',
        'cpf',
        'birth_date',
        'best_hand',
        'court_side',
        'match_type',
        'avatar_image',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
}
