"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export interface ThemeOptions {
  attribute: string
  defaultTheme: string
  enableSystem: boolean
  enableHighContrast?: boolean
  defaultHighContrast?: boolean
  storageKey?: string
  highContrastStorageKey?: string
}

const HighContrastContext = React.createContext<{
  highContrast: boolean
  setHighContrast: (highContrast: boolean) => void
}>({
  highContrast: false,
  setHighContrast: () => null,
})

export function ThemeProvider({
  children,
  enableHighContrast = true,
  defaultHighContrast = false,
  highContrastStorageKey = "recipe-hub-high-contrast",
  ...props
}: ThemeProviderProps & {
  enableHighContrast?: boolean
  defaultHighContrast?: boolean
  highContrastStorageKey?: string
}) {
  const [highContrast, setHighContrastState] = React.useState<boolean>(defaultHighContrast)

  // Initialize high contrast mode from localStorage
  React.useEffect(() => {
    const storedHighContrast = localStorage.getItem(highContrastStorageKey)
    if (storedHighContrast !== null) {
      setHighContrastState(storedHighContrast === "true")
    }
  }, [highContrastStorageKey])

  // Update high contrast class on document
  React.useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add("high-contrast")
    } else {
      document.documentElement.classList.remove("high-contrast")
    }
  }, [highContrast])

  // Update localStorage when high contrast changes
  const setHighContrast = React.useCallback(
    (value: boolean) => {
      setHighContrastState(value)
      localStorage.setItem(highContrastStorageKey, String(value))
    },
    [highContrastStorageKey],
  )

  const contextValue = React.useMemo(
    () => ({
      highContrast,
      setHighContrast,
    }),
    [highContrast, setHighContrast],
  )

  return (
    <HighContrastContext.Provider value={contextValue}>
      <NextThemesProvider {...props}>{children}</NextThemesProvider>
    </HighContrastContext.Provider>
  )
}

export const useHighContrast = () => {
  const context = React.useContext(HighContrastContext)
  if (context === undefined) {
    throw new Error("useHighContrast must be used within a ThemeProvider")
  }
  return context
}
