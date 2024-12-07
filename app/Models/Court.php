<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Court extends Model
{

    public function time_slots()
    {
        return $this->belongsToMany(TimeSlot::class, 'court_time_slot')
                    ->withPivot('available')
                    ->withTimestamps();
    }
}
