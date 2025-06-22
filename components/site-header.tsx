"use client"

import Link from "next/link"
import { Search, Menu, Heart, User } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { HighContrastToggle } from "@/components/high-contrast-toggle"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SearchBar } from "@/components/search-bar"
import { useFavorites } from "@/contexts/favorites-context"
import { Badge } from "@/components/ui/badge"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { AccessibilityMenu } from "@/components/accessibility-menu"
import { RecipeHubLogo } from "@/components/recipe-hub-logo"

// Dados simulados para a busca
import { allRecipes } from "@/data/recipes"

export function SiteHeader() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { favorites } = useFavorites()
  const pathname = usePathname()

  // Helper function to check if a path is active
  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  return (
    <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 print:hidden">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu de navegação">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="mb-8 mt-4">
                <RecipeHubLogo size="lg" />
              </div>
              <nav className="flex flex-col space-y-4" aria-label="Navegação principal mobile">
                <Link
                  href="/"
                  className={cn(
                    "text-base font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive("/") ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  Home
                </Link>
                <Link
                  href="/receitas"
                  className={cn(
                    "text-base font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive("/receitas") ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  Receitas
                </Link>
                <Link
                  href="/favoritos"
                  className={cn(
                    "text-base font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring flex items-center gap-2",
                    isActive("/favoritos") ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  Favoritos
                  {favorites.length > 0 && (
                    <Badge variant="secondary" className="h-5 w-5 rounded-full p-0 text-xs">
                      {favorites.length}
                    </Badge>
                  )}
                </Link>
                <Link
                  href="/perfil"
                  className={cn(
                    "text-base font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive("/perfil") ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  Meu Perfil
                </Link>
                <Link
                  href="/sobre"
                  className={cn(
                    "text-base font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive("/sobre") ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  Sobre
                </Link>
                <Link
                  href="/contatos"
                  className={cn(
                    "text-base font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive("/contatos") ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  Contatos
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          <Link
            href="/"
            className="flex items-center gap-2 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="RecipeHub - Página inicial"
          >
            <RecipeHubLogo />
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-4" aria-label="Navegação principal">
          <Link
            href="/"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring relative",
              isActive("/")
                ? "text-foreground after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-primary after:content-['']"
                : "text-muted-foreground",
            )}
          >
            Home
          </Link>
          <Link
            href="/receitas"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring relative",
              isActive("/receitas")
                ? "text-foreground after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-primary after:content-['']"
                : "text-muted-foreground",
            )}
          >
            Receitas
          </Link>
          <Link
            href="/favoritos"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring flex items-center gap-1 relative",
              isActive("/favoritos")
                ? "text-foreground after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-primary after:content-['']"
                : "text-muted-foreground",
            )}
          >
            Favoritos
            {favorites.length > 0 && (
              <Badge variant="secondary" className="h-5 w-5 rounded-full p-0 text-xs">
                {favorites.length}
              </Badge>
            )}
          </Link>
          <Link
            href="/perfil"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring relative",
              isActive("/perfil")
                ? "text-foreground after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-primary after:content-['']"
                : "text-muted-foreground",
            )}
          >
            Meu Perfil
          </Link>
          <Link
            href="/sobre"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring relative",
              isActive("/sobre")
                ? "text-foreground after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-primary after:content-['']"
                : "text-muted-foreground",
            )}
          >
            Sobre
          </Link>
          <Link
            href="/contatos"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring relative",
              isActive("/contatos")
                ? "text-foreground after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-primary after:content-['']"
                : "text-muted-foreground",
            )}
          >
            Contatos
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {isSearchOpen ? (
            <div className="relative w-full max-w-sm search-bar">
              <SearchBar
                recipes={allRecipes}
                onClose={() => setIsSearchOpen(false)}
                isOpen={isSearchOpen}
                setIsOpen={setIsSearchOpen}
              />
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
              className="rounded-full focus-visible:ring-2"
              aria-label="Buscar"
            >
              <Search className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">Buscar</span>
            </Button>
          )}

          <Link href="/favoritos" aria-label="Favoritos" className="relative">
            <Button variant="ghost" size="icon" className="rounded-full focus-visible:ring-2">
              <Heart className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">Favoritos</span>
              {favorites.length > 0 && (
                <Badge
                  variant="secondary"
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                >
                  {favorites.length}
                </Badge>
              )}
            </Button>
          </Link>

          <Link href="/perfil" aria-label="Meu Perfil">
            <Button variant="ghost" size="icon" className="rounded-full focus-visible:ring-2">
              <User className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">Meu Perfil</span>
            </Button>
          </Link>

          <AccessibilityMenu />
          <ThemeToggle />
          <HighContrastToggle />
        </div>
      </div>
    </header>
  )
}
