<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReservationCourtTimeSlot extends Model
{
    protected $table = "reservation_court_time_slot";

    protected $fillable = [
        'reservation_id',
        'court_time_slot_id',
    ];

    public function reservation()
    {
        return $this->belongsTo(Reservation::class);
    }

    public function courtTimeSlot()
    {
        return $this->belongsTo(CourtTimeSlot::class);
    }
}
