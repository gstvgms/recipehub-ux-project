"use client"

import { Grid, List } from "lucide-react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useEffect } from "react"
import { useLocalStorage } from "@/hooks/use-local-storage"

interface ViewToggleProps {
  className?: string
}

export function ViewToggle({ className }: ViewToggleProps) {
  // Usar localStorage para persistir a preferência do usuário
  const [viewMode, setViewMode] = useLocalStorage<"grid" | "list">("recipe-hub-view-mode", "grid")

  // Aplicar a classe ao body para controlar o estilo de visualização
  useEffect(() => {
    if (viewMode === "list") {
      document.body.classList.add("list-view")
    } else {
      document.body.classList.remove("list-view")
    }
  }, [viewMode])

  return (
    <ToggleGroup
      type="single"
      value={viewMode}
      onValueChange={(value) => value && setViewMode(value as "grid" | "list")}
      className={className}
    >
      <ToggleGroupItem value="grid" aria-label="Visualização em grade">
        <Grid className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="list" aria-label="Visualização em lista">
        <List className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
