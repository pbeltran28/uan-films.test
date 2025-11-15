<?php

namespace App\Console\Commands;

use App\Models\Genre;
use App\Models\Movie;
use Illuminate\Console\Command;
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Support\Facades\Http;

class SyncMovieDb extends Command
{
    const LANGUAGE = 'es';

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:sync-movie-db';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Se conecta a la API de MovieDB y sincroniza las películas con la base de datos';

    private function apiClient(): PendingRequest
    {
        return Http::baseUrl(config('services.movie_db.api_url'))
            ->withToken(config('services.movie_db.access_token'));
    }

    private function loadGenres(): void
    {
        $response = $this->apiClient()
            ->get('genre/movie/list', ['language' => self::LANGUAGE]);

        if ($response->failed()) {
            $this->error('Error al cargar los géneros: '.$response->body());

            return;
        }

        $genres = $response->collect('genres')
            ->map(function ($genre) {
                return [
                    'id' => $genre['id'],
                    'genre_name' => $genre['name'],
                ];
            })->toArray();

        Genre::upsert($genres, ['id'], ['genre_name']);
    }

    private function getMovieDirector(int $movieId): string
    {
        $response = $this->apiClient()
            ->get("movie/{$movieId}/credits", ['language' => self::LANGUAGE]);

        if ($response->failed()) {
            $this->error('Error al cargar el director de la película: '.$response->body());

            return 'Unknown';
        }

        return $response->collect('crew')
            ->firstWhere('job', 'Director')['name'];
    }

    private function getMovieVideoUrl(int $movieId): ?string
    {
        $response = $this->apiClient()
            ->get("movie/{$movieId}/videos", ['language' => self::LANGUAGE]);

        if ($response->failed()) {
            $this->error('Error al cargar el video de la película: '.$response->body());

            return null;
        }

        return $response->collect('results')
            ->firstWhere('type', 'Trailer')['key'] ?? null;
    }

    private function loadMovies($page = 1): int
    {
        $total = 0;
        $response = $this->apiClient()
            ->get('discover/movie', [
                'language' => self::LANGUAGE,
                'sort_by' => 'popularity.desc',
                'page' => $page,
                'include_adult' => false,
                'include_video' => true,
            ]);

        if ($response->failed()) {
            $this->error('Error al cargar las películas: '.$response->body());

            return 0;
        }

        $response->collect('results')
            ->each(function ($movie) use (&$total) {
                $videoKey = $this->getMovieVideoUrl($movie['id']);
                $videoUrl = $videoKey ? "https://www.youtube.com/watch?v={$videoKey}" : null;

                $payload = [
                    'tmdb_id' => $movie['id'],
                    'genre_id' => $movie['genre_ids'][0],
                    'title' => $movie['title'],
                    'release_year' => date('Y', strtotime($movie['release_date'])),
                    'synopsis' => $movie['overview'],
                    'director' => $this->getMovieDirector($movie['id']),
                    'poster_path' => "https://image.tmdb.org/t/p/w500/{$movie['poster_path']}",
                    'original_title' => $movie['original_title'],
                    'original_language' => $movie['original_language'],
                    'popularity' => $movie['popularity'],
                    'video_url' => $videoUrl,
                    'vote_average' => $movie['vote_average'],
                    'vote_count' => $movie['vote_count'],
                    'release_date' => $movie['release_date'],
                ];

                Movie::updateOrCreate(['tmdb_id' => $movie['id']], $payload);

                $total++;
            });

        return $total;
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->loadGenres();
        $totalMoviesLoaded = 0;
        $page = 1;

        $this->info('Cargando películas...');

        $start = microtime(true);

        do {
            $totalMoviesLoaded = $this->loadMovies($page);
            $page++;
        } while ($page <= 2);

        $end = microtime(true);
        $time = $end - $start;
        $this->info("Se han cargado {$totalMoviesLoaded} películas en {$time} segundos");
    }
}
