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
        'type',
        'status',
        'description',
        'image_folder',
        'logo'
    ];
    
    public function club() {
        return $this->belongsTo(Club::class);
    }

    public function time_slots()
    {
        return $this->belongsToMany(TimeSlot::class, 'court_time_slot')
                    ->withPivot('available')
                    ->withTimestamps();
    }
}
