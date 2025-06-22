"use client"

import { useEffect, useRef } from "react"

export function SkipToContent() {
  const skipLinkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    // Ensure the skip link is only visible when focused
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Tab" && event.shiftKey) {
        skipLinkRef.current?.focus()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <a
      ref={skipLinkRef}
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring"
    >
      Pular para o conteúdo
    </a>
  )
}
