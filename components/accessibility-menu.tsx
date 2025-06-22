"use client"

import { useEffect } from "react"
import { Accessibility, Type, LayoutListIcon as LetterSpacing, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import { useLocalStorage } from "@/hooks/use-local-storage"

export function AccessibilityMenu() {
  // Preferências de acessibilidade
  const [textSize, setTextSize] = useLocalStorage<"normal" | "large" | "xl">("recipe-hub-text-size", "normal")
  const [textSpacing, setTextSpacing] = useLocalStorage<"normal" | "wide" | "wider">(
    "recipe-hub-text-spacing",
    "normal",
  )
  const [highContrast, setHighContrast] = useLocalStorage<boolean>("recipe-hub-high-contrast", false)
  const [focusOutline, setFocusOutline] = useLocalStorage<boolean>("recipe-hub-focus-outline", false)

  // Aplicar as preferências ao carregar o componente
  useEffect(() => {
    // Aplicar tamanho do texto
    document.documentElement.classList.remove("text-size-normal", "text-size-large", "text-size-xl")
    document.documentElement.classList.add(`text-size-${textSize}`)

    // Aplicar espaçamento do texto
    document.documentElement.classList.remove("text-spacing-normal", "text-spacing-wide", "text-spacing-wider")
    document.documentElement.classList.add(`text-spacing-${textSpacing}`)

    // Aplicar contorno de foco
    if (focusOutline) {
      document.documentElement.classList.add("focus-visible-outline")
    } else {
      document.documentElement.classList.remove("focus-visible-outline")
    }
  }, [textSize, textSpacing, focusOutline])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Opções de acessibilidade">
          <Accessibility className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Acessibilidade</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Tamanho do texto */}
        <DropdownMenuLabel className="flex items-center text-xs font-normal text-muted-foreground">
          <Type className="mr-2 h-4 w-4" />
          Tamanho do texto
        </DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={textSize}
          onValueChange={(value) => setTextSize(value as "normal" | "large" | "xl")}
        >
          <DropdownMenuRadioItem value="normal">Normal</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="large">Grande</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="xl">Extra grande</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />

        {/* Espaçamento do texto */}
        <DropdownMenuLabel className="flex items-center text-xs font-normal text-muted-foreground">
          <LetterSpacing className="mr-2 h-4 w-4" />
          Espaçamento do texto
        </DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={textSpacing}
          onValueChange={(value) => setTextSpacing(value as "normal" | "wide" | "wider")}
        >
          <DropdownMenuRadioItem value="normal">Normal</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="wide">Ampliado</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="wider">Muito ampliado</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />

        {/* Outras opções */}
        <DropdownMenuItem onClick={() => setFocusOutline(!focusOutline)}>
          <Eye className="mr-2 h-4 w-4" />
          Contorno de foco visível
          <div className="ml-auto">{focusOutline ? "✓" : ""}</div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
