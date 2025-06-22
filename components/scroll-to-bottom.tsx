"use client"

import { useState, useEffect } from "react"
import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ScrollToBottom({ className }: { className?: string }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled 20% down
      const scrolled = document.documentElement.scrollTop
      const pageHeight = document.documentElement.scrollHeight
      const windowHeight = window.innerHeight
      const threshold = (pageHeight - windowHeight) * 0.2

      setIsVisible(scrolled > threshold && scrolled < (pageHeight - windowHeight) * 0.9)
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    })
  }

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        "fixed bottom-6 right-6 z-50 rounded-full shadow-md transition-opacity duration-300",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none",
        className,
      )}
      onClick={scrollToBottom}
      aria-label="Rolar para o final da página"
    >
      <ArrowDown className="h-5 w-5" />
    </Button>
  )
}
