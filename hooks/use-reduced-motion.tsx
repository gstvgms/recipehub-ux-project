"use client"

import { useState, useEffect } from "react"

export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check if the browser supports the API
    if (typeof window !== "undefined" && window.matchMedia) {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")

      // Set initial value
      setPrefersReducedMotion(mediaQuery.matches)

      // Create event listener for changes
      const handleChange = (event: MediaQueryListEvent) => {
        setPrefersReducedMotion(event.matches)
      }

      // Add the listener
      mediaQuery.addEventListener("change", handleChange)

      // Clean up
      return () => {
        mediaQuery.removeEventListener("change", handleChange)
      }
    }

    // Default to false if API not supported
    return () => {}
  }, [])

  return prefersReducedMotion
}
