<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Club;

class Court extends Model
{
    protected $fillable = [
        'club_id',
        'name',
        'sport',
        'structure_type',
        'grass_type',
        'can_play_outside',
        'description',
        'installation_year',
        'manufacturer',
        'status',
        'images',
        'sponsor_images'
    ];
    
    public function club() {
        return $this->belongsTo(Club::class);
    }

    public function time_slots()
    {
        return $this->belongsToMany(TimeSlot::class, 'court_time_slot')
                    ->withPivot('weekday', 'available');
    }


    public function reservations()
    {
        return $this->hasManyThrough(
            Reservation::class,
            CourtTimeSlot::class,
            'court_id', 
            'id', 
            'id', 
            'id'  
        );
    }
}
