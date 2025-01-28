<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CourtTimeSlot extends Model
{
    protected $table = "court_time_slots";

    protected $fillable = ['court_id', 'time_slot_id', 'weekday', 'available'];

    public function court()
    {
        return $this->belongsTo(Court::class);
    }

    public function timeSlot()
    {
        return $this->belongsTo(TimeSlot::class);
    }

    public function reservations()
    {
        return $this->belongsToMany(Reservation::class, 'reservation_court_time_slots')
                    ->using(ReservationCourtTimeSlot::class);
    }

    public function promotions()
    {
        return $this->hasMany(CourtPromotion::class);
    }

    // Getters

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
