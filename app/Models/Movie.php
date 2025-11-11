<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Movie extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'user_id',
        'video_url',
        'release_year',
        'synopsis',
        'director',
        'cast',
        'genre_id',
        'hash_code',
        'poster_path',
        'original_title',
        'original_language',
        'popularity',
        'video',
        'vote_average',
        'vote_count',
        'release_date',
    ];

    protected $casts = [
        'release_date' => 'date',
        'video' => 'boolean',
        'popularity' => 'decimal:2',
        'vote_average' => 'decimal:1',
    ];

    public static function boot()
    {
        parent::boot();
        static::creating(function ($movie) {
            if (! $movie->slug) {
                $slug = Str::slug($movie->title);
                while (self::where('slug', $slug)->exists()) {
                    $slug = Str::slug($movie->title).'-'.Str::random(8);
                }
                $movie->slug = $slug;
            }

            if (! $movie->hash_code) {
                $movie->hash_code = Str::random(32);
            }
        });
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relación con el género
     */
    public function genre(): BelongsTo
    {
        return $this->belongsTo(Genre::class);
    }

    /**
     * Relación con las reseñas
     */
    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }
}
