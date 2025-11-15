<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MovieRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'release_year' => 'required|integer|min:1900|max:'.(date('Y') + 5),
            'synopsis' => 'required|string',
            'director' => 'required|string|max:255',
            'cast' => 'required|string',
            'genre_id' => 'required|integer|exists:genres,id',
            'poster_path' => 'nullable|string|max:255',
            'original_title' => 'required|string|max:255',
            'original_language' => 'required|string|max:255',
            'video_url' => 'nullable|string|max:255',
            'popularity' => 'nullable|numeric|min:0',
            'video' => 'nullable|boolean',
            'vote_average' => 'nullable|numeric|min:0|max:10',
            'vote_count' => 'nullable|integer|min:0',
            'release_date' => 'required|date',
        ];
    }
}
