"use client"

import { useState } from "react"
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
import { Pencil, Save, User, Settings, Heart, Clock, Star, BookOpen } from "lucide-react"

// Tipo para o perfil do usuário
type UserProfile = {
  name: string
  bio: string
  email: string
  avatar: string
  preferences: {
    cuisines: string[]
    diets: string[]
    notifications: boolean
  }
}

// Perfil padrão
const defaultProfile: UserProfile = {
  name: "Usuário da Receita",
  bio: "Amante da culinária e entusiasta de novas receitas.",
  email: "usuario@exemplo.com",
  avatar: "/usuario.png?height=200&width=200&text=Usuário",
  preferences: {
    cuisines: ["Italiana", "Brasileira"],
    diets: ["Vegetariana"],
    notifications: true,
  },
}

export default function ProfilePage() {
  // Carregar perfil do localStorage ou usar o padrão
  const [profile, setProfile] = useLocalStorage<UserProfile>("recipe-hub-profile", defaultProfile)

  // Estados para edição
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile)

  // Favoritos do usuário
  const { favorites } = useFavorites()

  // Toast para notificações
  const { toast } = useToast()

  // Histórico de visualização (simulado)
  const [viewHistory] = useLocalStorage<Array<{ id: string; title: string; date: string }>>("recipe-hub-view-history", [
    { id: "pizza-margherita", title: "Pizza Margherita", date: new Date().toISOString() },
    { id: "bolo-chocolate", title: "Bolo de Chocolate", date: new Date(Date.now() - 86400000).toISOString() },
  ])

  // Função para salvar alterações no perfil
  const saveProfile = () => {
    setProfile(editedProfile)
    setIsEditing(false)
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram salvas com sucesso.",
    })
  }

  // Função para cancelar edição
  const cancelEdit = () => {
    setEditedProfile(profile)
    setIsEditing(false)
  }

  // Função para atualizar preferências
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

  // Função para alternar notificações
  const toggleNotifications = () => {
    setEditedProfile((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        notifications: !prev.preferences.notifications,
      },
    }))
  }

  return (
    <>
      <SkipToContent />
      <SiteHeader />
      <main id="main-content" className="container py-6 md:py-10">
        <div className="grid gap-6 md:grid-cols-[300px_1fr]">
          {/* Sidebar com informações do perfil */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <div className="h-32 w-32 overflow-hidden rounded-full">
                      <Image
                        src={profile.avatar || "/placeholder.svg"}
                        alt={profile.name}
                        width={128}
                        height={128}
                        className="object-cover"
                      />
                    </div>
                    {isEditing && (
                      <Button
                        size="sm"
                        variant="secondary"
                        className="absolute bottom-0 right-0 rounded-full"
                        aria-label="Alterar foto de perfil"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  {isEditing ? (
                    <div className="space-y-4 w-full">
                      <div>
                        <Input
                          value={editedProfile.name}
                          onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                          className="text-center"
                          aria-label="Nome"
                        />
                      </div>
                      <div>
                        <Textarea
                          value={editedProfile.bio}
                          onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                          className="text-center resize-none"
                          rows={3}
                          aria-label="Biografia"
                        />
                      </div>
                      <div>
                        <Input
                          type="email"
                          value={editedProfile.email}
                          onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                          className="text-center"
                          aria-label="Email"
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
                          Salvar
                        </Button>
                        <Button variant="outline" onClick={cancelEdit} className="flex-1">
                          Cancelar
                        </Button>
                      </div>
                    ) : (
                      <Button onClick={() => setIsEditing(true)} variant="outline" className="w-full">
                        <Pencil className="mr-2 h-4 w-4" />
                        Editar Perfil
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
                  <h3 className="font-medium">Estatísticas</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Receitas favoritas</span>
                    <span className="font-medium">{favorites.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Receitas visualizadas</span>
                    <span className="font-medium">{viewHistory.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Avaliações</span>
                    <span className="font-medium">5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Comentários</span>
                    <span className="font-medium">3</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Conteúdo principal */}
          <div>
            <Tabs defaultValue="favoritos">
              <TabsList className="mb-6">
                <TabsTrigger value="favoritos" className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  Favoritos
                </TabsTrigger>
                <TabsTrigger value="historico" className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  Histórico
                </TabsTrigger>
                <TabsTrigger value="avaliacoes" className="flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  Avaliações
                </TabsTrigger>
                <TabsTrigger value="preferencias" className="flex items-center gap-1">
                  <Settings className="h-4 w-4" />
                  Preferências
                </TabsTrigger>
              </TabsList>

              {/* Aba de Favoritos */}
              <TabsContent value="favoritos">
                <h2 className="text-2xl font-bold mb-4">Receitas Favoritas</h2>
                {favorites.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {favorites.map((recipe) => (
                      <Card key={recipe.id} className="overflow-hidden">
                        <div className="aspect-video relative">
                          <Image
                            src={recipe.image || "/placeholder.svg"}
                            alt={recipe.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-medium line-clamp-1">{recipe.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{recipe.description}</p>
                          <div className="mt-4 flex justify-end">
                            <Button asChild size="sm">
                              <Link href={`/receita/${recipe.id}`}>Ver Receita</Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium">Nenhuma receita favorita</h3>
                    <p className="text-muted-foreground mt-2">
                      Você ainda não adicionou nenhuma receita aos favoritos.
                    </p>
                    <Button asChild className="mt-4">
                      <Link href="/receitas">Explorar Receitas</Link>
                    </Button>
                  </div>
                )}
              </TabsContent>

              {/* Aba de Histórico */}
              <TabsContent value="historico">
                <h2 className="text-2xl font-bold mb-4">Histórico de Visualização</h2>
                {viewHistory.length > 0 ? (
                  <div className="space-y-4">
                    {viewHistory.map((item) => (
                      <Card key={item.id} className="overflow-hidden">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <BookOpen className="h-5 w-5 text-muted-foreground" />
                              <Link href={`/receita/${item.id}`} className="font-medium hover:text-primary">
                                {item.title}
                              </Link>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {new Date(item.date).toLocaleDateString()}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium">Nenhum histórico</h3>
                    <p className="text-muted-foreground mt-2">Você ainda não visualizou nenhuma receita.</p>
                    <Button asChild className="mt-4">
                      <Link href="/receitas">Explorar Receitas</Link>
                    </Button>
                  </div>
                )}
              </TabsContent>

              {/* Aba de Avaliações */}
              <TabsContent value="avaliacoes">
                <h2 className="text-2xl font-bold mb-4">Minhas Avaliações</h2>
                <div className="space-y-4">
                  {/* Avaliações simuladas */}
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Link href="/receita/pizza-margherita" className="font-medium hover:text-primary">
                          Pizza Margherita
                        </Link>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${star <= 5 ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Receita excelente! Fácil de fazer e muito saborosa.
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-muted-foreground">19/05/2025</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Link href="/receita/bolo-chocolate" className="font-medium hover:text-primary">
                          Bolo de Chocolate
                        </Link>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${star <= 4 ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Bolo muito bom, mas achei que poderia ser um pouco mais úmido.
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-muted-foreground">18/05/2025</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Aba de Preferências */}
              <TabsContent value="preferencias">
                <h2 className="text-2xl font-bold mb-4">Minhas Preferências</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Cozinhas Favoritas</h3>
                    <div className="flex flex-wrap gap-2">
                      {["Italiana", "Brasileira", "Mexicana", "Japonesa", "Indiana", "Francesa"].map((cuisine) => (
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
                      ))}
                    </div>
                    {isEditing && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Clique nas cozinhas para selecionar ou desselecionar
                      </p>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3">Preferências Alimentares</h3>
                    <div className="flex flex-wrap gap-2">
                      {["Vegetariana", "Vegana", "Sem Glúten", "Sem Lactose", "Low Carb", "Sem Açúcar"].map((diet) => (
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
                        Clique nas preferências para selecionar ou desselecionar
                      </p>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3">Notificações</h3>
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
                        Receber notificações sobre novas receitas
                      </label>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="pt-4">
                      <Button onClick={saveProfile}>
                        <Save className="mr-2 h-4 w-4" />
                        Salvar Preferências
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
