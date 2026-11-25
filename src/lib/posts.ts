import type { BlogPost } from '@/data/content'

export const formatPostDate = (iso: string) =>
  new Date(iso + 'T12:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

export const readingMinutes = (post: BlogPost) =>
  Math.max(1, Math.round(post.content.join(' ').split(/\s+/).length / 200))
