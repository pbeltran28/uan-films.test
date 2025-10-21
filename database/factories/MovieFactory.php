<?php

namespace Database\Factories;

use App\Models\Genre;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Movie>
 */
class MovieFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $titles = [
            'El Padrino', 'El Señor de los Anillos', 'Pulp Fiction', 'Forrest Gump',
            'Matrix', 'Titanic', 'Avatar', 'Inception', 'Interstellar', 'Gladiator',
            'El Rey León', 'Toy Story', 'Jurassic Park', 'Terminator', 'Alien',
            'Blade Runner', '2001: Una Odisea del Espacio', 'Casablanca', 'Citizen Kane'
        ];

        $directors = [
            'Francis Ford Coppola', 'Peter Jackson', 'Quentin Tarantino', 'Robert Zemeckis',
            'Christopher Nolan', 'James Cameron', 'Ridley Scott', 'Steven Spielberg',
            'Stanley Kubrick', 'Michael Curtiz', 'Orson Welles', 'Tim Burton'
        ];

        $cast = [
            'Leonardo DiCaprio, Marion Cotillard, Tom Hardy',
            'Tom Hanks, Robin Wright, Gary Sinise',
            'Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss',
            'Russell Crowe, Joaquin Phoenix, Connie Nielsen',
            'Matthew McConaughey, Anne Hathaway, Jessica Chastain',
            'Harrison Ford, Rutger Hauer, Sean Young',
            'Humphrey Bogart, Ingrid Bergman, Paul Henreid',
            'Orson Welles, Joseph Cotten, Dorothy Comingore'
        ];

        return [
            'title' => fake()->randomElement($titles),
            'release_year' => fake()->numberBetween(1950, 2024),
            'synopsis' => fake()->paragraph(3),
            'director' => fake()->randomElement($directors),
            'cast' => fake()->randomElement($cast),
            'genre_id' => Genre::inRandomOrder()->first()?->id ?? Genre::factory(),
            'hash_code' => fake()->unique()->sha1(),
            'poster_path' => fake()->imageUrl(300, 450, 'movies'),
            'original_title' => fake()->randomElement($titles),
            'original_language' => fake()->randomElement(['en', 'es', 'fr', 'de', 'it']),
            'popularity' => fake()->randomFloat(2, 0, 1000),
            'video' => fake()->boolean(30),
            'vote_average' => fake()->randomFloat(1, 0, 10),
            'vote_count' => fake()->numberBetween(0, 10000),
            'release_date' => fake()->dateTimeBetween('-50 years', 'now'),
        ];
    }
}
