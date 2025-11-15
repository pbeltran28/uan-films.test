import api from "@/lib/axios";
import { ReviewDetail } from "@/types/movie";

interface CreateReviewParams {
  slug: string;
  content: string;
  rating: number;
}

export const createReview = async (payload: CreateReviewParams) => {
  const { slug, ...rest } = payload;
  const { status, data } = (await api
    .post(`/movies/${slug}/reviews`, rest)
    .catch((e) => e?.response)) ?? { data: {} };

  return {
    isSuccess: status === 200 || status === 201,
    data: data?.data as ReviewDetail,
    message: data?.message,
  };
};
