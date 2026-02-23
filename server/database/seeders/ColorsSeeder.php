<?php

namespace Database\Seeders;

use App\Models\Colors;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ColorsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $colors = [
            '#0000FF', // blue
            '#000000', // black
            '#FFC0CB', // pink
            '#FFFF00', // yellow
            '#FF0000', // red
            '#FFFFFF', // white
            '#008000', // green
            '#800080', // purple
            '#FFA500', // orange
        ];
        foreach ($colors as $color) {
            Colors::create([
                'name' => $color
            ]);
        }
    }
}
