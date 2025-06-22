"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Trash2, FolderHeart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"
import { SkipToContent } from "@/components/skip-to-content"
import { useFavorites } from "@/contexts/favorites-context"
import { useToast } from "@/hooks/use-toast"
import { StarRating } from "@/components/star-rating"
import { SearchBar } from "@/components/search-bar"
import { EmptyState } from "@/components/empty-state"
import { ScrollToBottom } from "@/components/scroll-to-bottom"
import { Pagination } from "@/components/pagination"

// Constante para o número de itens por página
const ITEMS_PER_PAGE = 9

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites()
  const { toast } = useToast()
  const [searchResults, setSearchResults] = useState(favorites)
  const [currentPage, setCurrentPage] = useState(1)

  // Calcular receitas paginadas
  const paginatedRecipes = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return searchResults.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [searchResults, currentPage])

  // Calcular o número total de páginas
  const totalPages = useMemo(() => Math.ceil(searchResults.length / ITEMS_PER_PAGE), [searchResults])

  const handleSearch = (results) => {
    setSearchResults(results)
    setCurrentPage(1) // Resetar para a primeira página quando a busca muda
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    // Rolar para o topo da lista de receitas
    window.scrollTo({ top: document.getElementById("favorites-grid")?.offsetTop - 100 || 0, behavior: "smooth" })
  }

  const handleRemoveFavorite = (id: string, title: string) => {
    removeFavorite(id)

    // Atualizar os resultados de busca após remover um favorito
    setSearchResults((prev) => prev.filter((recipe) => recipe.id !== id))

    // Ajustar a página atual se necessário
    const newTotalItems = searchResults.length - 1
    const newTotalPages = Math.ceil(newTotalItems / ITEMS_PER_PAGE)
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages)
    }

    toast({
      title: "Receita removida dos favoritos",
      description: `${title} foi removida da sua lista de favoritos.`,
    })
  }

  return (
    <>
      <SkipToContent />
      <SiteHeader />
      <main id="main-content" className="container py-6 md:py-10">
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Minhas Receitas Favoritas</h1>
              <p className="mt-2 text-lg text-muted-foreground">Acesse facilmente suas receitas salvas</p>
            </div>

            <div className="w-full max-w-sm">
              <SearchBar recipes={favorites} onSearch={handleSearch} />
            </div>
          </div>
        </div>

        {favorites.length === 0 ? (
          <EmptyState
            icon={<FolderHeart className="h-12 w-12 text-muted-foreground" />}
            title="Nenhuma receita favorita"
            description="Você ainda não adicionou nenhuma receita aos favoritos. Explore nossas receitas e salve suas favoritas!"
            action={
              <Button asChild>
                <Link href="/receitas">Explorar Receitas</Link>
              </Button>
            }
          />
        ) : searchResults.length === 0 ? (
          <EmptyState
            icon={<Search className="h-12 w-12 text-muted-foreground" />}
            title="Nenhum resultado encontrado"
            description="Não encontramos nenhuma receita favorita correspondente à sua busca."
            action={
              <Button variant="outline" onClick={() => setSearchResults(favorites)}>
                Mostrar todas as favoritas
              </Button>
            }
          />
        ) : (
          <>
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">{searchResults.length}</span> receitas favoritas
              </p>
            </div>

            <div id="favorites-grid" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedRecipes.map((recipe) => (
                <Card key={recipe.id} className="overflow-hidden transition-all hover:shadow-md">
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src={recipe.image || "/placeholder.svg?height=400&width=600"}
                      alt={recipe.title}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <CardHeader className="p-4">
                    <CardTitle className="line-clamp-1 text-xl">{recipe.title}</CardTitle>
                    {recipe.rating && (
                      <div className="flex items-center gap-2">
                        <StarRating rating={recipe.rating} />
                        <span className="text-xs text-muted-foreground">({recipe.reviews} avaliações)</span>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="line-clamp-2 text-sm text-muted-foreground">{recipe.description}</p>
                    {recipe.tags && recipe.tags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {recipe.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <Button asChild variant="default" className="flex-1 mr-2">
                      <Link href={`/receita/${recipe.id}`}>Ver Receita</Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleRemoveFavorite(recipe.id, recipe.title)}
                      className="text-muted-foreground hover:text-destructive hover:border-destructive"
                      aria-label={`Remover ${recipe.title} dos favoritos`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                showPageInfo={true}
                itemsPerPage={ITEMS_PER_PAGE}
                totalItems={searchResults.length}
              />
            </div>
          </>
        )}
      </main>

      <ScrollToBottom />
    </>
  )
}
