"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { useLocalStorage } from "@/hooks/use-local-storage"

interface RecipeRatingProps {
  recipeId: string
  initialRating?: number
  className?: string
  onRatingChange?: (rating: number) => void
  readOnly?: boolean
  size?: "sm" | "md" | "lg"
}

export function RecipeRating({
  recipeId,
  initialRating = 0,
  className,
  onRatingChange,
  readOnly = false,
  size = "md",
}: RecipeRatingProps) {
  // Usar localStorage para armazenar as avaliações do usuário
  const [userRatings, setUserRatings] = useLocalStorage<Record<string, number>>("recipe-hub-ratings", {})

  // Estado para controlar a avaliação atual e hover
  const [rating, setRating] = useState<number>(userRatings[recipeId] || initialRating)
  const [hoverRating, setHoverRating] = useState<number>(0)
  const { toast } = useToast()

  // Tamanhos baseados na prop size
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }

  // Função para lidar com o clique em uma estrela
  const handleRating = (value: number) => {
    if (readOnly) return

    setRating(value)

    // Salvar no localStorage
    setUserRatings({
      ...userRatings,
      [recipeId]: value,
    })

    // Notificar o componente pai
    if (onRatingChange) {
      onRatingChange(value)
    }

    // Mostrar toast de confirmação
    toast({
      title: "Avaliação enviada",
      description: `Você avaliou esta receita com ${value} ${value === 1 ? "estrela" : "estrelas"}.`,
    })
  }

  return (
    <div
      className={cn("flex items-center gap-1", readOnly ? "pointer-events-none" : "cursor-pointer", className)}
      onMouseLeave={() => setHoverRating(0)}
      role={readOnly ? "img" : "radiogroup"}
      aria-label={readOnly ? `Avaliação: ${rating} de 5 estrelas` : "Avalie esta receita"}
    >
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          key={value}
          className={cn(
            sizeClasses[size],
            "transition-all",
            hoverRating >= value || (!hoverRating && rating >= value)
              ? "text-yellow-400 fill-yellow-400"
              : "text-muted-foreground",
            !readOnly && "hover:scale-110",
          )}
          onMouseEnter={() => !readOnly && setHoverRating(value)}
          onClick={() => handleRating(value)}
          role={readOnly ? "presentation" : "radio"}
          aria-checked={rating >= value}
          aria-label={readOnly ? undefined : `${value} ${value === 1 ? "estrela" : "estrelas"}`}
          tabIndex={readOnly ? -1 : 0}
          onKeyDown={(e) => {
            if (!readOnly && (e.key === "Enter" || e.key === " ")) {
              handleRating(value)
              e.preventDefault()
            }
          }}
        />
      ))}
    </div>
  )
}
