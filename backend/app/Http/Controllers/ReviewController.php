<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReviewRequest;
use App\Models\Movie;
use App\Models\Review;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ReviewController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(ReviewRequest $request, Movie $movie): JsonResponse
    {
        DB::beginTransaction();

        try {
            $review = $movie->reviews()->create([
                'user_id' => Auth::id(),
                'content' => $request->content,
                'rating' => $request->rating,
                'review_date' => now(),
            ]);

            $this->updateMovieRatings($movie);

            DB::commit();

            return response()->json([
                'message' => 'Reseña creada exitosamente',
                'data' => $review->only('id', 'content', 'rating', 'review_date'),
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Error al crear la reseña',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ReviewRequest $request, Movie $movie, Review $review): JsonResponse
    {
        $this->authorize('update', $review);

        DB::beginTransaction();

        try {
            $review->update([
                'content' => $request->content,
                'rating' => $request->rating,
            ]);

            $this->updateMovieRatings($movie);

            DB::commit();

            return response()->json([
                'message' => 'Reseña actualizada exitosamente',
                'data' => $review->only('id', 'content', 'rating', 'review_date'),
            ]);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Error al actualizar la reseña',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Movie $movie, Review $review): JsonResponse
    {
        $this->authorize('delete', $review);

        DB::beginTransaction();

        try {
            $review->delete();

            $this->updateMovieRatings($movie);

            DB::commit();

            return response()->json([
                'message' => 'Reseña eliminada exitosamente',
            ]);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Error al eliminar la reseña',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Actualizar los ratings de la película
     */
    private function updateMovieRatings(Movie $movie): void
    {
        $reviews = $movie->reviews();

        $movie->vote_count = $reviews->count();
        $movie->vote_average = $reviews->avg('rating') ?? 0;
        $movie->save();
    }

    public function userSummary(Request $request): JsonResponse
    {
        return response()->json([
            'summary' => $request->user()->getSummary(),
            'recent_reviews' => $request->user()->recetReviews(),
        ]);
    }
}
