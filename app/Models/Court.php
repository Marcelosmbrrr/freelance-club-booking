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
        'total_players',
        'is_covered',
        'type',
        'grass_type',
        'floor_type',
        'can_play_outside',
        'description',
        'installation_year',
        'manufacturer',
        'status',
        'images',
        'sponsor_image',
        'price',
    ]; 
    
    public function club()
    {
        return $this->belongsTo(Club::class);
    }

    public function timeSlots()
    {
        return $this->belongsToMany(TimeSlot::class, 'court_time_slot')->withPivot('weekday', 'available');
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class, "court_id");
    }
}
