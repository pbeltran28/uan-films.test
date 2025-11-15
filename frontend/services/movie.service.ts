import api from "@/lib/axios";
import type { PaginatedResponse, UserSummary } from "@/types/gloabal";
import type { Genre, MovieCard, MovieDetail } from "@/types/movie";

export interface GetMoviesParams {
  per_page?: number;
  page?: number;
  search?: string;
  genre_id?: number;
  owned?: boolean;
}

export const getGenres = async () => {
  const { status, data } = (await api
    .get("/options/genres")
    .catch((e) => e?.response)) ?? { data: {} };

  return {
    isSuccess: status === 200,
    data: data as Genre[],
  };
};

export const getUserSummary = async () => {
  const { status, data } = (await api
    .get("/user-summary")
    .catch((e) => e?.response)) ?? { data: {} };

  return {
    isSuccess: status === 200,
    data: data as UserSummary,
  };
};

export const getMovies = async (params: GetMoviesParams) => {
  const { status, data } = (await api
    .get("/movies", { params })
    .catch((e) => e?.response)) ?? { data: {} };

  return {
    isSuccess: status === 200,
    data: data as PaginatedResponse<MovieCard>,
  };
};

export const getMovieBySlug = async (slug: string) => {
  const { status, data } = (await api
    .get(`/movies/${slug}`)
    .catch((e) => e?.response)) ?? { data: {} };

  return {
    isSuccess: status === 200,
    data: data as MovieDetail,
  };
};
