import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { FavoritesProvider } from "@/contexts/favorites-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "RecipeHub - Descubra receitas deliciosas",
  description: "Explore nossa coleção de receitas saborosas e fáceis de preparar",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          enableHighContrast
          defaultHighContrast={false}
        >
          <FavoritesProvider>
            {children}
            <Toaster />
          </FavoritesProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
