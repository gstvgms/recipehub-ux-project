"use client"

import { useState, useCallback, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SkipToContent } from "@/components/skip-to-content"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { SearchBar } from "@/components/search-bar"
import { CategoryFilters } from "@/components/category-filters"
import { ScrollToBottom } from "@/components/scroll-to-bottom"
import { Pagination } from "@/components/pagination"
import { ViewToggle } from "@/components/view-toggle"
import { AnimatedRecipeGrid } from "@/components/animated-recipe-grid"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { allRecipes } from "@/data/recipes"
import { allCategories } from "@/data/recipes"

// Função de filtro movida para fora do componente para evitar recriação a cada renderização
const filterRecipesByTab = (recipes, tab) => {
  if (tab === "todas") return recipes
  return recipes.filter((recipe) => recipe.category === tab)
}

const filterRecipesByCategories = (recipes, filters) => {
  if (!filters || Object.values(filters).every((arr) => arr.length === 0)) {
    return recipes
  }

  return recipes.filter((recipe) => {
    // Verificar se a receita passa por todos os filtros ativos
    for (const [filterType, filterValues] of Object.entries(filters)) {
      if (!filterValues.length) continue // Pular se não houver filtros deste tipo

      // Verificar se a receita tem algum dos valores selecionados para este tipo de filtro
      switch (filterType) {
        case "cuisine":
          if (recipe.cuisine && !filterValues.includes(recipe.cuisine)) {
            return false
          }
          break
        case "diet":
          if (recipe.diet && !filterValues.some((diet) => recipe.diet.includes(diet))) {
            return false
          }
          break
        case "mealType":
          if (recipe.mealType && !filterValues.includes(recipe.mealType)) {
            return false
          }
          break
        case "difficulty":
          if (recipe.difficulty && !filterValues.includes(recipe.difficulty)) {
            return false
          }
          break
        case "time":
          // Filtros de tempo são intervalos, então precisamos de um tratamento especial
          if (recipe.prepTime) {
            const prepTimeMinutes = Number.parseInt(recipe.prepTime)
            let matchesTimeFilter = false

            for (const timeFilter of filterValues) {
              if (timeFilter === "under30" && prepTimeMinutes < 30) {
                matchesTimeFilter = true
                break
              } else if (timeFilter === "30to60" && prepTimeMinutes >= 30 && prepTimeMinutes <= 60) {
                matchesTimeFilter = true
                break
              } else if (timeFilter === "over60" && prepTimeMinutes > 60) {
                matchesTimeFilter = true
                break
              }
            }

            if (!matchesTimeFilter) return false
          }
          break
      }
    }

    return true
  })
}

// Constante para o número de itens por página
const ITEMS_PER_PAGE = 9

export default function Receitas() {
  // Estados
  const [searchResults, setSearchResults] = useState(allRecipes)

  // Usar localStorage para persistir filtros e página atual
  const [activeTab, setActiveTab] = useLocalStorage<string>("recipe-hub-active-tab", "todas")
  const [activeFilters, setActiveFilters] = useLocalStorage<Record<string, string[]>>("recipe-hub-filters", {
    cuisine: [],
    diet: [],
    mealType: [],
    difficulty: [],
    time: [],
  })
  const [currentPage, setCurrentPage] = useLocalStorage<number>("recipe-hub-current-page", 1)
  const [sortBy, setSortBy] = useLocalStorage<"rating" | "reviews" | "newest">("recipe-hub-sort", "rating")

  // Calcular receitas filtradas usando useMemo para evitar recálculos desnecessários
  const filteredRecipes = useMemo(() => {
    const recipesByTab = filterRecipesByTab(searchResults, activeTab)
    const filteredByCategories = filterRecipesByCategories(recipesByTab, activeFilters)

    // Ordenar receitas
    return [...filteredByCategories].sort((a, b) => {
      if (sortBy === "rating") {
        return (b.rating || 0) - (a.rating || 0)
      } else if (sortBy === "reviews") {
        return (b.reviews || 0) - (a.reviews || 0)
      } else {
        // Aqui seria por data, mas como não temos esse campo, usamos o ID como exemplo
        return a.id.localeCompare(b.id)
      }
    })
  }, [searchResults, activeTab, activeFilters, sortBy])

  // Calcular receitas paginadas
  const paginatedRecipes = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredRecipes.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredRecipes, currentPage])

  // Calcular o número total de páginas
  const totalPages = useMemo(() => Math.ceil(filteredRecipes.length / ITEMS_PER_PAGE), [filteredRecipes])

  // Resetar para a primeira página quando os filtros mudam
  useEffect(() => {
    setCurrentPage(1)
  }, [activeTab, activeFilters, searchResults, setCurrentPage])

  // Manipuladores de eventos
  const handleSearch = useCallback((results) => {
    setSearchResults(results)
  }, [])

  const handleFilterChange = useCallback(
    (filters) => {
      setActiveFilters(filters)
    },
    [setActiveFilters],
  )

  const handleTabChange = useCallback(
    (value) => {
      setActiveTab(value)
    },
    [setActiveTab],
  )

  const handlePageChange = useCallback(
    (page) => {
      setCurrentPage(page)
      // Rolar para o topo da lista de receitas
      window.scrollTo({ top: document.getElementById("recipes-grid")?.offsetTop - 100 || 0, behavior: "smooth" })
    },
    [setCurrentPage],
  )

  const handleResetFilters = useCallback(() => {
    setActiveTab("todas")
    setActiveFilters({
      cuisine: [],
      diet: [],
      mealType: [],
      difficulty: [],
      time: [],
    })
    setSearchResults(allRecipes)
    setCurrentPage(1)
  }, [setActiveTab, setActiveFilters, setCurrentPage])

  const handleSortChange = useCallback(
    (value: "rating" | "reviews" | "newest") => {
      setSortBy(value)
    },
    [setSortBy],
  )

  return (
    <>
      <SkipToContent />
      <SiteHeader />
      <main id="main-content" className="container py-6 md:py-10">
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Receitas Populares</h1>
              <p className="mt-2 text-lg text-muted-foreground">As receitas mais amadas pela nossa comunidade</p>
            </div>

            <div className="w-full max-w-sm search-bar">
              <SearchBar recipes={allRecipes} onSearch={handleSearch} />
            </div>
          </div>
        </div>

        <div className="mb-6 filters">
          <CategoryFilters categories={allCategories} onFilterChange={handleFilterChange} />
        </div>

        <Tabs defaultValue={activeTab} value={activeTab} className="mb-8" onValueChange={handleTabChange}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <TabsList aria-label="Filtrar receitas por categoria">
              <TabsTrigger value="todas">Todas</TabsTrigger>
              <TabsTrigger value="pizza">Pizzas</TabsTrigger>
              <TabsTrigger value="sobremesa">Sobremesas</TabsTrigger>
              <TabsTrigger value="massa">Massas</TabsTrigger>
              <TabsTrigger value="bebida">Bebidas</TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <select
                className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value as "rating" | "reviews" | "newest")}
                aria-label="Ordenar por"
              >
                <option value="rating">Melhor avaliação</option>
                <option value="reviews">Mais avaliações</option>
                <option value="newest">Mais recentes</option>
              </select>

              <ViewToggle />
            </div>
          </div>

          <div className="mt-6">
            {filteredRecipes.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">Nenhuma receita encontrada com os filtros selecionados.</p>
                <Button variant="outline" className="mt-4" onClick={handleResetFilters}>
                  Limpar filtros
                </Button>
              </div>
            ) : (
              <>
                <div className="mb-4 flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">{filteredRecipes.length}</span> receitas encontradas
                  </p>
                </div>

                <div id="recipes-grid">
                  <AnimatedRecipeGrid recipes={paginatedRecipes} />
                </div>

                <div className="mt-8 pagination">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    showPageInfo={true}
                    itemsPerPage={ITEMS_PER_PAGE}
                    totalItems={filteredRecipes.length}
                  />
                </div>
              </>
            )}
          </div>
        </Tabs>
      </main>

      <SiteFooter />
      <ScrollToBottom />
    </>
  )
}
