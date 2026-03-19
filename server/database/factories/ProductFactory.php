<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Size;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $height = $this->faker->randomFloat(1, 2, 3.5);   // espessura/altura da camiseta
        $width  = $this->faker->randomFloat(1, 30, 36);    // largura
        $length = $this->faker->randomFloat(1, 35, 40);    // comprimento
        $weight = $this->faker->randomFloat(2, 0.2, 0.4);  // peso em kg, 
        return [
            'name' => $this->faker->word(),
            'description' => $this->faker->sentence(),
            'price' => $this->faker->randomFloat(2, 10, 200), // Preço entre 10 e 200
            'lastPrice' => $this->faker->randomFloat(2, 50, 300),

            'width' => $width,
            'height' => $height,
            'length' => $length,
            'weight' => $weight,
            'fkCategory' => \App\Models\Category::inRandomOrder()->first()->id ?? null, // Categoria aleatória existente

            'fkSubcategory' => \App\Models\SubCategory::inRandomOrder()->first()->id, // Subcategoria aleatória existente


        ];
    }
}
