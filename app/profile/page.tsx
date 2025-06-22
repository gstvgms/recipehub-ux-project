"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { SkipToContent } from "@/components/skip-to-content"
import { ScrollToBottom } from "@/components/scroll-to-bottom"
import { useFavorites } from "@/contexts/favorites-context"
import { useToast } from "@/hooks/use-toast"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { Pencil, Save, User, Settings, Heart, Clock, Star, Trash2, Camera } from "lucide-react"

// Type for user reviews
type UserReview = {
  recipeId: string
  recipeTitle: string
  rating: number
  comment: string
  date: string
}

// Type for viewing history
type ViewHistoryItem = {
  id: string
  title: string
  image: string
  date: string
}

// Type for the user profile
type UserProfile = {
  name: string
  bio: string
  email: string
  avatar: string | null
  preferences: {
    cuisines: string[]
    diets: string[]
    notifications: boolean
  }
}

// Default profile data
const defaultProfile: UserProfile = {
  name: "Recipe Enthusiast",
  bio: "I love trying new recipes and sharing my culinary adventures!",
  email: "user@example.com",
  avatar: null,
  preferences: {
    cuisines: ["Italian", "Mexican"],
    diets: ["Vegetarian"],
    notifications: true,
  },
}

export default function ProfilePage() {
  // Load profile from localStorage or use default
  const [profile, setProfile] = useLocalStorage<UserProfile>("recipe-hub-profile", defaultProfile)

  // States for editing
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile)

  // State for image upload
  const [imagePreview, setImagePreview] = useState<string | null>(profile.avatar)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // User reviews from localStorage
  const [userReviews, setUserReviews] = useLocalStorage<UserReview[]>("recipe-hub-user-reviews", [
    {
      recipeId: "pizza-margherita",
      recipeTitle: "Pizza Margherita",
      rating: 5,
      comment: "Perfect recipe! The crust was crispy and the flavors were authentic.",
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    },
    {
      recipeId: "bolo-chocolate",
      recipeTitle: "Bolo de Chocolate",
      rating: 4,
      comment: "Delicious cake, but I found it a bit too sweet for my taste.",
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    },
  ])

  // Viewing history from localStorage
  const [viewHistory, setViewHistory] = useLocalStorage<ViewHistoryItem[]>("recipe-hub-view-history", [
    {
      id: "pizza-margherita",
      title: "Pizza Margherita",
      image: "/placeholder.svg?height=400&width=600&text=Pizza+Margherita",
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    },
    {
      id: "bolo-chocolate",
      title: "Bolo de Chocolate",
      image: "/placeholder.svg?height=400&width=600&text=Bolo+de+Chocolate",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    },
    {
      id: "carbonara",
      title: "Carbonara",
      image: "/placeholder.svg?height=400&width=600&text=Carbonara",
      date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
    },
  ])

  // Favorites from context
  const { favorites } = useFavorites()

  // Toast for notifications
  const { toast } = useToast()

  // Update edited profile when profile changes
  useEffect(() => {
    setEditedProfile(profile)
    setImagePreview(profile.avatar)
  }, [profile])

  // Handle profile picture upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 5MB",
        variant: "destructive",
      })
      return
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file",
        variant: "destructive",
      })
      return
    }

    // Create a preview
    const reader = new FileReader()
    reader.onload = (event) => {
      if (event.target?.result) {
        setImagePreview(event.target.result as string)
        setEditedProfile((prev) => ({
          ...prev,
          avatar: event.target?.result as string,
        }))
      }
    }
    reader.readAsDataURL(file)
  }

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  // Remove profile picture
  const removeProfilePicture = () => {
    setImagePreview(null)
    setEditedProfile((prev) => ({
      ...prev,
      avatar: null,
    }))
  }

  // Save profile changes
  const saveProfile = () => {
    setProfile(editedProfile)
    setIsEditing(false)
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    })
  }

  // Cancel editing
  const cancelEdit = () => {
    setEditedProfile(profile)
    setImagePreview(profile.avatar)
    setIsEditing(false)
  }

  // Toggle preference selection
  const togglePreference = (type: "cuisines" | "diets", value: string) => {
    setEditedProfile((prev) => {
      const current = prev.preferences[type]
      const updated = current.includes(value) ? current.filter((item) => item !== value) : [...current, value]

      return {
        ...prev,
        preferences: {
          ...prev.preferences,
          [type]: updated,
        },
      }
    })
  }

  // Toggle notifications
  const toggleNotifications = () => {
    setEditedProfile((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        notifications: !prev.preferences.notifications,
      },
    }))
  }

  // Delete a review
  const deleteReview = (index: number) => {
    const updatedReviews = [...userReviews]
    updatedReviews.splice(index, 1)
    setUserReviews(updatedReviews)
    toast({
      title: "Review deleted",
      description: "Your review has been removed.",
    })
  }

  // Clear viewing history
  const clearViewHistory = () => {
    setViewHistory([])
    toast({
      title: "History cleared",
      description: "Your viewing history has been cleared.",
    })
  }

  // Remove item from viewing history
  const removeFromHistory = (id: string) => {
    setViewHistory((prev) => prev.filter((item) => item.id !== id))
    toast({
      title: "Item removed",
      description: "The item has been removed from your history.",
    })
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  // Add a recipe to viewing history (simulated function)
  const addToViewHistory = (recipe: any) => {
    // Check if recipe already exists in history
    const existingIndex = viewHistory.findIndex((item) => item.id === recipe.id)

    // Create new history item
    const newItem: ViewHistoryItem = {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      date: new Date().toISOString(),
    }

    // Update history
    if (existingIndex !== -1) {
      // Move to top and update date
      const updatedHistory = [newItem, ...viewHistory.filter((item) => item.id !== recipe.id)]
      setViewHistory(updatedHistory)
    } else {
      // Add new item to top
      setViewHistory([newItem, ...viewHistory])
    }
  }

  // Simulate adding a recipe to history when clicking "View Recipe"
  const handleViewRecipe = (recipe: any) => {
    addToViewHistory(recipe)
  }

  return (
    <>
      <SkipToContent />
      <SiteHeader />
      <main id="main-content" className="container py-6 md:py-10">
        <h1 className="text-3xl font-bold tracking-tight mb-6">My Profile</h1>

        <div className="grid gap-6 md:grid-cols-[300px_1fr]">
          {/* Sidebar with profile information */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <div className="h-32 w-32 overflow-hidden rounded-full bg-muted flex items-center justify-center border">
                      {imagePreview ? (
                        <Image
                          src={imagePreview || "/placeholder.svg"}
                          alt={profile.name}
                          width={128}
                          height={128}
                          className="object-cover h-full w-full"
                        />
                      ) : (
                        <User className="h-16 w-16 text-muted-foreground" />
                      )}
                    </div>

                    {isEditing && (
                      <div className="absolute bottom-0 right-0 flex gap-1">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="rounded-full h-8 w-8 p-0"
                          onClick={triggerFileInput}
                          aria-label="Upload profile picture"
                        >
                          <Camera className="h-4 w-4" />
                        </Button>

                        {imagePreview && (
                          <Button
                            size="sm"
                            variant="destructive"
                            className="rounded-full h-8 w-8 p-0"
                            onClick={removeProfilePicture}
                            aria-label="Remove profile picture"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}

                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                          aria-label="Upload profile picture"
                        />
                      </div>
                    )}
                  </div>

                  {isEditing ? (
                    <div className="space-y-4 w-full">
                      <div>
                        <Input
                          value={editedProfile.name}
                          onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                          className="text-center"
                          aria-label="Name"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <Textarea
                          value={editedProfile.bio}
                          onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                          className="text-center resize-none"
                          rows={3}
                          aria-label="Bio"
                          placeholder="Tell us about yourself"
                        />
                      </div>
                      <div>
                        <Input
                          type="email"
                          value={editedProfile.email}
                          onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                          className="text-center"
                          aria-label="Email"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-xl font-bold">{profile.name}</h2>
                      <p className="mt-2 text-sm text-muted-foreground">{profile.bio}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{profile.email}</p>
                    </>
                  )}

                  <div className="mt-6 w-full">
                    {isEditing ? (
                      <div className="flex gap-2">
                        <Button onClick={saveProfile} className="flex-1">
                          <Save className="mr-2 h-4 w-4" />
                          Save
                        </Button>
                        <Button variant="outline" onClick={cancelEdit} className="flex-1">
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <Button onClick={() => setIsEditing(true)} variant="outline" className="w-full">
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit Profile
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <User className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Statistics</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Favorite recipes</span>
                    <span className="font-medium">{favorites.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Viewed recipes</span>
                    <span className="font-medium">{viewHistory.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Reviews</span>
                    <span className="font-medium">{userReviews.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main content area */}
          <div>
            <Tabs defaultValue="reviews">
              <TabsList className="mb-6">
                <TabsTrigger value="reviews" className="flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  Reviews
                </TabsTrigger>
                <TabsTrigger value="history" className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  Viewing History
                </TabsTrigger>
                <TabsTrigger value="favorites" className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  Favorites
                </TabsTrigger>
                <TabsTrigger value="preferences" className="flex items-center gap-1">
                  <Settings className="h-4 w-4" />
                  Preferences
                </TabsTrigger>
              </TabsList>

              {/* Reviews Tab */}
              <TabsContent value="reviews">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">My Reviews</h2>
                  {userReviews.length > 0 && (
                    <Button variant="outline" size="sm" onClick={() => setUserReviews([])}>
                      Clear All Reviews
                    </Button>
                  )}
                </div>

                {userReviews.length > 0 ? (
                  <div className="space-y-4">
                    {userReviews.map((review, index) => (
                      <Card key={`${review.recipeId}-${index}`}>
                        <CardContent className="p-4">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                            <Link href={`/receita/${review.recipeId}`} className="font-medium hover:text-primary">
                              {review.recipeTitle}
                            </Link>
                            <div className="flex items-center gap-2">
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`h-4 w-4 ${
                                      star <= review.rating
                                        ? "text-yellow-400 fill-yellow-400"
                                        : "text-muted-foreground"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-muted-foreground">{formatDate(review.date)}</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{review.comment}</p>
                          <div className="flex justify-end mt-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteReview(index)}
                              className="text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 border rounded-lg bg-muted/10">
                    <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium">No reviews yet</h3>
                    <p className="text-muted-foreground mt-2">You haven't reviewed any recipes yet.</p>
                    <Button asChild className="mt-4">
                      <Link href="/receitas">Explore Recipes</Link>
                    </Button>
                  </div>
                )}
              </TabsContent>

              {/* Viewing History Tab */}
              <TabsContent value="history">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">Viewing History</h2>
                  {viewHistory.length > 0 && (
                    <Button variant="outline" size="sm" onClick={clearViewHistory}>
                      Clear History
                    </Button>
                  )}
                </div>

                {viewHistory.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {viewHistory.map((item) => (
                      <Card key={`${item.id}-${item.date}`} className="overflow-hidden">
                        <div className="aspect-video relative">
                          <Image
                            src={item.image || "/placeholder.svg?height=200&width=300"}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-2 right-2">
                            <Button
                              variant="destructive"
                              size="icon"
                              className="h-7 w-7 rounded-full opacity-80 hover:opacity-100"
                              onClick={() => removeFromHistory(item.id)}
                              aria-label={`Remove ${item.title} from history`}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                            <p className="text-xs text-white/80">Viewed on {formatDate(item.date)}</p>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-medium line-clamp-1">{item.title}</h3>
                          <div className="mt-2 flex justify-end">
                            <Button asChild size="sm" onClick={() => handleViewRecipe(item)}>
                              <Link href={`/receita/${item.id}`}>View Recipe</Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 border rounded-lg bg-muted/10">
                    <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium">No viewing history</h3>
                    <p className="text-muted-foreground mt-2">You haven't viewed any recipes yet.</p>
                    <Button asChild className="mt-4">
                      <Link href="/receitas">Explore Recipes</Link>
                    </Button>
                  </div>
                )}
              </TabsContent>

              {/* Favorites Tab */}
              <TabsContent value="favorites">
                <h2 className="text-2xl font-bold mb-4">Favorite Recipes</h2>
                {favorites.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {favorites.map((recipe) => (
                      <Card key={recipe.id} className="overflow-hidden">
                        <div className="aspect-video relative">
                          <Image
                            src={recipe.image || "/placeholder.svg?height=200&width=300"}
                            alt={recipe.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-medium line-clamp-1">{recipe.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{recipe.description}</p>
                          <div className="mt-4 flex justify-end">
                            <Button asChild size="sm" onClick={() => handleViewRecipe(recipe)}>
                              <Link href={`/receita/${recipe.id}`}>View Recipe</Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 border rounded-lg bg-muted/10">
                    <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium">No favorite recipes</h3>
                    <p className="text-muted-foreground mt-2">You haven't added any recipes to your favorites yet.</p>
                    <Button asChild className="mt-4">
                      <Link href="/receitas">Explore Recipes</Link>
                    </Button>
                  </div>
                )}
              </TabsContent>

              {/* Preferences Tab */}
              <TabsContent value="preferences">
                <h2 className="text-2xl font-bold mb-4">My Preferences</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Favorite Cuisines</h3>
                    <div className="flex flex-wrap gap-2">
                      {["Italian", "Mexican", "Japanese", "Indian", "French", "Thai", "American", "Mediterranean"].map(
                        (cuisine) => (
                          <Badge
                            key={cuisine}
                            variant={
                              isEditing
                                ? editedProfile.preferences.cuisines.includes(cuisine)
                                  ? "default"
                                  : "outline"
                                : profile.preferences.cuisines.includes(cuisine)
                                  ? "default"
                                  : "outline"
                            }
                            className={isEditing ? "cursor-pointer" : ""}
                            onClick={() => isEditing && togglePreference("cuisines", cuisine)}
                          >
                            {cuisine}
                          </Badge>
                        ),
                      )}
                    </div>
                    {isEditing && (
                      <p className="text-xs text-muted-foreground mt-2">Click on cuisines to select or deselect them</p>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3">Dietary Preferences</h3>
                    <div className="flex flex-wrap gap-2">
                      {["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Low-Carb", "Keto", "Paleo"].map((diet) => (
                        <Badge
                          key={diet}
                          variant={
                            isEditing
                              ? editedProfile.preferences.diets.includes(diet)
                                ? "default"
                                : "outline"
                              : profile.preferences.diets.includes(diet)
                                ? "default"
                                : "outline"
                          }
                          className={isEditing ? "cursor-pointer" : ""}
                          onClick={() => isEditing && togglePreference("diets", diet)}
                        >
                          {diet}
                        </Badge>
                      ))}
                    </div>
                    {isEditing && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Click on dietary preferences to select or deselect them
                      </p>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3">Notifications</h3>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="notifications"
                        checked={
                          isEditing ? editedProfile.preferences.notifications : profile.preferences.notifications
                        }
                        onChange={() => isEditing && toggleNotifications()}
                        disabled={!isEditing}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label
                        htmlFor="notifications"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Receive notifications about new recipes
                      </label>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="pt-4">
                      <Button onClick={saveProfile}>
                        <Save className="mr-2 h-4 w-4" />
                        Save Preferences
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <SiteFooter />
      <ScrollToBottom />
    </>
  )
}
