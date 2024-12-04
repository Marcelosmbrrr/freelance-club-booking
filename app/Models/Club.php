<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Client;

class Club extends Model
{
    protected $fillable = [
        'user_id', 
        'phonenumber', 
        'address', 
        'latitude', 
        'longitude', 
        'avatar', 
        'images',
    ];
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function clients()
    {
        return $this->hasMany(Client::class);
    }
}
