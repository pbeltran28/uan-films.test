@props(['movie'])

<div class="bg-navy rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-700">
    <!-- Poster Image -->
    <div class="relative h-96 overflow-hidden bg-gray-800">
        @if($movie->poster_path)
            <img src="{{ $movie->poster_path }}" 
                 alt="{{ $movie->title }}" 
                 class="w-full h-full object-cover">
        @else
            <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-dark to-navy">
                <svg class="w-24 h-24 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                </svg>
            </div>
        @endif
        
        <!-- Rating Badge -->
        <div class="absolute top-3 right-3 bg-electric-blue text-white px-3 py-1 rounded-full font-bold text-sm flex items-center space-x-1">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>{{ number_format($movie->vote_average, 1) }}</span>
        </div>

        <!-- Genre Badge -->
        @if($movie->genre)
            <div class="absolute top-3 left-3 bg-navy bg-opacity-90 text-gray-300 px-3 py-1 rounded-full text-xs font-medium">
                {{ $movie->genre->genre_name }}
            </div>
        @endif
    </div>

    <!-- Movie Info -->
    <div class="p-5">
        <!-- Title -->
        <h3 class="text-xl font-bold text-white mb-2 line-clamp-2 hover:text-electric-blue transition-colors duration-200">
            {{ $movie->title }}
        </h3>

        <!-- Year & Director -->
        <div class="flex items-center justify-between text-sm text-gray-400 mb-3">
            <span class="flex items-center space-x-1">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                </svg>
                <span>{{ $movie->release_year }}</span>
            </span>
            <span class="text-xs truncate max-w-[150px]" title="{{ $movie->director }}">
                {{ $movie->director }}
            </span>
        </div>

        <!-- Synopsis -->
        <p class="text-gray-400 text-sm line-clamp-3 mb-4">
            {{ $movie->synopsis }}
        </p>

        <!-- Stats -->
        <div class="flex items-center justify-between text-xs text-gray-500 border-t border-gray-700 pt-3">
            <div class="flex items-center space-x-1">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                </svg>
                <span>{{ number_format($movie->vote_count) }} votos</span>
            </div>
            <div class="flex items-center space-x-1">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
                <span>{{ number_format($movie->popularity) }}</span>
            </div>
        </div>

        <!-- Action Button -->
        <div class="mt-4">
            <a href="#" 
               class="block w-full bg-gradient-to-r from-electric-blue to-blue-500 hover:from-blue-500 hover:to-electric-blue text-white text-center font-semibold py-2 px-4 rounded-lg transition-all duration-200">
                Ver Detalles
            </a>
        </div>
    </div>
</div>

