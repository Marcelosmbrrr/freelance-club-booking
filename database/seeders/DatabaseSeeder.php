<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::insert(
            [
                'name' => 'User Admin',
                'email' => 'admin@app.com',
                'email_verified_at' => now(),
                'password' => 'admin123',
                'role' => 'admin'
            ],
            [
                'name' => 'User Player',
                'email' => 'player@app.com',
                'email_verified_at' => now(),
                'password' => 'player123',
                'role' => 'player'
            ],
            [
                'name' => 'User Club',
                'email' => 'club@app.com',
                'email_verified_at' => now(),
                'password' => 'club123',
                'role' => 'club'
            ]
        );
    }
}
