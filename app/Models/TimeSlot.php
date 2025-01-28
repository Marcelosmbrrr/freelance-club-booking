<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TimeSlot extends Model
{
    protected $table = "time_slots";

    public function courts()
    {
        return $this->belongsToMany(Court::class, 'court_time_slots')
                    ->using(CourtTimeSlot::class)
                    ->withPivot('weekday', 'available')
                    ->withTimestamps();
    }
}
