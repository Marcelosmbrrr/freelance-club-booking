<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
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

    // Getters

    public function getNameAttribute($value)
    {
        return $value->user->name;
    }

    public function getAvatarImageAttribute($value) {
        return Storage::url($value);
    }
}
