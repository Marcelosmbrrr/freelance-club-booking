<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReservationCourtTimeSlot extends Model
{
    protected $table = 'reservation_court_time_slots';

    protected $fillable = ['reservation_id', 'court_time_slot_id'];
}
