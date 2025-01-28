<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class CourtImage extends Model
{
    public function getImagePathAttribute($value)
    {
        return Storage::url($value);
    }
}
