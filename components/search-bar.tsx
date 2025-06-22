"use client"

import { useState, useEffect, useRef } from "react"
import { Search, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useRouter } from "next/navigation"
import { useDebounce } from "@/hooks/use-debounce"
import { cn } from "@/lib/utils"

type Recipe = {
  id: string
  title: string
  description: string
  image: string
  category: string
  tags?: string[]
}

type SearchBarProps = {
  recipes: Recipe[]
  className?: string
  onSearch?: (results: Recipe[]) => void
  onClose?: () => void
  isOpen?: boolean
  setIsOpen?: (isOpen: boolean) => void
}

export function SearchBar({ recipes, className, onSearch, onClose, isOpen, setIsOpen }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<Recipe[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  // Handle search term changes
  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true)
      // Use setTimeout to avoid state updates in the same render cycle
      const timer = setTimeout(() => {
        const results = searchRecipes(debouncedSearchTerm, recipes)
        setSearchResults(results)
        if (onSearch) onSearch(results)
        setIsSearching(false)
        setIsPopoverOpen(true)
      }, 0)
      return () => clearTimeout(timer)
    } else {
      setSearchResults([])
      if (onSearch) onSearch(recipes)
      setIsPopoverOpen(false)
    }
  }, [debouncedSearchTerm, recipes, onSearch])

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const searchRecipes = (term: string, recipeList: Recipe[]): Recipe[] => {
    const lowerCaseTerm = term.toLowerCase()

    return recipeList.filter((recipe) => {
      // Search in title
      if (recipe.title.toLowerCase().includes(lowerCaseTerm)) {
        return true
      }

      // Search in description
      if (recipe.description.toLowerCase().includes(lowerCaseTerm)) {
        return true
      }

      // Search in tags
      if (recipe.tags && recipe.tags.some((tag) => tag.toLowerCase().includes(lowerCaseTerm))) {
        return true
      }

      // Search in category
      if (recipe.category.toLowerCase().includes(lowerCaseTerm)) {
        return true
      }

      return false
    })
  }

  const handleSelectRecipe = (recipeId: string) => {
    setIsPopoverOpen(false)
    if (setIsOpen) setIsOpen(false)
    router.push(`/receita/${recipeId}`)
  }

  const handleClearSearch = () => {
    setSearchTerm("")
    setSearchResults([])
    if (onSearch) onSearch(recipes)
    if (inputRef.current) inputRef.current.focus()
  }

  const handleClose = () => {
    if (onClose) onClose()
    if (setIsOpen) setIsOpen(false)
  }

  return (
    <div className={cn("relative w-full", className)}>
      <Popover open={isPopoverOpen && searchResults.length > 0} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <div className="relative flex items-center">
            <Search
              className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              ref={inputRef}
              type="search"
              placeholder="Buscar receitas, ingredientes..."
              className="w-full pl-8 pr-10 focus-visible:ring-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Buscar receitas"
            />
            {isSearching ? (
              <Loader2 className="absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-muted-foreground" />
            ) : searchTerm ? (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full rounded-l-none"
                onClick={handleClearSearch}
                aria-label="Limpar busca"
              >
                <X className="h-4 w-4" />
              </Button>
            ) : null}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
          <Command>
            <CommandList>
              <CommandEmpty>Nenhuma receita encontrada.</CommandEmpty>
              <CommandGroup heading="Receitas">
                {searchResults.slice(0, 5).map((recipe) => (
                  <CommandItem
                    key={recipe.id}
                    onSelect={() => handleSelectRecipe(recipe.id)}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <p className="font-medium">{recipe.title}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">{recipe.description}</p>
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
              {searchResults.length > 5 && (
                <div className="py-2 px-2 text-center text-xs text-muted-foreground">
                  + {searchResults.length - 5} mais resultados
                </div>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {onClose && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 h-full"
          onClick={handleClose}
          aria-label="Fechar busca"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
