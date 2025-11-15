<?php

namespace Database\Seeders;

use App\Models\Genre;
use App\Models\Movie;
use Illuminate\Database\Seeder;

class MovieSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Crear géneros únicos
        $genres = [
            'Acción', 'Aventura', 'Comedia', 'Drama', 'Terror', 'Ciencia Ficción',
            'Romance', 'Thriller', 'Misterio', 'Fantasía', 'Animación', 'Documental',
            'Musical', 'Western', 'Crimen', 'Guerra', 'Biografía', 'Historia',
        ];

        foreach ($genres as $genreName) {
            Genre::create(['genre_name' => $genreName]);
        }

        // Crear películas con géneros existentes
        Movie::factory(100)->create([
            'genre_id' => function () {
                return Genre::inRandomOrder()->first()->id;
            },
        ]);
    }
}
