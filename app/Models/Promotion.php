<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Promotion extends Model
{
    protected $table = 'court_promotions';

    protected $fillable = [
        'court_time_slot_id',
        'discount',
    ];

    public function court()
    {
        return $this->belongsTo(Court::class);
    }
}
