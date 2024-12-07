<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $fillable = ['player_id', 'court_id', 'status'];

    public function player()
    {
        return $this->belongsTo(Player::class);
    }

    public function court()
    {
        return $this->belongsTo(Court::class);
    }

    /* 
        - reservation_court_time_slot is an intermediary table
    */
    public function timeSlots()
    {
        return $this->belongsToMany(CourtTimeSlot::class, 'reservation_court_time_slot');
    }

}
