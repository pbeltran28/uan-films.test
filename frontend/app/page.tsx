"use client";

import { useEffect, useState } from "react";
import MovieCard from "@/components/movie-card";
import { Star, MessageSquare, Film } from "lucide-react";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useAuthStore } from "@/store/auth.store";
import AppLayout from "@/components/layouts/app-layout";
import { getMovies, getGenres, getUserSummary } from "@/services/movie.service";
import { MovieCard as MovieCardType } from "@/types/movie";
import { PaginatedResponse, UserSummary } from "@/types/gloabal";
import { Genre } from "@/types/movie";

export default function HomePage() {
  const { isChecking } = useAuthGuard();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null);
  const [movies, setMovies] = useState<MovieCardType[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [pagination, setPagination] =
    useState<PaginatedResponse<MovieCardType> | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMovies, setIsLoadingMovies] = useState(false);
  const [userSummary, setUserSummary] = useState<UserSummary | null>(null);
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const genreId = e.target.value ? parseInt(e.target.value) : null;
    setSelectedGenreId(genreId);
    setCurrentPage(1); // Resetear a la primera página al cambiar género
  };

  // Cargar géneros y resumen del usuario
  useEffect(() => {
    const loadData = async () => {
      if (isAuthenticated) {
        setIsLoadingSummary(true);
        const summaryResult = await getUserSummary();
        if (summaryResult.isSuccess && summaryResult.data) {
          setUserSummary(summaryResult.data);
        }
        setIsLoadingSummary(false);
      }

      const result = await getGenres();
      if (result.isSuccess && result.data) {
        setGenres(result.data);
      }
    };
    loadData();
  }, [isAuthenticated]);

  // Cargar películas
  useEffect(() => {
    const loadMovies = async () => {
      setIsLoadingMovies(true);
      const params: { page?: number; per_page?: number; genre_id?: number } = {
        page: currentPage,
        per_page: 12,
      };

      if (selectedGenreId) {
        params.genre_id = selectedGenreId;
      }

      const result = await getMovies(params);
      if (result.isSuccess && result.data) {
        setMovies(result.data.data);
        setPagination(result.data);
      }
      setIsLoadingMovies(false);
    };
    loadMovies();
  }, [selectedGenreId, currentPage]);

  // Mostrar loading mientras se verifica la autenticación
  if (isChecking) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Sección de Estadísticas - Solo para usuarios autenticados */}
        {isAuthenticated && (
          <div className="mb-12 animate-fade-in">
            <h2 className="text-3xl font-bold text-white mb-6">
              Mis Estadísticas
            </h2>

            {/* Grid de estadísticas */}
            {isLoadingSummary ? (
              <div className="flex justify-center items-center py-12 mb-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : userSummary ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {/* Average Rating */}
                <div className="bg-slate-900/60 backdrop-blur-xl rounded-xl p-6 border border-slate-800/50 hover:border-yellow-500/50 transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm mb-1">
                        Calificación Promedio
                      </p>
                      <p className="text-3xl font-bold text-yellow-500">
                        {userSummary.summary.average_rating.toFixed(1)}
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
                        {userSummary.summary.total_reviews}
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
                        {userSummary.summary.favorite_genre || "N/A"}
                      </p>
                    </div>
                    <div className="bg-purple-500/20 p-3 rounded-lg">
                      <Film className="w-8 h-8 text-purple-500" />
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {/* Películas que me gustaron recientemente */}
            {userSummary && userSummary.recent_reviews.length > 0 && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Películas que me gustaron recientemente
                </h3>
                <div className="bg-slate-900/60 backdrop-blur-xl rounded-xl p-6 border border-slate-800/50">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {userSummary.recent_reviews.map((movie) => (
                      <a
                        key={movie.slug}
                        href={`/movie/${movie.slug}`}
                        className="group relative block"
                      >
                        <div className="relative h-64 rounded-lg overflow-hidden">
                          {movie.poster_path ? (
                            <img
                              src={movie.poster_path}
                              alt={movie.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full bg-linear-to-br from-slate-800 to-slate-900 flex items-center justify-center">
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
                          <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                            <div className="text-white">
                              <p className="font-bold text-sm line-clamp-2">
                                {movie.title}
                              </p>
                            </div>
                          </div>
                        </div>
                      </a>
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
                disabled={isLoadingMovies}
                className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/50 text-gray-300 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block px-4 py-2.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">Todos los géneros</option>
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.genre_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Grid de películas */}
          {isLoadingMovies ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : movies.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {movies.map((movie) => (
                <MovieCard key={movie.slug} movie={movie} />
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

          {/* Paginación */}
          {pagination && pagination.last_page > 1 && (
            <div className="flex justify-center items-center space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1 || isLoadingMovies}
                className="px-4 py-2 bg-slate-900/60 backdrop-blur-xl border border-slate-800/50 text-gray-300 rounded-lg hover:border-blue-500/50 hover:text-blue-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Anterior
              </button>

              {/* Botones de páginas */}
              {Array.from({ length: pagination.last_page }, (_, i) => i + 1)
                .filter((page) => {
                  // Mostrar primera, última, actual y páginas adyacentes
                  return (
                    page === 1 ||
                    page === pagination.last_page ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  );
                })
                .map((page, index, array) => {
                  // Agregar puntos suspensivos si hay gap
                  const showEllipsis =
                    index > 0 && array[index - 1] !== page - 1;
                  return (
                    <div key={page} className="flex items-center gap-1">
                      {showEllipsis && (
                        <span className="text-gray-500 px-2">...</span>
                      )}
                      <button
                        onClick={() => setCurrentPage(page)}
                        disabled={isLoadingMovies}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                          currentPage === page
                            ? "bg-blue-500 text-white"
                            : "bg-slate-900/60 backdrop-blur-xl border border-slate-800/50 text-gray-300 hover:border-blue-500/50 hover:text-blue-400"
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        {page}
                      </button>
                    </div>
                  );
                })}

              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(pagination.last_page, prev + 1)
                  )
                }
                disabled={
                  currentPage === pagination.last_page || isLoadingMovies
                }
                className="px-4 py-2 bg-slate-900/60 backdrop-blur-xl border border-slate-800/50 text-gray-300 rounded-lg hover:border-blue-500/50 hover:text-blue-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Siguiente
              </button>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
