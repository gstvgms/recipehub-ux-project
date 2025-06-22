"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Recipe = {
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

type FavoritesContextType = {
  favorites: Recipe[]
  addFavorite: (recipe: Recipe) => void
  removeFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Recipe[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem("recipe-hub-favorites")
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites))
      }
    } catch (error) {
      console.error("Failed to parse favorites from localStorage:", error)
    } finally {
      setIsInitialized(true)
    }
  }, [])

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem("recipe-hub-favorites", JSON.stringify(favorites))
      } catch (error) {
        console.error("Failed to save favorites to localStorage:", error)
      }
    }
  }, [favorites, isInitialized])

  const addFavorite = (recipe: Recipe) => {
    setFavorites((prev) => {
      if (prev.some((item) => item.id === recipe.id)) {
        return prev
      }
      return [...prev, recipe]
    })
  }

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((recipe) => recipe.id !== id))
  }

  const isFavorite = (id: string) => {
    return favorites.some((recipe) => recipe.id === id)
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
}
