import Link from "next/link"
import Image from "next/image"
import { Clock, ChefHat, Users, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { FavoriteButton } from "@/components/favorite-button"
import { RecipeRating } from "@/components/recipe-rating"

interface RecipeCardProps {
  recipe: {
    id: string
    title: string
    description: string
    image: string
    category: string
    time?: string
    difficulty?: string
    servings?: string
    tags?: string[]
    rating?: number
    reviews?: number
    featured?: boolean
  }
  variant?: "default" | "compact" | "featured"
  className?: string
}

export function RecipeCard({ recipe, variant = "default", className }: RecipeCardProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-md focus-within:ring-2 focus-within:ring-ring recipe-card group/card",
        className,
      )}
    >
      <div className="aspect-video relative overflow-hidden recipe-image">
        <Image
          src={recipe.image || "/placeholder.svg?height=400&width=600"}
          alt={recipe.title}
          fill
          className="object-cover transition-transform duration-500 group-hover/card:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {recipe.featured && (
          <Badge
            className={cn("absolute top-2 right-2 z-10", variant === "featured" ? "badge-pulse" : "")}
            variant="primary"
          >
            Popular
          </Badge>
        )}
        {variant === "featured" && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
            <div className="text-white">
              <h3 className="text-xl font-bold mb-1">{recipe.title}</h3>
              <p className="text-sm text-white/80 line-clamp-2">{recipe.description}</p>
            </div>
          </div>
        )}
      </div>

      <div className="recipe-content transition-all duration-300 group-hover/card:bg-background/80">
        {variant !== "featured" && (
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="line-clamp-1 text-xl">{recipe.title}</CardTitle>
              <FavoriteButton recipe={recipe} />
            </div>
            {recipe.rating !== undefined && (
              <div className="flex items-center gap-2 mt-1">
                <RecipeRating recipeId={recipe.id} initialRating={recipe.rating || 0} readOnly size="sm" />
                <span className="text-xs text-muted-foreground">({recipe.reviews || 0})</span>
              </div>
            )}
          </CardHeader>
        )}

        <CardContent className={cn("p-4", variant === "featured" ? "pt-4" : "pt-0")}>
          {variant !== "featured" && (
            <p className="text-sm text-muted-foreground recipe-description">{recipe.description}</p>
          )}

          <div className="flex flex-wrap gap-2 mt-3">
            {recipe.tags &&
              recipe.tags.slice(0, variant === "compact" ? 1 : 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
          </div>

          <div className="grid grid-cols-3 gap-2 mt-4">
            {recipe.time && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3 text-primary" />
                <span>{recipe.time}</span>
              </div>
            )}
            {recipe.difficulty && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <ChefHat className="h-3 w-3 text-primary" />
                <span>{recipe.difficulty}</span>
              </div>
            )}
            {recipe.servings && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Users className="h-3 w-3 text-primary" />
                <span>{recipe.servings}</span>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 mt-auto">
          <Button
            asChild
            className="w-full group transition-all hover:shadow-md hover:translate-y-[-2px] active:translate-y-[1px]"
          >
            <Link href={`/receita/${recipe.id}`} className="flex items-center justify-center gap-2">
              <span>Ver Receita</span>
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              <span className="sr-only">: {recipe.title}</span>
            </Link>
          </Button>
        </CardFooter>
      </div>
    </Card>
  )
}
