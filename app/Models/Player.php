<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Player extends Model
{
    protected $fillable = [
        'user_id',
        'phonenumber',
        'cpf',
        'birth_date',
        'avatar_image',
        'court_side',
        'match_type',
        'best_hand'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
