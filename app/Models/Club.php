<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use App\Models\User;

class Club extends Model
{
    protected $fillable = [
        'user_id',
        'cnpj',
        'trading_name',
        'phonenumber',
        'zip_code',
        'address',
        'city',
        'state',
        'description',
        'images',
        'slug',
        'instagram',
        'facebook',
        'whatsapp',
        'geolocalization',
    ];   

    protected $appends = ['name', 'min_price', 'sports', 'opening_hours'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function courts()
    {
        return $this->hasMany(Court::class);
    }

    public function reservations()
    {
        return $this->hasManyThrough(Reservation::class, Court::class, 'club_id', 'court_id', 'id', 'id');
    }

    // Getters

    public function getNameAttribute()
    {
        return $this->user->name;
    }

    public function getSportsAttribute()
    {
        return $this->courts->pluck('sport')->unique()->values()->all();
    }

    public function getMinPriceAttribute() 
    {
        return $this->courts->map(function ($court) {
            return collect($court->pricing)->min('price');
        })->min();
    }

    public function getImagesAttribute($value)
    {
        $urls = [];
        
        $images = Storage::disk('public')->allFiles($value);

        if (count($images) > 0) {
            $urls = array_map(fn($image) => Storage::url($image), $images);
        }

        return $urls;
    }

    public function getGeolocalizationAttribute($value) 
    {
        $value = explode(",", $value);

        return ["lat" => $value[0], "lng" => $value[1]];
    }

    public function getOpeningHoursAttribute() {

    }

}
