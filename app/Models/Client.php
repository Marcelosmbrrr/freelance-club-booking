<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Player;
use App\Models\Club;

class Client extends Model
{
    protected $fillable = [
        'player_id',
        'club_id',
        'balance',
        'debit',
    ];

    public function player()
    {
        return $this->belongsTo(Player::class);
    }

    public function club()
    {
        return $this->belongsTo(Club::class);
    }
}
