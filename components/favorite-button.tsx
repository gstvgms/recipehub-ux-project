"use client"

import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useFavorites } from "@/contexts/favorites-context"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { useState } from "react"

type FavoriteButtonProps = {
  recipe: {
    id: string
    title: string
    description: string
    image: string
    category: string
    time?: string
    tags?: string[]
    rating?: number
    reviews?: number
    featured?: boolean
  }
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export function FavoriteButton({ recipe, variant = "outline", size = "icon", className }: FavoriteButtonProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)

  const isFav = isFavorite(recipe.id)

  const handleToggleFavorite = () => {
    if (isProcessing) return

    setIsProcessing(true)

    try {
      if (isFav) {
        removeFavorite(recipe.id)
        toast({
          title: "Receita removida dos favoritos",
          description: `${recipe.title} foi removida da sua lista de favoritos.`,
        })
      } else {
        addFavorite(recipe)
        toast({
          title: "Receita adicionada aos favoritos",
          description: `${recipe.title} foi adicionada à sua lista de favoritos.`,
        })
      }
    } catch (error) {
      console.error("Erro ao processar favorito:", error)
      toast({
        title: "Erro ao processar favorito",
        description: "Ocorreu um erro ao processar sua solicitação. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      // Pequeno atraso para evitar cliques múltiplos acidentais
      setTimeout(() => {
        setIsProcessing(false)
      }, 300)
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleToggleFavorite}
      className={cn(
        "group",
        isFav && "text-red-500 hover:text-red-600",
        isProcessing && "opacity-70 cursor-not-allowed",
        className,
      )}
      aria-label={isFav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      disabled={isProcessing}
    >
      <Heart className={cn("h-[1.2rem] w-[1.2rem] transition-all", isFav && "fill-current")} />
      <span className="sr-only">{isFav ? "Remover dos favoritos" : "Adicionar aos favoritos"}</span>
    </Button>
  )
}
