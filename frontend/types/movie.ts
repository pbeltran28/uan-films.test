export interface Movie {
  id: number;
  title: string;
  poster_path?: string;
  release_year: number;
  rating?: number;
  slug: string;
  genre_id?: number;
}

export interface Genre {
  id: number;
  name: string;
  movies_count: number;
}

export interface UserStats {
  total_likes: number;
  average_rating: number;
  total_reviews: number;
  favorite_genre: string;
}

