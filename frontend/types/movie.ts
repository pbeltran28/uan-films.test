export interface Movie {
  id: number;
  user_id: number | null;
  genre_id: number;
  slug: string;
  title: string;
  release_year: number;
  synopsis: string;
  director: string;
  poster_path: string;
  original_title: string;
  original_language: string;
  popularity: string;
  video_url: string | null;
  vote_average: string;
  vote_count: number;
  release_date: string;
  created_at: string;
  updated_at: string;
}

export type MovieCard = Pick<
  Movie,
  | "slug"
  | "title"
  | "original_title"
  | "poster_path"
  | "release_year"
  | "release_date"
  | "vote_average"
>;

export interface Genre {
  id: number;
  genre_name: string;
}

export interface ReviewDetail {
  id: number;
  user_id?: number;
  movie_id: number;
  content: string;
  rating: number;
  review_date: string;
  user_name: string;
  user_profile_image: string;
}

export interface MovieDetail extends Movie {
  genre: Genre;
  reviews: ReviewDetail[];
}
