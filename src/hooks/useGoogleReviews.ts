import { useEffect, useState, useCallback } from 'react'
import { GOOGLE_REVIEWS_CONFIG } from '@/config'
import { FALLBACK_REVIEWS, type Review } from '@/data/content'

interface ReviewsState {
  reviews: Review[]
  rating: number
  total: number
  live: boolean
  lastSync: Date
}

/**
 * Polls a Google Places proxy endpoint for fresh reviews (real-time).
 * Falls back to the verified reviews published on sattvalife.yoga and
 * keeps retrying in the background on GOOGLE_REVIEWS_CONFIG.refreshInterval.
 */
export function useGoogleReviews() {
  const [state, setState] = useState<ReviewsState>({
    reviews: FALLBACK_REVIEWS,
    rating: GOOGLE_REVIEWS_CONFIG.fallbackRating,
    total: GOOGLE_REVIEWS_CONFIG.fallbackTotal,
    live: false,
    lastSync: new Date(),
  })

  const fetchReviews = useCallback(async () => {
    if (!GOOGLE_REVIEWS_CONFIG.endpoint) return
    try {
      const res = await fetch(GOOGLE_REVIEWS_CONFIG.endpoint, { cache: 'no-store' })
      if (!res.ok) throw new Error(String(res.status))
      const json = await res.json()
      const result = json.result ?? json
      const reviews: Review[] = (result.reviews ?? []).map((r: {
        author_name?: string; authorAttribution?: { displayName?: string }
        rating?: number; text?: string | { text?: string }; relative_time_description?: string
      }) => ({
        author: r.author_name ?? r.authorAttribution?.displayName ?? 'Google user',
        rating: r.rating ?? 5,
        text: typeof r.text === 'string' ? r.text : r.text?.text ?? '',
        time: r.relative_time_description ?? '',
      }))
      if (reviews.length) {
        setState({
          reviews: reviews.slice(0, 9),
          rating: result.rating ?? GOOGLE_REVIEWS_CONFIG.fallbackRating,
          total: result.user_ratings_total ?? GOOGLE_REVIEWS_CONFIG.fallbackTotal,
          live: true,
          lastSync: new Date(),
        })
      }
    } catch {
      /* keep showing fallback, retry on next interval */
    }
  }, [])

  useEffect(() => {
    fetchReviews()
    const id = setInterval(fetchReviews, GOOGLE_REVIEWS_CONFIG.refreshInterval)
    return () => clearInterval(id)
  }, [fetchReviews])

  return state
}
