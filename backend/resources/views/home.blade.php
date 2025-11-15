@extends('layouts.app')

@section('title', 'Dashboard - UANFilms')

@section('content')
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    @auth
        <!-- Statistics Section -->
        <div class="mb-8">
            <h2 class="text-3xl font-bold text-white mb-6">Mis Estadísticas</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <!-- Total Likes -->
                <div class="bg-navy rounded-xl p-6 border border-gray-700 hover:border-electric-blue transition-all duration-300">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-400 text-sm mb-1">Películas que me gustaron</p>
                            <p class="text-3xl font-bold text-electric-blue">{{ $stats['total_likes'] }}</p>
                        </div>
                        <div class="bg-electric-blue bg-opacity-20 p-3 rounded-lg">
                            <svg class="w-8 h-8 text-electric-blue" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <!-- Average Rating -->
                <div class="bg-navy rounded-xl p-6 border border-gray-700 hover:border-electric-blue transition-all duration-300">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-400 text-sm mb-1">Calificación Promedio</p>
                            <p class="text-3xl font-bold text-yellow-500">{{ number_format($stats['average_rating'], 1) }}</p>
                        </div>
                        <div class="bg-yellow-500 bg-opacity-20 p-3 rounded-lg">
                            <svg class="w-8 h-8 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <!-- Total Reviews -->
                <div class="bg-navy rounded-xl p-6 border border-gray-700 hover:border-electric-blue transition-all duration-300">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-400 text-sm mb-1">Reseñas Escritas</p>
                            <p class="text-3xl font-bold text-green-500">{{ $stats['total_reviews'] }}</p>
                        </div>
                        <div class="bg-green-500 bg-opacity-20 p-3 rounded-lg">
                            <svg class="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clip-rule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>

                <!-- Favorite Genre -->
                <div class="bg-navy rounded-xl p-6 border border-gray-700 hover:border-electric-blue transition-all duration-300">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-400 text-sm mb-1">Género Favorito</p>
                            <p class="text-xl font-bold text-purple-500">
                                {{ $stats['favorite_genre'] ? $stats['favorite_genre']->genre_name : 'N/A' }}
                            </p>
                        </div>
                        <div class="bg-purple-500 bg-opacity-20 p-3 rounded-lg">
                            <svg class="w-8 h-8 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Recent Likes Section -->
            @if($userRecentLikes->isNotEmpty())
                <div class="mb-8">
                    <h3 class="text-2xl font-bold text-white mb-4">Películas que me gustaron recientemente</h3>
                    <div class="bg-navy rounded-xl p-6 border border-gray-700">
                        <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
                            @foreach($userRecentLikes as $movie)
                                <div class="group relative">
                                    <div class="relative h-64 rounded-lg overflow-hidden">
                                        @if($movie->poster_path)
                                            <img src="{{ $movie->poster_path }}" 
                                                 alt="{{ $movie->title }}" 
                                                 class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300">
                                        @else
                                            <div class="w-full h-full bg-gradient-to-br from-slate-dark to-navy flex items-center justify-center">
                                                <svg class="w-16 h-16 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                                                </svg>
                                            </div>
                                        @endif
                                        <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                                            <div class="text-white">
                                                <p class="font-bold text-sm">{{ $movie->title }}</p>
                                                <p class="text-xs text-gray-300">{{ $movie->release_year }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    </div>
                </div>
            @endif
        </div>
    @endauth

    <!-- Movies Section -->
    <div class="mb-8">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
            <h2 class="text-3xl font-bold text-white">Catálogo de Películas</h2>
            
            <!-- Genre Filter -->
            <div class="flex items-center space-x-4">
                <label for="genre-filter" class="text-gray-300 font-medium">Filtrar por género:</label>
                <select id="genre-filter" 
                        class="bg-navy border border-gray-600 text-gray-300 text-sm rounded-lg focus:ring-electric-blue focus:border-electric-blue block p-2.5">
                    <option value="">Todos los géneros</option>
                    @foreach($genres as $genre)
                        <option value="{{ $genre->id }}" {{ $selectedGenreId == $genre->id ? 'selected' : '' }}>
                            {{ $genre->genre_name }} ({{ $genre->movies_count }})
                        </option>
                    @endforeach
                </select>
            </div>
        </div>

        <!-- Movies Grid -->
        @if($movies->count() > 0)
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                @foreach($movies as $movie)
                    <x-movie-card :movie="$movie" />
                @endforeach
            </div>

            <!-- Pagination -->
            <div class="flex justify-center">
                {{ $movies->links() }}
            </div>
        @else
            <div class="bg-navy rounded-xl p-12 text-center border border-gray-700">
                <svg class="w-24 h-24 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                </svg>
                <h3 class="text-2xl font-bold text-gray-400 mb-2">No se encontraron películas</h3>
                <p class="text-gray-500">Intenta cambiar los filtros de búsqueda</p>
            </div>
        @endif
    </div>
</div>

@push('scripts')
<script>
    // Genre Filter functionality
    document.getElementById('genre-filter').addEventListener('change', function() {
        const genreId = this.value;
        const url = new URL(window.location.href);
        
        if (genreId) {
            url.searchParams.set('genre', genreId);
        } else {
            url.searchParams.delete('genre');
        }
        
        window.location.href = url.toString();
    });

    // Add smooth scroll animation on page load
    document.addEventListener('DOMContentLoaded', function() {
        const elements = document.querySelectorAll('.grid > div, .bg-navy');
        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                el.style.transition = 'all 0.5s ease-out';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 50);
        });
    });
</script>
@endpush
@endsection