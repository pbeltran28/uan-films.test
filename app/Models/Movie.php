<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Movie extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
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
