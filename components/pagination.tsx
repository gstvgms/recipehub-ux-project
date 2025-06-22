"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
  showPageInfo?: boolean
  itemsPerPage?: number
  totalItems?: number
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
  showPageInfo = true,
  itemsPerPage,
  totalItems,
}: PaginationProps) {
  // Não renderizar paginação se houver apenas uma página
  if (totalPages <= 1) return null

  // Determinar quais números de página mostrar
  const getPageNumbers = () => {
    const pageNumbers = []
    const maxPagesToShow = 5 // Número máximo de botões de página para mostrar

    if (totalPages <= maxPagesToShow) {
      // Se tivermos poucas páginas, mostrar todas
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      // Sempre mostrar a primeira página
      pageNumbers.push(1)

      // Calcular o intervalo de páginas a mostrar
      let startPage = Math.max(2, currentPage - 1)
      let endPage = Math.min(totalPages - 1, currentPage + 1)

      // Ajustar para mostrar sempre 3 páginas no meio
      if (startPage === 2) {
        endPage = Math.min(totalPages - 1, startPage + 2)
      } else if (endPage === totalPages - 1) {
        startPage = Math.max(2, endPage - 2)
      }

      // Adicionar elipses se necessário
      if (startPage > 2) {
        pageNumbers.push("ellipsis-start")
      }

      // Adicionar páginas do meio
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i)
      }

      // Adicionar elipses se necessário
      if (endPage < totalPages - 1) {
        pageNumbers.push("ellipsis-end")
      }

      // Sempre mostrar a última página
      pageNumbers.push(totalPages)
    }

    return pageNumbers
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className={cn("flex flex-col items-center gap-2 sm:flex-row sm:justify-between", className)}>
      {showPageInfo && itemsPerPage && totalItems && (
        <div className="text-sm text-muted-foreground">
          Mostrando{" "}
          <span className="font-medium">
            {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} -{" "}
            {Math.min(currentPage * itemsPerPage, totalItems)}
          </span>{" "}
          de <span className="font-medium">{totalItems}</span> receitas
        </div>
      )}

      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Página anterior"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {pageNumbers.map((page, index) => {
          if (page === "ellipsis-start" || page === "ellipsis-end") {
            return (
              <Button
                key={`ellipsis-${index}`}
                variant="outline"
                size="icon"
                className="h-8 w-8 cursor-default"
                disabled
              >
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Mais páginas</span>
              </Button>
            )
          }

          return (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="icon"
              className="h-8 w-8"
              onClick={() => onPageChange(page as number)}
              aria-label={`Ir para página ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </Button>
          )
        })}

        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Próxima página"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
