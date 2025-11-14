"use client";

import { useState } from "react";
import MovieCard from "@/components/movie-card";
import { Heart, Star, MessageSquare, Film } from "lucide-react";

// Mock data - en producción esto vendría del backend
const mockStats = {
  total_likes: 42,
  average_rating: 4.3,
  total_reviews: 18,
  favorite_genre: "Ciencia Ficción",
};

const mockRecentLikes = [
  {
    id: 1,
    title: "Inception",
    poster_path: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    release_year: 2010,
    slug: "inception-2010",
  },
  {
    id: 2,
    title: "Interstellar",
    poster_path: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    release_year: 2014,
    slug: "interstellar-2014",
  },
  {
    id: 3,
    title: "The Matrix",
    poster_path: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    release_year: 1999,
    slug: "the-matrix-1999",
  },
  {
    id: 4,
    title: "Blade Runner 2049",
    poster_path: "https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
    release_year: 2017,
    slug: "blade-runner-2049-2017",
  },
  {
    id: 5,
    title: "Dune",
    poster_path: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
    release_year: 2021,
    slug: "dune-2021",
  },
];

const mockMovies = [
  {
    id: 1,
    title: "Inception",
    poster_path: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    release_year: 2010,
    rating: 8.8,
    slug: "inception-2010",
    genre_id: 1,
  },
  {
    id: 2,
    title: "The Shawshank Redemption",
    poster_path: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    release_year: 1994,
    rating: 9.3,
    slug: "shawshank-redemption-1994",
    genre_id: 2,
  },
  {
    id: 3,
    title: "The Dark Knight",
    poster_path: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    release_year: 2008,
    rating: 9.0,
    slug: "dark-knight-2008",
    genre_id: 3,
  },
  {
    id: 4,
    title: "Pulp Fiction",
    poster_path: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    release_year: 1994,
    rating: 8.9,
    slug: "pulp-fiction-1994",
    genre_id: 4,
  },
  {
    id: 5,
    title: "Forrest Gump",
    poster_path: "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
    release_year: 1994,
    rating: 8.8,
    slug: "forrest-gump-1994",
    genre_id: 2,
  },
  {
    id: 6,
    title: "The Matrix",
    poster_path: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    release_year: 1999,
    rating: 8.7,
    slug: "the-matrix-1999",
    genre_id: 1,
  },
  {
    id: 7,
    title: "Interstellar",
    poster_path: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    release_year: 2014,
    rating: 8.6,
    slug: "interstellar-2014",
    genre_id: 1,
  },
  {
    id: 8,
    title: "Gladiator",
    poster_path: "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
    release_year: 2000,
    rating: 8.5,
    slug: "gladiator-2000",
    genre_id: 3,
  },
];

const mockGenres = [
  { id: 1, name: "Ciencia Ficción", movies_count: 3 },
  { id: 2, name: "Drama", movies_count: 2 },
  { id: 3, name: "Acción", movies_count: 2 },
  { id: 4, name: "Crimen", movies_count: 1 },
];

export default function HomePage() {
  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Mock - en producción vendría del estado de autenticación

  // Filtrar películas por género
  const filteredMovies = selectedGenreId
    ? mockMovies.filter((movie) => movie.genre_id === selectedGenreId)
    : mockMovies;

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const genreId = e.target.value ? parseInt(e.target.value) : null;
    setSelectedGenreId(genreId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Sección de Estadísticas - Solo para usuarios autenticados */}
        {isAuthenticated && (
          <div className="mb-12 animate-fade-in">
            <h2 className="text-3xl font-bold text-white mb-6">
              Mis Estadísticas
            </h2>

            {/* Grid de estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Total Likes */}
              <div className="bg-slate-900/60 backdrop-blur-xl rounded-xl p-6 border border-slate-800/50 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">
                      Películas que me gustaron
                    </p>
                    <p className="text-3xl font-bold text-blue-400">
                      {mockStats.total_likes}
                    </p>
                  </div>
                  <div className="bg-blue-500/20 p-3 rounded-lg">
                    <Heart className="w-8 h-8 text-blue-400 fill-blue-400" />
                  </div>
                </div>
              </div>

              {/* Average Rating */}
              <div className="bg-slate-900/60 backdrop-blur-xl rounded-xl p-6 border border-slate-800/50 hover:border-yellow-500/50 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">
                      Calificación Promedio
                    </p>
                    <p className="text-3xl font-bold text-yellow-500">
                      {mockStats.average_rating.toFixed(1)}
                    </p>
                  </div>
                  <div className="bg-yellow-500/20 p-3 rounded-lg">
                    <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
                  </div>
                </div>
              </div>

              {/* Total Reviews */}
              <div className="bg-slate-900/60 backdrop-blur-xl rounded-xl p-6 border border-slate-800/50 hover:border-green-500/50 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">
                      Reseñas Escritas
                    </p>
                    <p className="text-3xl font-bold text-green-500">
                      {mockStats.total_reviews}
                    </p>
                  </div>
                  <div className="bg-green-500/20 p-3 rounded-lg">
                    <MessageSquare className="w-8 h-8 text-green-500" />
                  </div>
                </div>
              </div>

              {/* Favorite Genre */}
              <div className="bg-slate-900/60 backdrop-blur-xl rounded-xl p-6 border border-slate-800/50 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">
                      Género Favorito
                    </p>
                    <p className="text-xl font-bold text-purple-500">
                      {mockStats.favorite_genre}
                    </p>
                  </div>
                  <div className="bg-purple-500/20 p-3 rounded-lg">
                    <Film className="w-8 h-8 text-purple-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Películas que me gustaron recientemente */}
            {mockRecentLikes.length > 0 && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Películas que me gustaron recientemente
                </h3>
                <div className="bg-slate-900/60 backdrop-blur-xl rounded-xl p-6 border border-slate-800/50">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {mockRecentLikes.map((movie) => (
                      <div key={movie.id} className="group relative">
                        <div className="relative h-64 rounded-lg overflow-hidden">
                          {movie.poster_path ? (
                            <img
                              src={movie.poster_path}
                              alt={movie.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                              <svg
                                className="w-16 h-16 text-gray-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                            <div className="text-white">
                              <p className="font-bold text-sm line-clamp-2">
                                {movie.title}
                              </p>
                              <p className="text-xs text-gray-300">
                                {movie.release_year}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Sección del Catálogo de Películas */}
        <div className="mb-8">
          {/* Encabezado con filtro */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
            <h2 className="text-3xl font-bold text-white">
              Catálogo de Películas
            </h2>

            {/* Filtro de género */}
            <div className="flex items-center space-x-4">
              <label
                htmlFor="genre-filter"
                className="text-gray-300 font-medium text-sm"
              >
                Filtrar por género:
              </label>
              <select
                id="genre-filter"
                value={selectedGenreId || ""}
                onChange={handleGenreChange}
                className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/50 text-gray-300 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block px-4 py-2.5 transition-all duration-200"
              >
                <option value="">Todos los géneros</option>
                {mockGenres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name} ({genre.movies_count})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Grid de películas */}
          {filteredMovies.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {filteredMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-xl p-12 text-center border border-slate-800/50">
              <svg
                className="w-24 h-24 text-gray-600 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                />
              </svg>
              <h3 className="text-2xl font-bold text-gray-400 mb-2">
                No se encontraron películas
              </h3>
              <p className="text-gray-500">
                Intenta cambiar los filtros de búsqueda
              </p>
            </div>
          )}

          {/* Paginación - Mock (en producción vendría del backend) */}
          {filteredMovies.length > 0 && (
            <div className="flex justify-center items-center space-x-2">
              <button className="px-4 py-2 bg-slate-900/60 backdrop-blur-xl border border-slate-800/50 text-gray-300 rounded-lg hover:border-blue-500/50 hover:text-blue-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                Anterior
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold">
                1
              </button>
              <button className="px-4 py-2 bg-slate-900/60 backdrop-blur-xl border border-slate-800/50 text-gray-300 rounded-lg hover:border-blue-500/50 hover:text-blue-400 transition-all duration-200">
                2
              </button>
              <button className="px-4 py-2 bg-slate-900/60 backdrop-blur-xl border border-slate-800/50 text-gray-300 rounded-lg hover:border-blue-500/50 hover:text-blue-400 transition-all duration-200">
                3
              </button>
              <button className="px-4 py-2 bg-slate-900/60 backdrop-blur-xl border border-slate-800/50 text-gray-300 rounded-lg hover:border-blue-500/50 hover:text-blue-400 transition-all duration-200">
                Siguiente
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}