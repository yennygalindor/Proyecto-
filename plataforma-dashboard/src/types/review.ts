export interface Review {
  id: number
  pokemonId: number
  userId: string
  rating: number
  comment: string | null
  createdAt: string
}

export interface ReviewsResponse {
  pokemonId: number
  averageRating: number
  totalReviews: number
  reviews: Review[]
}

export interface CreateReviewDto {
  pokemonId: number
  rating: number
  comment?: string
}
