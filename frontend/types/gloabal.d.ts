export interface User {
  id: number;
  name: string;
  email: string;
  profile_image: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
}

export interface RecentReview {
  movie_id: number;
  content: string;
  rating: number;
  review_date: string;
  title: string;
  poster_path: string;
  slug: string;
}

export interface UserSummary {
  summary: {
    average_rating: number;
    total_reviews: number;
    favorite_genre: string | null;
  };
  recent_reviews: RecentReview[];
}
