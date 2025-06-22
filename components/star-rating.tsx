import { Star } from "lucide-react"

interface StarRatingProps {
  rating: number
  maxRating?: number
}

export function StarRating({ rating, maxRating = 5 }: StarRatingProps) {
  return (
    <div className="flex items-center" aria-label={`Avaliação: ${rating} de ${maxRating} estrelas`}>
      {Array.from({ length: maxRating }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}
