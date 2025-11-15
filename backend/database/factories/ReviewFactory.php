<?php

namespace Database\Factories;

use App\Models\Movie;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Review>
 */
class ReviewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $reviews = [
            'Excelente película, muy recomendada.',
            'Una obra maestra del cine.',
            'Buena película pero con algunos defectos.',
            'Entretenida pero nada especial.',
            'Muy decepcionante, no la recomiendo.',
            'Increíble cinematografía y actuaciones.',
            'Historia interesante pero desarrollo lento.',
            'Perfecta para una noche de cine en casa.',
            'Actuaciones sobresalientes de todo el elenco.',
            'Efectos especiales impresionantes.'
        ];

        return [
            'user_id' => User::factory(),
            'movie_id' => Movie::factory(),
            'content' => fake()->randomElement($reviews),
            'rating' => fake()->numberBetween(1, 5),
            'review_date' => fake()->dateTimeBetween('-2 years', 'now'),
        ];
    }
}
