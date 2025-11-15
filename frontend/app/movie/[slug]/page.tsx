"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Star,
  Calendar,
  Film,
  MessageSquare,
  Play,
  User,
  Send,
} from "lucide-react";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import AppLayout from "@/components/layouts/app-layout";
import { getMovieBySlug } from "@/services/movie.service";
import { createReview } from "@/services/review.service";
import { MovieDetail } from "@/types/movie";

type MoviePageProps = {
  params: Promise<{ slug: string }>;
};

export default function MoviePage(props: MoviePageProps) {
  const { isChecking } = useAuthGuard();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewError, setReviewError] = useState<string | null>(null);
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [movieSlug, setMovieSlug] = useState<string | null>(null);

  useEffect(() => {
    const loadMovie = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const { slug } = await props.params;
        setMovieSlug(slug);
        const result = await getMovieBySlug(slug);

        if (result.isSuccess && result.data) {
          setMovie(result.data);
        } else {
          setError("No se pudo cargar la película");
        }
      } catch (err) {
        setError("Error al cargar la película");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadMovie();
  }, [props.params]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!movie) return;

    // Validar que el rating sea mayor a 0
    if (rating === 0) {
      setReviewError("Por favor, selecciona una calificación");
      return;
    }

    // Validar que el comentario no esté vacío
    if (!comment.trim()) {
      setReviewError("Por favor, escribe un comentario");
      return;
    }

    try {
      setIsSubmittingReview(true);
      setReviewError(null);
      setReviewSuccess(false);

      const result = await createReview({
        slug: movie.slug,
        content: comment.trim(),
        rating: rating,
      });

      if (result.isSuccess) {
        setReviewSuccess(true);
        setComment("");
        setRating(0);
        setHoverRating(0);

        // Recargar la película para mostrar el nuevo comentario
        if (movieSlug) {
          const movieResult = await getMovieBySlug(movieSlug);
          if (movieResult.isSuccess && movieResult.data) {
            setMovie(movieResult.data);
          }
        }

        // Ocultar mensaje de éxito después de 3 segundos
        setTimeout(() => {
          setReviewSuccess(false);
        }, 3000);
      } else {
        setReviewError(
          result.message ||
            "Error al crear la reseña. Por favor, intenta de nuevo."
        );
      }
    } catch (err) {
      setReviewError("Error al crear la reseña. Por favor, intenta de nuevo.");
      console.error(err);
    } finally {
      setIsSubmittingReview(false);
    }
  };

  // Parsear el cast como string a array
  const parseCast = (castString: string): string[] => {
    if (!castString) return [];
    return castString
      .split(",")
      .map((actor) => actor.trim())
      .filter(Boolean);
  };

  // Convertir vote_average a número
  const getRating = (): number => {
    if (!movie) return 0;
    const rating = parseFloat(movie.vote_average);
    return isNaN(rating) ? 0 : rating;
  };

  const renderStars = (currentRating: number, interactive: boolean = false) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= (interactive ? hoverRating || rating : currentRating)
                ? "fill-yellow-500 text-yellow-500"
                : "text-gray-600"
            } ${
              interactive ? "cursor-pointer transition-all hover:scale-110" : ""
            }`}
            onClick={() => interactive && setRating(star)}
            onMouseEnter={() => interactive && setHoverRating(star)}
            onMouseLeave={() => interactive && setHoverRating(0)}
          />
        ))}
      </div>
    );
  };

  // Mostrar loading mientras se verifica la autenticación
  if (isChecking || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Cargando...</p>
        </div>
      </div>
    );
  }

  // Mostrar error si no se pudo cargar la película
  if (error || !movie) {
    return (
      <AppLayout>
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">
              {error || "Película no encontrada"}
            </h1>
            <p className="text-gray-400">
              No se pudo cargar la información de la película.
            </p>
          </div>
        </div>
      </AppLayout>
    );
  }

  const backdropImage = movie.poster_path || "";
  const castArray = parseCast(movie.cast);
  const movieRating = getRating();

  return (
    <AppLayout>
      {/* Hero Section con Backdrop */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        {/* Backdrop Image */}
        <div className="absolute inset-0">
          {backdropImage && (
            <img
              src={backdropImage}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/40"></div>
        </div>

        {/* Contenido del Hero */}
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-12">
          <div className="flex flex-col md:flex-row gap-8 w-full">
            {/* Poster */}
            <div className="flex-shrink-0">
              {movie.poster_path && (
                <img
                  src={movie.poster_path}
                  alt={movie.title}
                  className="w-48 md:w-64 rounded-2xl shadow-2xl border-4 border-slate-800/50 animate-slide-up"
                />
              )}
            </div>

            {/* Información Principal */}
            <div className="flex-1 text-white space-y-4 animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                {movie.title}
              </h1>

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-4 text-gray-300">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{movie.release_year}</span>
                </div>
                {movie.genre && (
                  <div className="flex items-center gap-2">
                    <Film className="h-4 w-4" />
                    <span>{movie.genre.genre_name}</span>
                  </div>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4">
                {renderStars(Math.round(movieRating))}
                <span className="text-2xl font-bold text-yellow-500">
                  {movieRating.toFixed(1)}
                </span>
                <span className="text-gray-400">
                  ({movie.vote_count} valoraciones)
                </span>
              </div>

              {/* Botones de Acción */}
              <div className="flex flex-wrap gap-4 pt-4">
                {movie.video_url && (
                  <Button
                    onClick={() => {
                      if (movie.video_url) {
                        window.open(movie.video_url, "_blank");
                      }
                    }}
                    className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-semibold h-12 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/30"
                  >
                    <Play className="h-5 w-5 mr-2" />
                    Ver Trailer
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Sinopsis y Detalles */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sinopsis */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-slate-800/50">
              <h2 className="text-2xl font-bold text-white mb-4">Sinopsis</h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                {movie.synopsis || "Sin sinopsis disponible."}
              </p>
            </div>
          </div>

          {/* Detalles */}
          <div className="space-y-6">
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-6 border border-slate-800/50">
              <h3 className="text-xl font-bold text-white mb-4">Detalles</h3>
              <div className="space-y-3 text-gray-300">
                {movie.director && (
                  <div>
                    <span className="font-semibold text-white">Director:</span>
                    <p>{movie.director}</p>
                  </div>
                )}
                {movie.genre && (
                  <div>
                    <span className="font-semibold text-white">Género:</span>
                    <p>{movie.genre.genre_name}</p>
                  </div>
                )}
                <div>
                  <span className="font-semibold text-white">Año:</span>
                  <p>{movie.release_year}</p>
                </div>
                {movie.release_date && (
                  <div>
                    <span className="font-semibold text-white">
                      Fecha de estreno:
                    </span>
                    <p>
                      {new Date(movie.release_date).toLocaleDateString(
                        "es-ES",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </p>
                  </div>
                )}
                {castArray.length > 0 && (
                  <div>
                    <span className="font-semibold text-white">Reparto:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {castArray.map((actor, index) => (
                        <span
                          key={index}
                          className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm"
                        >
                          {actor}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sección de Comentarios */}
        <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-slate-800/50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <MessageSquare className="h-6 w-6" />
              Comentarios ({movie.reviews.length})
            </h2>
          </div>

          {/* Formulario para Nuevo Comentario */}
          <div className="bg-slate-950/50 rounded-xl p-6 mb-8 border border-slate-800/50">
            <h3 className="text-lg font-semibold text-white mb-4">
              Agregar un comentario
            </h3>

            {/* Mensaje de éxito */}
            {reviewSuccess && (
              <div className="mb-4 p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
                <p className="text-green-400 text-sm">
                  ¡Comentario publicado exitosamente!
                </p>
              </div>
            )}

            {/* Mensaje de error */}
            {reviewError && (
              <div className="mb-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
                <p className="text-red-400 text-sm">{reviewError}</p>
              </div>
            )}

            <form onSubmit={handleSubmitComment} className="space-y-4">
              {/* Rating */}
              <div>
                <Label className="text-gray-300 mb-2">Tu calificación</Label>
                <div className="flex items-center gap-2">
                  {renderStars(rating, true)}
                  {rating > 0 && (
                    <span className="text-yellow-500 font-semibold ml-2">
                      {rating} / 5
                    </span>
                  )}
                </div>
                {rating === 0 && (
                  <p className="text-red-400 text-xs mt-1">
                    Por favor, selecciona una calificación
                  </p>
                )}
              </div>

              {/* Comentario */}
              <div>
                <Label htmlFor="comment" className="text-gray-300 mb-2">
                  Tu comentario
                </Label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={handleCommentChange}
                  placeholder="Comparte tu opinión sobre esta película..."
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  required
                  disabled={isSubmittingReview}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmittingReview || rating === 0 || !comment.trim()}
                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-semibold h-11 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmittingReview ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Publicando...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Publicar Comentario
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Lista de Comentarios */}
          <div className="space-y-4">
            {movie.reviews.length > 0 ? (
              movie.reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-slate-950/30 rounded-xl p-6 border border-slate-800/30 hover:border-slate-700/50 transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {review.user_profile_image ? (
                        <img
                          src={review.user_profile_image}
                          alt={review.user_name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="bg-blue-500/20 p-2 rounded-full">
                          <User className="h-5 w-5 text-blue-400" />
                        </div>
                      )}
                      <div>
                        <p className="text-white font-semibold">
                          {review.user_name}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {new Date(review.review_date).toLocaleDateString(
                            "es-ES",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    {review.content}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No hay comentarios aún. ¡Sé el primero en comentar!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
