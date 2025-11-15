<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'oauth_provider',
        'oauth_id',
        'profile_image',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function movies(): HasMany
    {
        return $this->hasMany(Movie::class);
    }

    /**
     * Relación con las reseñas
     */
    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    public function recetReviews()
    {
        return $this->reviews()
        ->select('reviews.movie_id', 
        'reviews.content', 
        'reviews.rating', 
        'reviews.review_date', 
        'movies.title', 
        'movies.poster_path',
        'movies.slug')
        ->join('movies', 'reviews.movie_id', '=', 'movies.id')
        ->orderBy('reviews.created_at', 'desc')
        ->limit(5)
        ->get();
    }

    /**
     * Esto debe retonar un array con lo siguiente:
     * - average_rating
     * - total_reviews
     * - favorite_genre
     */
    public function getSummary():array
    {
        $result = $this->reviews()
        ->select('reviews.rating', 'movies.genre_id', 'genres.genre_name')
        ->join('movies', 'reviews.movie_id', '=', 'movies.id')
        ->join('genres', 'movies.genre_id', '=', 'genres.id')
        ->get();

        return [
            'average_rating' => round($result->avg('rating'), 1),
            'total_reviews' => $result->count(),
            'favorite_genre' => $result->groupBy('genre_name')->sortByDesc(fn ($grupo) =>  $grupo->count())
            ->keys()->first(),
        ];
    }
}
