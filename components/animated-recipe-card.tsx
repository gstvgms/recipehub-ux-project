"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Clock, ChefHat, Users, ChevronRight } from "lucide-react"
import { motion, useAnimation, useInView } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { FavoriteButton } from "@/components/favorite-button"
import { RecipeRating } from "@/components/recipe-rating"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface AnimatedRecipeCardProps {
  recipe: {
    id: string
    title: string
    description: string
    image: string
    category: string
    time?: string
    difficulty?: string
    servings?: string
    tags?: string[]
    rating?: number
    reviews?: number
    featured?: boolean
  }
  variant?: "default" | "compact" | "featured"
  className?: string
  index?: number
}

export function AnimatedRecipeCard({ recipe, variant = "default", className, index = 0 }: AnimatedRecipeCardProps) {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const isSmallScreen = useMediaQuery("(max-width: 768px)")

  // Determine if we should use 3D effects based on device and preferences
  const shouldUse3D = !isSmallScreen && !prefersReducedMotion

  // Start animation when card comes into view
  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  // Card variants for entry animation
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: prefersReducedMotion ? 0 : index * 0.1, // Stagger effect
        ease: [0.25, 0.1, 0.25, 1], // Custom easing
      },
    },
  }

  // 3D tilt effect values
  const maxTiltX = 5 // Max tilt in degrees
  const maxTiltY = 5
  const [tiltValues, setTiltValues] = useState({ tiltX: 0, tiltY: 0 })

  // Handle mouse move for 3D effect
  const handleMouseMove = (e) => {
    if (!shouldUse3D || !isHovered) return

    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Calculate tilt based on mouse position
    const tiltX = ((y / rect.height) * 2 - 1) * -maxTiltX
    const tiltY = ((x / rect.width) * 2 - 1) * maxTiltY

    setTiltValues({ tiltX, tiltY })
  }

  // Reset tilt when mouse leaves
  const handleMouseLeave = () => {
    setIsHovered(false)
    setTiltValues({ tiltX: 0, tiltY: 0 })
  }

  // Image hover variants
  const imageVariants = {
    rest: { scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
    hover: { scale: 1.1, transition: { duration: 0.5, ease: "easeOut" } },
  }

  // Badge animation variants
  const badgeVariants = {
    rest: { scale: 1 },
    hover: {
      scale: [1, 1.1, 1],
      transition: { repeat: Number.POSITIVE_INFINITY, repeatType: "loop", duration: 2 },
    },
  }

  // Button animation variants
  const buttonVariants = {
    rest: { y: 0, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" },
    hover: {
      y: -3,
      boxShadow: "0 6px 10px rgba(0,0,0,0.15)",
      transition: { duration: 0.3, ease: "easeOut" },
    },
    tap: {
      y: 0,
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      transition: { duration: 0.1, ease: "easeIn" },
    },
  }

  // Arrow animation variants
  const arrowVariants = {
    rest: { x: 0 },
    hover: {
      x: 5,
      transition: { repeat: Number.POSITIVE_INFINITY, repeatType: "mirror", duration: 0.8 },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={prefersReducedMotion ? {} : cardVariants}
      className={cn("h-full", className)}
      style={{
        perspective: shouldUse3D ? "1000px" : "none",
      }}
    >
      <motion.div
        className={cn(
          "h-full overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm recipe-card group/card",
          className,
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: tiltValues.tiltX,
          rotateY: tiltValues.tiltY,
          transition: { duration: 0.2 },
        }}
        style={{
          transformStyle: shouldUse3D ? "preserve-3d" : "flat",
        }}
        whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
      >
        <div className="aspect-video relative overflow-hidden recipe-image">
          <motion.div
            variants={prefersReducedMotion ? {} : imageVariants}
            initial="rest"
            animate={isHovered ? "hover" : "rest"}
            className="h-full w-full"
          >
            <Image
              src={recipe.image || "/placeholder.svg?height=400&width=600"}
              alt={recipe.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>

          {recipe.featured && (
            <motion.div
              variants={prefersReducedMotion ? {} : badgeVariants}
              initial="rest"
              animate={isHovered ? "hover" : "rest"}
              className="absolute top-2 right-2 z-10"
            >
              <Badge variant="primary">Popular</Badge>
            </motion.div>
          )}

          {variant === "featured" && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
              <div className="text-white">
                <motion.h3
                  className="text-xl font-bold mb-1"
                  animate={
                    isHovered && !prefersReducedMotion ? { scale: 1.05, transition: { duration: 0.3 } } : { scale: 1 }
                  }
                >
                  {recipe.title}
                </motion.h3>
                <p className="text-sm text-white/80 line-clamp-2">{recipe.description}</p>
              </div>
            </div>
          )}

          {/* Overlay gradient that intensifies on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 0.6 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="recipe-content flex flex-col flex-grow">
          {variant !== "featured" && (
            <CardHeader className="p-4 pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="line-clamp-1 text-xl">{recipe.title}</CardTitle>
                <FavoriteButton recipe={recipe} />
              </div>
              {recipe.rating !== undefined && (
                <div className="flex items-center gap-2 mt-1">
                  <RecipeRating recipeId={recipe.id} initialRating={recipe.rating || 0} readOnly size="sm" />
                  <span className="text-xs text-muted-foreground">({recipe.reviews || 0})</span>
                </div>
              )}
            </CardHeader>
          )}

          <CardContent className={cn("p-4", variant === "featured" ? "pt-4" : "pt-0")}>
            {variant !== "featured" && (
              <p className="text-sm text-muted-foreground recipe-description">{recipe.description}</p>
            )}

            <div className="flex flex-wrap gap-2 mt-3">
              {recipe.tags &&
                recipe.tags.slice(0, variant === "compact" ? 1 : 3).map((tag, i) => (
                  <motion.div
                    key={tag}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: prefersReducedMotion ? 0 : 0.1 + i * 0.1 }}
                  >
                    <Badge variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-3 gap-2 mt-4">
              {recipe.time && (
                <motion.div
                  className="flex items-center gap-1 text-xs text-muted-foreground"
                  whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                >
                  <Clock className="h-3 w-3 text-primary" />
                  <span>{recipe.time}</span>
                </motion.div>
              )}
              {recipe.difficulty && (
                <motion.div
                  className="flex items-center gap-1 text-xs text-muted-foreground"
                  whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                >
                  <ChefHat className="h-3 w-3 text-primary" />
                  <span>{recipe.difficulty}</span>
                </motion.div>
              )}
              {recipe.servings && (
                <motion.div
                  className="flex items-center gap-1 text-xs text-muted-foreground"
                  whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                >
                  <Users className="h-3 w-3 text-primary" />
                  <span>{recipe.servings}</span>
                </motion.div>
              )}
            </div>
          </CardContent>

          <CardFooter className="p-4 pt-0 mt-auto">
            <motion.div
              className="w-full"
              variants={prefersReducedMotion ? {} : buttonVariants}
              initial="rest"
              animate={isHovered ? "hover" : "rest"}
              whileTap="tap"
            >
              <Button asChild className="w-full">
                <Link href={`/receita/${recipe.id}`} className="flex items-center justify-center gap-2">
                  <span>Ver Receita</span>
                  <motion.div
                    variants={prefersReducedMotion ? {} : arrowVariants}
                    initial="rest"
                    animate={isHovered ? "hover" : "rest"}
                  >
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </motion.div>
                  <span className="sr-only">: {recipe.title}</span>
                </Link>
              </Button>
            </motion.div>
          </CardFooter>
        </div>
      </motion.div>
    </motion.div>
  )
}
