<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReservationSlot extends Model
{
    use HasFactory;

    protected $fillable = [
        'reservation_id',
        'player_id',
        'position',
    ];

    public function player()
    {
        return $this->belongsTo(Player::class);
    }
}
