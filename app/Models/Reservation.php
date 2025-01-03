<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $fillable = [
        'player_id',
        'court_id',
        'total_players',
        'is_public',
        'date',
        'is_filled',
        'status',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'date' => 'date'
        ];
    }

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

    public function timeSlots()
    {
        return $this->belongsToMany(CourtTimeSlot::class, 'reservation_court_time_slot', 'reservation_id', 'court_time_slot_id');
    }

    public function slots()
    {
        return $this->hasMany(ReservationSlot::class);
    }

}
