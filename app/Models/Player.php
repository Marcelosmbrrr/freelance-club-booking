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

    public function getSavedClubsAttribute()
    {
        $reservationsAsCreator = $this->reservations()
            ->with('club')
            ->get();

        $reservationsAsParticipant = Reservation::whereHas('playerSlots', function ($query) {
                $query->where('player_id', $this->id);
            })
            ->with('club')
            ->get();

        $allReservations = $reservationsAsCreator->merge($reservationsAsParticipant);

        $clubs = $allReservations->pluck('club')
            ->unique('id') 
            ->map(function ($club) {
                return [
                    'id' => $club->id,
                    'name' => $club->name,
                ];
            })
            ->values();

        return $clubs;
    }
}
