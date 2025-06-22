"use client"

import { Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

interface PrintButtonProps {
  className?: string
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  recipeTitle?: string
}

export function PrintButton({ className, variant = "outline", size = "default", recipeTitle }: PrintButtonProps) {
  const { toast } = useToast()

  const handlePrint = () => {
    // Preparar a página para impressão
    const originalTitle = document.title
    if (recipeTitle) {
      document.title = `RecipeHub - ${recipeTitle}`
    }

    // Adicionar classe de impressão ao body
    document.body.classList.add("printing")

    // Imprimir
    window.print()

    // Restaurar após impressão
    setTimeout(() => {
      document.body.classList.remove("printing")
      document.title = originalTitle

      toast({
        title: "Receita enviada para impressão",
        description: "Verifique sua impressora ou salve como PDF.",
      })
    }, 500)
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handlePrint}
      className={cn("print:hidden", className)}
      aria-label="Imprimir receita"
    >
      <Printer className="mr-2 h-4 w-4" />
      Imprimir
    </Button>
  )
}
