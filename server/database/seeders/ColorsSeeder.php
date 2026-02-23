<?php

namespace Database\Seeders;

use App\Models\Colors;
use Illuminate\Database\Seeder;

class ColorsSeeder extends Seeder
{
    public function run(): void
    {
        $colors = [
            ['name' => 'Azul',     'hexadecimal' => '#0000FF'],
            ['name' => 'Preto',    'hexadecimal' => '#000000'],
            ['name' => 'Rosa',     'hexadecimal' => '#FFC0CB'],
            ['name' => 'Amarelo',  'hexadecimal' => '#FFFF00'],
            ['name' => 'Vermelho', 'hexadecimal' => '#FF0000'],
            ['name' => 'Branco',   'hexadecimal' => '#FFFFFF'],
            ['name' => 'Verde',    'hexadecimal' => '#008000'],
            ['name' => 'Roxo',     'hexadecimal' => '#800080'],
            ['name' => 'Laranja',  'hexadecimal' => '#FFA500'],
        ];

        foreach ($colors as $color) {
            Colors::create($color);
        }
    }
}