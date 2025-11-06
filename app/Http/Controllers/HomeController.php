<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Genre;
use App\Models\Movie;
use App\Models\Review;
use Illuminate\Contracts\View\View;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): View
    {
        // Obtener el género seleccionado para el filtro
        $selectedGenreId = $request->input('genre');

        // Query base de películas
        $moviesQuery = Movie::with('genre')
            ->orderBy('popularity', 'desc')
            ->orderBy('vote_average', 'desc');

        // Aplicar filtro por género si está presente
        if ($selectedGenreId) {
            $moviesQuery->where('genre_id', $selectedGenreId);
        }

        // Obtener películas paginadas
        $movies = $moviesQuery->paginate(12)->withQueryString();

        // Obtener todos los géneros para el filtro
        $genres = Genre::withCount('movies')
            ->orderBy('genre_name')
            ->get();

        // Obtener estadísticas de películas que le gustaron al usuario (reviews con rating >= 4)
        $userRecentLikes = [];
        $stats = [
            'total_likes' => 0,
            'average_rating' => 0,
            'favorite_genre' => null,
            'total_reviews' => 0,
        ];

        if (Auth::check()) {
            // Obtener películas que el usuario ha valorado positivamente (rating >= 4)
            $userRecentLikes = Review::with(['movie.genre'])
                ->where('user_id', Auth::id())
                ->where('rating', '>=', 4)
                ->orderBy('created_at', 'desc')
                ->limit(5)
                ->get()
                ->pluck('movie')
                ->unique('id');

            // Calcular estadísticas del usuario
            $userReviews = Review::where('user_id', Auth::id())->get();
            
            $stats['total_likes'] = Review::where('user_id', Auth::id())
                ->where('rating', '>=', 4)
                ->count();
            
            $stats['average_rating'] = $userReviews->avg('rating') ?? 0;
            
            $stats['total_reviews'] = $userReviews->count();

            // Obtener el género favorito del usuario (basado en sus reviews positivas)
            $favoriteGenreId = Review::where('user_id', Auth::id())
                ->where('rating', '>=', 4)
                ->join('movies', 'reviews.movie_id', '=', 'movies.id')
                ->select('movies.genre_id', DB::raw('count(*) as count'))
                ->groupBy('movies.genre_id')
                ->orderBy('count', 'desc')
                ->first();

            if ($favoriteGenreId) {
                $stats['favorite_genre'] = Genre::find($favoriteGenreId->genre_id);
            }
        }

        return view('home', compact(
            'movies',
            'genres',
            'selectedGenreId',
            'userRecentLikes',
            'stats'
        ));
    }
}
