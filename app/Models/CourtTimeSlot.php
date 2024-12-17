<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CourtTimeSlot extends Model
{
   protected $table = "court_time_slot";

   protected $fillable = ['court_id', 'time_slot_id', 'weekday', 'available'];

    public function court()
    {
        return $this->belongsTo(Court::class);
    }

    public function time_slot()
    {
        return $this->belongsTo(TimeSlot::class);
    }

    /* 
        - reservation_court_time_slot is an intermediary table
    */
   public function reservations(){
    return $this->belongsToMany(Reservation::class, 'reservation_court_time_slots');
    }

    public static function getAvailableCourtTimeSlots()
    {
        return self::where(function ($query) {
            $query->whereHas('reservations', function ($query) {
                $query->whereIn('status', ['completed', 'cancelled']);
            });
        })->orWhereDoesntHave('reservations') 
        ->get();
    }

}
