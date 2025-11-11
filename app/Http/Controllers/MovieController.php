<?php

namespace App\Http\Controllers;

use App\Http\Requests\MovieRequest;
use App\Models\Movie;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MovieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $request->validate([
            'per_page' => 'sometimes|nullable|integer|min:1',
            'page' => 'sometimes|nullable|integer|min:1',
            'search' => 'sometimes|nullable|string',
            'genre_id' => 'sometimes|nullable|integer',
        ]);

        $movies = Movie::query();

        if ($request->has('search')) {
            $movies->where('title', 'like', '%'.$request->search.'%');
        }

        if ($request->has('genre_id')) {
            $movies->where('genre_id', $request->genre_id);
        }

        $movies->where(function ($query) {
            $query->whereNull('user_id')
                ->orWhere('user_id', Auth::user()->id);
        });

        return response()->json($movies->orderBy('title')->paginate(
            perPage: min(100, $request->integer('per_page', 30)),
            page: $request->integer('page', 1)
        ));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(MovieRequest $request): JsonResponse
    {
        $data = $request->validated();
        $movie = Auth::user()->movies()->create($data);

        return response()->json([
            'message' => 'Película creada exitosamente',
            'data' => $movie,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Movie $movie): JsonResponse
    {
        $movie->load(['genre:id,genre_name', 'reviews' => function ($query) {
            $query->select('reviews.movie_id', 'reviews.content', 'reviews.rating', 'reviews.review_date', 'users.name as user_name', 'users.profile_image as user_profile_image')
                ->join('users', 'reviews.user_id', '=', 'users.id')
                ->orderBy('reviews.review_date', 'desc');
        }]);

        return response()->json($movie);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(MovieRequest $request, Movie $movie): JsonResponse
    {
        $this->authorize('update', $movie);

        $movie->update($request->validated());

        return response()->json([
            'message' => 'Película actualizada exitosamente',
            'movie' => $movie,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Movie $movie): JsonResponse
    {
        $this->authorize('delete', $movie);

        $movie->delete();

        return response()->json([
            'message' => 'Película eliminada exitosamente',
        ]);
    }
}
