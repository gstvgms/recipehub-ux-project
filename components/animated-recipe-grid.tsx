"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AnimatedRecipeCard } from "@/components/animated-recipe-card"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface AnimatedRecipeGridProps {
  recipes: any[]
  className?: string
}

export function AnimatedRecipeGrid({ recipes, className }: AnimatedRecipeGridProps) {
  const [mounted, setMounted] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  // Prevent hydration mismatch by only rendering animations client-side
  useEffect(() => {
    setMounted(true)
  }, [])

  // Container variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
        delayChildren: 0.1,
      },
    },
  }

  if (!mounted) {
    // Server-side or initial render - no animations
    return (
      <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${className || ""}`}>
        {recipes.map((recipe) => (
          <div key={recipe.id} className="opacity-0">
            <AnimatedRecipeCard recipe={recipe} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <motion.div
      className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${className || ""}`}
      variants={prefersReducedMotion ? {} : containerVariants}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
        {recipes.map((recipe, index) => (
          <AnimatedRecipeCard key={recipe.id} recipe={recipe} index={index} />
        ))}
      </AnimatePresence>
    </motion.div>
  )
}
