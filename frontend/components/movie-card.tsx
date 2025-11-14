"use client";

import { Heart, Star } from "lucide-react";
import Link from "next/link";
import { Movie } from "@/types/movie";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link href={`/movie/${movie.slug}`}>
      <div className="group relative bg-slate-900/60 rounded-xl overflow-hidden border border-slate-800/50 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10">
        {/* Poster */}
        <div className="relative h-80 overflow-hidden">
          {movie.poster_path ? (
            <img
              src={movie.poster_path}
              alt={movie.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
              <svg
                className="w-20 h-20 text-gray-600"
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

          {/* Overlay con información */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
            <h3 className="text-white font-bold text-lg mb-1 line-clamp-2">
              {movie.title}
            </h3>
            <div className="flex items-center justify-between">
              <p className="text-gray-300 text-sm">{movie.release_year}</p>
              {movie.rating && (
                <div className="flex items-center gap-1 bg-yellow-500/20 px-2 py-1 rounded">
                  <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                  <span className="text-yellow-500 text-sm font-semibold">
                    {movie.rating.toFixed(1)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Botón de like (decorativo por ahora) */}
          <button
            onClick={(e) => {
              e.preventDefault();
              // Lógica de like pendiente
            }}
            className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-500/20 hover:scale-110"
          >
            <Heart className="h-5 w-5 text-gray-300 hover:text-red-500 transition-colors" />
          </button>
        </div>

        {/* Información inferior */}
        <div className="p-4">
          <h3 className="text-white font-semibold text-base line-clamp-1 mb-1">
            {movie.title}
          </h3>
          <p className="text-gray-400 text-sm">{movie.release_year}</p>
        </div>
      </div>
    </Link>
  );
}

