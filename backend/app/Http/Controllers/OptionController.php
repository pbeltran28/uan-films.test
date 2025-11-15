<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use Illuminate\Http\JsonResponse;

class OptionController extends Controller
{
    public function genres(): JsonResponse
    {
        return response()->json(
            Genre::select('id', 'genre_name')
                ->orderBy('genre_name', 'asc')
                ->get()
        );
    }
}
