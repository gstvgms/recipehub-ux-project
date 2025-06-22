"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Clock, Users, ChefHat, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FavoriteButton } from "@/components/favorite-button"
import { ScrollToBottom } from "@/components/scroll-to-bottom"
import { PrintButton } from "@/components/print-button"
import { RecipeRating } from "@/components/recipe-rating"
import { VideoPlayer } from "@/components/video-player"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { allRecipes } from "@/data/recipes"

export default function RecipePage({ params }) {
  // Em um projeto real, buscaríamos os dados da receita com base no ID
  // Aqui estamos simulando com dados estáticos
  const [recipe, setRecipe] = useState(null)
  const [relatedRecipes, setRelatedRecipes] = useState([])
  const [comment, setComment] = useState("")
  const { toast } = useToast()

  // Usar localStorage para armazenar comentários
  const [comments, setComments] = useLocalStorage<Record<string, Array<{ text: string; date: string }>>>(
    "recipe-hub-comments",
    {},
  )

  // Comentários para esta receita
  const recipeComments = comments[params.id] || []

  useEffect(() => {
    // Encontrar a receita atual
    const currentRecipe = allRecipes.find((r) => r.id === params.id) || allRecipes[0]
    setRecipe(currentRecipe)

    // Encontrar receitas relacionadas
    if (currentRecipe) {
      const related = allRecipes
        .filter((r) => r.category === currentRecipe.category && r.id !== currentRecipe.id)
        .slice(0, 3)
      setRelatedRecipes(related)
    }
  }, [params.id])

  const handleRatingChange = (rating) => {
    // Em um projeto real, enviaríamos esta avaliação para o servidor
    console.log(`Receita ${params.id} avaliada com ${rating} estrelas`)
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault()

    if (!comment.trim()) {
      toast({
        title: "Comentário vazio",
        description: "Por favor, escreva um comentário antes de enviar.",
        variant: "destructive",
      })
      return
    }

    // Adicionar novo comentário
    const newComment = {
      text: comment,
      date: new Date().toISOString(),
    }

    const updatedComments = {
      ...comments,
      [params.id]: [...(comments[params.id] || []), newComment],
    }

    setComments(updatedComments)
    setComment("")

    toast({
      title: "Comentário adicionado",
      description: "Seu comentário foi adicionado com sucesso.",
    })
  }

  if (!recipe) {
    return <div>Carregando...</div>
  }

  return (
    <>
      <SiteHeader />
      <main className="container py-6 md:py-10 recipe-print-container">
        <div className="grid gap-6 md:grid-cols-2 recipe-print-header">
          <div className="relative aspect-video overflow-hidden rounded-lg md:aspect-square">
            <Image
              src={recipe.image || "/placeholder.svg"}
              alt={recipe.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{recipe.title}</h1>
              <p className="mt-4 text-lg text-muted-foreground">{recipe.description}</p>

              <div className="mt-4 flex items-center gap-2">
                <RecipeRating
                  recipeId={recipe.id}
                  initialRating={recipe.rating || 0}
                  onRatingChange={handleRatingChange}
                  size="lg"
                />
                <span className="text-sm text-muted-foreground">({recipe.reviews || 0} avaliações)</span>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {recipe.tags &&
                  recipe.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
              </div>

              <div className="mt-6 grid grid-cols-3 gap-4">
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-4">
                    <Clock className="mb-2 h-6 w-6 text-muted-foreground" aria-hidden="true" />
                    <span className="text-sm font-medium">Tempo</span>
                    <span className="text-lg font-bold">{recipe.time}</span>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-4">
                    <Users className="mb-2 h-6 w-6 text-muted-foreground" aria-hidden="true" />
                    <span className="text-sm font-medium">Porções</span>
                    <span className="text-lg font-bold">{recipe.servings}</span>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-4">
                    <ChefHat className="mb-2 h-6 w-6 text-muted-foreground" aria-hidden="true" />
                    <span className="text-sm font-medium">Dificuldade</span>
                    <span className="text-lg font-bold">{recipe.difficulty}</span>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <FavoriteButton recipe={recipe} variant="default" size="lg" className="w-full" />
              <PrintButton variant="outline" size="lg" className="w-full" recipeTitle={recipe.title} />
            </div>
          </div>
        </div>

        {recipe.video && (
          <div className="mt-8 print:hidden">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Video className="h-6 w-6" />
              Vídeo da Receita
            </h2>
            <VideoPlayer
              youtubeId={recipe.video.type === "youtube" ? recipe.video.id : undefined}
              src={recipe.video.type === "file" ? recipe.video.url : undefined}
              poster={recipe.image}
              title={recipe.title}
            />
          </div>
        )}

        <Tabs defaultValue="ingredientes" className="mt-10 recipe-print-section">
          <TabsList className="w-full justify-start print:hidden">
            <TabsTrigger value="ingredientes">Ingredientes</TabsTrigger>
            <TabsTrigger value="preparo">Modo de Preparo</TabsTrigger>
            <TabsTrigger value="dicas">Dicas</TabsTrigger>
            <TabsTrigger value="comentarios">Comentários ({recipeComments.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="ingredientes" className="mt-6">
            <h2 className="text-xl font-bold mb-4 print:block hidden">Ingredientes</h2>
            <ul className="grid gap-2 md:grid-cols-2 recipe-print-list">
              {recipe.ingredients &&
                recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                      <span className="text-sm font-medium">{index + 1}</span>
                    </div>
                    <span>{ingredient}</span>
                  </li>
                ))}
            </ul>
          </TabsContent>

          <TabsContent value="preparo" className="mt-6">
            <h2 className="text-xl font-bold mb-4 print:block hidden">Modo de Preparo</h2>
            <ol className="grid gap-4 recipe-print-list">
              {recipe.instructions &&
                recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <span className="text-sm font-medium">{index + 1}</span>
                    </div>
                    <div>
                      <p>{instruction}</p>
                    </div>
                  </li>
                ))}
            </ol>
          </TabsContent>

          <TabsContent value="dicas" className="mt-6">
            <h2 className="text-xl font-bold mb-4 print:block hidden">Dicas do Chef</h2>
            <div className="rounded-lg bg-muted p-6">
              <p className="text-muted-foreground">{recipe.tips}</p>
            </div>
          </TabsContent>

          <TabsContent value="comentarios" className="mt-6 print:hidden">
            <div className="space-y-6">
              <h2 className="text-xl font-bold">Comentários ({recipeComments.length})</h2>

              {recipeComments.length > 0 ? (
                <div className="space-y-4">
                  {recipeComments.map((comment, index) => (
                    <div key={index} className="rounded-lg border p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Usuário Anônimo</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(comment.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm">{comment.text}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  Ainda não há comentários para esta receita. Seja o primeiro a comentar!
                </p>
              )}

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Adicionar comentário</h3>
                <form onSubmit={handleCommentSubmit} className="space-y-4">
                  <Textarea
                    placeholder="Compartilhe sua experiência com esta receita..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                  />
                  <Button type="submit">Enviar comentário</Button>
                </form>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <section className="mt-16 print:hidden">
          <h2 className="text-2xl font-bold">Receitas Relacionadas</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedRecipes.map((relatedRecipe) => (
              <Card key={relatedRecipe.id} className="overflow-hidden">
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={relatedRecipe.image || "/placeholder.svg"}
                    alt={relatedRecipe.title}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold">{relatedRecipe.title}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{relatedRecipe.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <Button asChild variant="outline">
                      <Link href={`/receita/${relatedRecipe.id}`}>Ver Receita</Link>
                    </Button>
                    <FavoriteButton recipe={relatedRecipe} />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
      <ScrollToBottom />
    </>
  )
}
