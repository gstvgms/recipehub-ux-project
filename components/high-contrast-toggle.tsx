"use client"
import { EyeIcon } from "lucide-react"
import { useHighContrast } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function HighContrastToggle() {
  const { highContrast, setHighContrast } = useHighContrast()

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setHighContrast(!highContrast)}
            className="ml-2 rounded-full focus-visible:ring-2"
            aria-label={highContrast ? "Desativar modo de alto contraste" : "Ativar modo de alto contraste"}
          >
            <EyeIcon className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">{highContrast ? "Desativar" : "Ativar"} modo de alto contraste</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{highContrast ? "Desativar" : "Ativar"} modo de alto contraste</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
