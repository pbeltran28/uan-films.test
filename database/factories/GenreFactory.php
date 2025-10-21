<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Genre>
 */
class GenreFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $genres = [
            'Acción', 'Aventura', 'Comedia', 'Drama', 'Terror', 'Ciencia Ficción',
            'Romance', 'Thriller', 'Misterio', 'Fantasía', 'Animación', 'Documental',
            'Musical', 'Western', 'Crimen', 'Guerra', 'Biografía', 'Historia'
        ];

        return [
            'genre_name' => fake()->randomElement($genres),
        ];
    }
}
