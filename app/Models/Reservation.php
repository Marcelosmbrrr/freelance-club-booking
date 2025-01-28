<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class Reservation extends Model
{
    protected $fillable = [
        'player_id', 'court_id', 'total_players', 'price', 'is_public', 'date', 'status'
    ];

    public function player()
    {
        return $this->belongsTo(Player::class);
    }

    public function court()
    {
        return $this->belongsTo(Court::class);
    }

    public function club()
    {
        return $this->hasOneThrough(Club::class, Court::class, 'id', 'id', 'court_id', 'club_id');
    }

    public function courtTimeSlots()
    {
        return $this->belongsToMany(CourtTimeSlot::class, 'reservation_court_time_slots')
                    ->using(ReservationCourtTimeSlot::class);
    }

    public function playerSlots()
    {
        return $this->hasMany(ReservationSlot::class);
    }

    // Getters

}
