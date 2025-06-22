import { cn } from "@/lib/utils"

interface RecipeHubLogoProps {
  className?: string
  textClassName?: string
  size?: "sm" | "md" | "lg"
}

export function RecipeHubLogo({ className, textClassName, size = "md" }: RecipeHubLogoProps) {
  // Size classes for the logo container
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  }

  // Size classes for the text
  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  }

  return (
    <div className="flex items-center gap-2">
      <div className={cn("relative", sizeClasses[size], className)}>
        {/* Burger icon */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
          aria-hidden="true"
        >
          {/* Burger top bun */}
          <path
            d="M2 7C2 6.44772 2.44772 6 3 6H21C21.5523 6 22 6.44772 22 7V9C22 9.55228 21.5523 10 21 10H3C2.44772 10 2 9.55228 2 9V7Z"
            className="fill-primary"
          />
          {/* Burger middle (lettuce) */}
          <path
            d="M3 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H3C2.44772 13 2 12.5523 2 12C2 11.4477 2.44772 11 3 11Z"
            className="fill-secondary"
          />
          {/* Burger patty */}
          <path
            d="M2 15C2 14.4477 2.44772 14 3 14H21C21.5523 14 22 14.4477 22 15V15.5C22 16.0523 21.5523 16.5 21 16.5H3C2.44772 16.5 2 16.0523 2 15.5V15Z"
            className="fill-accent"
          />
          {/* Burger bottom bun */}
          <path
            d="M2 17.5C2 16.9477 2.44772 16.5 3 16.5H21C21.5523 16.5 22 16.9477 22 17.5V18C22 18.5523 21.5523 19 21 19H3C2.44772 19 2 18.5523 2 18V17.5Z"
            className="fill-primary"
          />
        </svg>
      </div>
      <span className={cn("font-bold text-primary", textSizeClasses[size], textClassName)}>RecipeHub</span>
    </div>
  )
}
