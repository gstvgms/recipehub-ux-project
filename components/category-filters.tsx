"use client"

import { useState } from "react"
import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

type Category = {
  id: string
  name: string
  type: "cuisine" | "diet" | "mealType" | "difficulty" | "time"
}

type CategoryFiltersProps = {
  categories: {
    cuisines: Category[]
    diets: Category[]
    mealTypes: Category[]
    difficulties: Category[]
    times: Category[]
  }
  onFilterChange: (filters: Record<string, string[]>) => void
  className?: string
}

export function CategoryFilters({ categories, onFilterChange, className }: CategoryFiltersProps) {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    cuisine: [],
    diet: [],
    mealType: [],
    difficulty: [],
    time: [],
  })

  const [activeFilterCount, setActiveFilterCount] = useState(0)

  const handleFilterChange = (type: string, value: string) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev }

      if (newFilters[type].includes(value)) {
        newFilters[type] = newFilters[type].filter((item) => item !== value)
      } else {
        newFilters[type] = [...newFilters[type], value]
      }

      // Count total active filters
      const count = Object.values(newFilters).reduce((acc, curr) => acc + curr.length, 0)

      // Update filter count in a single batch
      setActiveFilterCount(count)

      // Notify parent component
      onFilterChange(newFilters)

      return newFilters
    })
  }

  const clearFilters = () => {
    const emptyFilters = {
      cuisine: [],
      diet: [],
      mealType: [],
      difficulty: [],
      time: [],
    }

    setSelectedFilters(emptyFilters)
    setActiveFilterCount(0)
    onFilterChange(emptyFilters)
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            <span>Filtros</span>
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 text-xs">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="start">
          <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <div className="max-h-[60vh] overflow-auto">
            {/* Cuisine filters */}
            <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">Cozinha</DropdownMenuLabel>
            {categories.cuisines.map((cuisine) => (
              <DropdownMenuCheckboxItem
                key={cuisine.id}
                checked={selectedFilters.cuisine.includes(cuisine.id)}
                onCheckedChange={() => handleFilterChange("cuisine", cuisine.id)}
              >
                {cuisine.name}
              </DropdownMenuCheckboxItem>
            ))}
            <DropdownMenuSeparator />

            {/* Diet filters */}
            <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">Dieta</DropdownMenuLabel>
            {categories.diets.map((diet) => (
              <DropdownMenuCheckboxItem
                key={diet.id}
                checked={selectedFilters.diet.includes(diet.id)}
                onCheckedChange={() => handleFilterChange("diet", diet.id)}
              >
                {diet.name}
              </DropdownMenuCheckboxItem>
            ))}
            <DropdownMenuSeparator />

            {/* Meal type filters */}
            <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
              Tipo de Refeição
            </DropdownMenuLabel>
            {categories.mealTypes.map((mealType) => (
              <DropdownMenuCheckboxItem
                key={mealType.id}
                checked={selectedFilters.mealType.includes(mealType.id)}
                onCheckedChange={() => handleFilterChange("mealType", mealType.id)}
              >
                {mealType.name}
              </DropdownMenuCheckboxItem>
            ))}
            <DropdownMenuSeparator />

            {/* Difficulty filters */}
            <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">Dificuldade</DropdownMenuLabel>
            {categories.difficulties.map((difficulty) => (
              <DropdownMenuCheckboxItem
                key={difficulty.id}
                checked={selectedFilters.difficulty.includes(difficulty.id)}
                onCheckedChange={() => handleFilterChange("difficulty", difficulty.id)}
              >
                {difficulty.name}
              </DropdownMenuCheckboxItem>
            ))}
            <DropdownMenuSeparator />

            {/* Time filters */}
            <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
              Tempo de Preparo
            </DropdownMenuLabel>
            {categories.times.map((time) => (
              <DropdownMenuCheckboxItem
                key={time.id}
                checked={selectedFilters.time.includes(time.id)}
                onCheckedChange={() => handleFilterChange("time", time.id)}
              >
                {time.name}
              </DropdownMenuCheckboxItem>
            ))}
          </div>

          {activeFilterCount > 0 && (
            <>
              <DropdownMenuSeparator />
              <div className="p-2">
                <Button variant="outline" size="sm" className="w-full" onClick={clearFilters}>
                  Limpar filtros
                </Button>
              </div>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Active filter badges */}
      <div className="flex flex-wrap gap-1">
        {Object.entries(selectedFilters).flatMap(([type, values]) =>
          values.map((value) => {
            const categoryType = {
              cuisine: categories.cuisines,
              diet: categories.diets,
              mealType: categories.mealTypes,
              difficulty: categories.difficulties,
              time: categories.times,
            }[type]

            const category = categoryType.find((c) => c.id === value)

            if (!category) return null

            return (
              <Badge key={`${type}-${value}`} variant="secondary" className="flex items-center gap-1 pr-1">
                {category.name}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => handleFilterChange(type, value)}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remover filtro {category.name}</span>
                </Button>
              </Badge>
            )
          }),
        )}
      </div>
    </div>
  )
}

function X(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
