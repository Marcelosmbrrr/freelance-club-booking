<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
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
        'pricing',
    ]; 

    protected $casts = [
        'pricing' => 'array', 
    ];

    protected $appends = ['min_price', 'promotions_by_weekday'];
    
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

    public function promotions()
    {
        return $this->hasMany(Promotion::class, "court_id");
    }

    // Getters

    public function getImagesAttribute($value)
    {
        $urls = [];
        
        $images = Storage::disk('public')->allFiles($value);

        if (count($images) > 0) {
            $urls = array_map(fn($image) => Storage::url($image), $images);
        }

        return $urls;
    }

    public function getGeolocalizationAttribute() {
        return $this->club->geolocalization;
    }

    public function getSponsorImageAttribute($value)
    {
        return Storage::url($value);
    }

    public function getMinPriceAttribute()
    {
        return collect($this->pricing)->min('price');
    }

    public function getPromotionsByWeekdayAttribute() {
        return $this->promotions->groupBy('weekday')->map(function ($promotions) {
            return $promotions->map(function ($promotion) {
                return [
                    'id' => $promotion->id,
                    'start_time' => $promotion->start_time,
                    'end_time' => $promotion->end_time,
                    'discount' => $promotion->discount,
                ];
            });
        });
    }
}
