"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import MovieCard from "@/components/movie-card";
import {
  Star,
  Calendar,
  Clock,
  Film,
  Heart,
  MessageSquare,
  Play,
  User,
  Send,
} from "lucide-react";

// Mock data - en producción vendría del backend
const mockMovie = {
  id: 1,
  title: "Inception",
  slug: "inception-2010",
  poster_path: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
  backdrop_path: "https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
  release_year: 2010,
  duration: 148,
  genre: "Ciencia Ficción, Acción",
  director: "Christopher Nolan",
  rating: 4.4,
  total_ratings: 1250,
  synopsis:
    "Dom Cobb es un ladrón con la rara habilidad de entrar en los sueños de la gente y robar sus secretos del subconsciente. Su habilidad lo ha convertido en un jugador codiciado en el traicionero nuevo mundo del espionaje corporativo, pero también lo ha convertido en un fugitivo internacional y ha tenido que sacrificar todo lo que alguna vez amó.",
  cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page", "Tom Hardy"],
  trailer_url: "https://www.youtube.com/embed/YoHD9XEInc0",
  is_liked: false,
  total_comments: 48,
};

const mockComments = [
  {
    id: 1,
    user_name: "Carlos Mendoza",
    comment:
      "Una obra maestra del cine moderno. Christopher Nolan nos entrega una película compleja pero fascinante que te mantiene pensando días después de verla.",
    rating: 5,
    created_at: "2024-11-10",
  },
  {
    id: 2,
    user_name: "María González",
    comment:
      "Excelente película, aunque en algunos momentos puede resultar confusa. Las actuaciones son sobresalientes y los efectos visuales impresionantes.",
    rating: 4,
    created_at: "2024-11-08",
  },
  {
    id: 3,
    user_name: "Juan Ramírez",
    comment:
      "Me encantó cada minuto. La forma en que juega con el concepto de los sueños es brillante. DiCaprio está increíble como siempre.",
    rating: 5,
    created_at: "2024-11-05",
  },
  {
    id: 4,
    user_name: "Ana López",
    comment:
      "Muy buena película, aunque hay que prestarle mucha atención. La banda sonora de Hans Zimmer es épica.",
    rating: 4,
    created_at: "2024-11-02",
  },
];

const mockRelatedMovies = [
  {
    id: 2,
    title: "Interstellar",
    poster_path: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    release_year: 2014,
    rating: 4.5,
    slug: "interstellar-2014",
  },
  {
    id: 3,
    title: "The Matrix",
    poster_path: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    release_year: 1999,
    rating: 4.3,
    slug: "the-matrix-1999",
  },
  {
    id: 4,
    title: "Shutter Island",
    poster_path: "https://image.tmdb.org/t/p/w500/4GDy0PHYX3VRXUtwK5ysFbg3kEx.jpg",
    release_year: 2010,
    rating: 4.2,
    slug: "shutter-island-2010",
  },
  {
    id: 5,
    title: "The Prestige",
    poster_path: "https://image.tmdb.org/t/p/w500/bdN3gXuIZYaJP7ftKK2sU0nPtEA.jpg",
    release_year: 2006,
    rating: 4.4,
    slug: "the-prestige-2006",
  },
];

type MoviePageProps = {
  params: Promise<{ slug: string }>;
};

export default function MoviePage(props: MoviePageProps) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [showTrailer, setShowTrailer] = useState(false);
  const [isLiked, setIsLiked] = useState(mockMovie.is_liked);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para enviar comentario pendiente
    console.log({ comment, rating });
    setComment("");
    setRating(0);
  };

  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
    // Lógica para toggle like pendiente
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
            } ${interactive ? "cursor-pointer transition-all hover:scale-110" : ""}`}
            onClick={() => interactive && setRating(star)}
            onMouseEnter={() => interactive && setHoverRating(star)}
            onMouseLeave={() => interactive && setHoverRating(0)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section con Backdrop */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        {/* Backdrop Image */}
        <div className="absolute inset-0">
          <img
            src={mockMovie.backdrop_path}
            alt={mockMovie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/40"></div>
        </div>

        {/* Contenido del Hero */}
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-12">
          <div className="flex flex-col md:flex-row gap-8 w-full">
            {/* Poster */}
            <div className="flex-shrink-0">
              <img
                src={mockMovie.poster_path}
                alt={mockMovie.title}
                className="w-48 md:w-64 rounded-2xl shadow-2xl border-4 border-slate-800/50 animate-slide-up"
              />
            </div>

            {/* Información Principal */}
            <div className="flex-1 text-white space-y-4 animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                {mockMovie.title}
              </h1>

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-4 text-gray-300">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{mockMovie.release_year}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{mockMovie.duration} min</span>
                </div>
                <div className="flex items-center gap-2">
                  <Film className="h-4 w-4" />
                  <span>{mockMovie.genre}</span>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4">
                {renderStars(Math.round(mockMovie.rating))}
                <span className="text-2xl font-bold text-yellow-500">
                  {mockMovie.rating.toFixed(1)}
                </span>
                <span className="text-gray-400">
                  ({mockMovie.total_ratings} valoraciones)
                </span>
              </div>

              {/* Botones de Acción */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Button
                  onClick={() => setShowTrailer(!showTrailer)}
                  className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-semibold h-12 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/30"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Ver Trailer
                </Button>

                <Button
                  onClick={handleLikeToggle}
                  variant="outline"
                  className={`h-12 px-6 rounded-lg font-semibold transition-all duration-300 ${
                    isLiked
                      ? "bg-red-500/20 border-red-500 text-red-500 hover:bg-red-500/30"
                      : "bg-slate-900/60 border-slate-700 text-white hover:bg-slate-800/60"
                  }`}
                >
                  <Heart
                    className={`h-5 w-5 mr-2 ${isLiked ? "fill-red-500" : ""}`}
                  />
                  {isLiked ? "Me gusta" : "Me gusta"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {showTrailer && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setShowTrailer(false)}
        >
          <div
            className="relative w-full max-w-5xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute -top-12 right-0 text-white hover:text-blue-400 transition-colors text-lg font-semibold"
            >
              Cerrar ✕
            </button>
            <iframe
              src={mockMovie.trailer_url}
              className="w-full h-full rounded-xl"
              allowFullScreen
              title="Trailer"
            ></iframe>
          </div>
        </div>
      )}

      {/* Contenido Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Sinopsis y Detalles */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sinopsis */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-slate-800/50">
              <h2 className="text-2xl font-bold text-white mb-4">Sinopsis</h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                {mockMovie.synopsis}
              </p>
            </div>
          </div>

          {/* Detalles */}
          <div className="space-y-6">
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-6 border border-slate-800/50">
              <h3 className="text-xl font-bold text-white mb-4">Detalles</h3>
              <div className="space-y-3 text-gray-300">
                <div>
                  <span className="font-semibold text-white">Director:</span>
                  <p>{mockMovie.director}</p>
                </div>
                <div>
                  <span className="font-semibold text-white">Género:</span>
                  <p>{mockMovie.genre}</p>
                </div>
                <div>
                  <span className="font-semibold text-white">Duración:</span>
                  <p>{mockMovie.duration} minutos</p>
                </div>
                <div>
                  <span className="font-semibold text-white">Año:</span>
                  <p>{mockMovie.release_year}</p>
                </div>
                <div>
                  <span className="font-semibold text-white">Reparto:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {mockMovie.cast.map((actor, index) => (
                      <span
                        key={index}
                        className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm"
                      >
                        {actor}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sección de Comentarios */}
        <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-slate-800/50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <MessageSquare className="h-6 w-6" />
              Comentarios ({mockMovie.total_comments})
            </h2>
          </div>

          {/* Formulario para Nuevo Comentario */}
          <div className="bg-slate-950/50 rounded-xl p-6 mb-8 border border-slate-800/50">
            <h3 className="text-lg font-semibold text-white mb-4">
              Agregar un comentario
            </h3>
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
                />
              </div>

              <Button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-semibold h-11 px-6 rounded-lg transition-all duration-300"
              >
                <Send className="h-4 w-4 mr-2" />
                Publicar Comentario
              </Button>
            </form>
          </div>

          {/* Lista de Comentarios */}
          <div className="space-y-4">
            {mockComments.map((commentItem) => (
              <div
                key={commentItem.id}
                className="bg-slate-950/30 rounded-xl p-6 border border-slate-800/30 hover:border-slate-700/50 transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-500/20 p-2 rounded-full">
                      <User className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">
                        {commentItem.user_name}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {new Date(commentItem.created_at).toLocaleDateString(
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
                  {renderStars(commentItem.rating)}
                </div>
                <p className="text-gray-300 leading-relaxed">
                  {commentItem.comment}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Películas Relacionadas */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Películas Relacionadas
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockRelatedMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}