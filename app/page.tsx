import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Utensils, Clock, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SkipToContent } from "@/components/skip-to-content"
import { ScrollToBottom } from "@/components/scroll-to-bottom"
import { RecipeHubLogo } from "@/components/recipe-hub-logo"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { AnimatedRecipeCard } from "@/components/animated-recipe-card"
import { AnimatedRecipeGrid } from "@/components/animated-recipe-grid"
import { allRecipes } from "@/data/recipes"

export default function Home() {
  // Pegar apenas os primeiros 6 recipes para a página inicial
  const recipes = allRecipes.slice(0, 6)
  const featuredRecipes = allRecipes.filter((recipe) => recipe.featured).slice(0, 3)

  return (
    <>
      <SkipToContent />
      <SiteHeader />
      <main id="main-content" className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-accent/20 to-background py-16 md:py-24">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <div className="mb-6">
                <RecipeHubLogo size="lg" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Descubra o prazer de <span className="text-primary">cozinhar</span> com receitas deliciosas
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Explore nossa coleção de receitas saborosas e fáceis de preparar para todos os gostos e ocasiões
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="btn-primary">
                  <Link href="/receitas">Explorar Receitas</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/sobre">Sobre Nós</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-lg overflow-hidden shadow-lg transform translate-y-8">
                    <Image
                      src="/salad.jpg?height=400&width=300&text=Receita+1"
                      alt="Receita destaque"
                      width={300}
                      height={400}
                      className="object-cover"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src="/refogado.jpg?height=300&width=300&text=Receita+2"
                      alt="Receita destaque"
                      width={300}
                      height={300}
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src="/cake.jpg?height=300&width=300&text=Receita+3"
                      alt="Receita destaque"
                      width={300}
                      height={300}
                      className="object-cover"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-lg transform translate-y-8">
                    <Image
                      src="/strawberry.jpg?height=400&width=300&text=Receita+4"
                      alt="Receita destaque"
                      width={300}
                      height={400}
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-4 rounded-lg shadow-lg">
                <p className="text-lg font-bold">+100 Receitas</p>
                <p className="text-sm">Para você experimentar</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Por que escolher o RecipeHub?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-background rounded-lg p-6 shadow-md flex flex-col items-center text-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <Utensils className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Receitas Testadas</h3>
                <p className="text-muted-foreground">
                  Todas as nossas receitas são testadas e aprovadas por chefs profissionais para garantir resultados
                  perfeitos.
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 shadow-md flex flex-col items-center text-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Rápido e Fácil</h3>
                <p className="text-muted-foreground">
                  Receitas com instruções claras e tempos de preparo realistas para se adequar à sua rotina.
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 shadow-md flex flex-col items-center text-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Comunidade Ativa</h3>
                <p className="text-muted-foreground">
                  Compartilhe suas experiências, avalie receitas e conecte-se com outros amantes da culinária.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Recipes */}
        <section className="container py-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">Receitas em Destaque</h2>
              <p className="text-muted-foreground mt-2">As receitas mais populares da nossa comunidade</p>
            </div>
            <Button asChild variant="outline" className="mt-4 md:mt-0">
              <Link href="/receitas">
                Ver Todas
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {featuredRecipes.map((recipe, index) => (
              <AnimatedRecipeCard key={recipe.id} recipe={recipe} variant="featured" index={index} />
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-8">Explore por Categoria</h2>

            <Tabs defaultValue="todas" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList aria-label="Filtrar receitas por categoria">
                  <TabsTrigger value="todas">Todas</TabsTrigger>
                  <TabsTrigger value="pizzas">Pizzas</TabsTrigger>
                  <TabsTrigger value="sopas">Sopas</TabsTrigger>
                  <TabsTrigger value="sobremesas">Sobremesas</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="todas" className="mt-6">
                <AnimatedRecipeGrid recipes={recipes} />
              </TabsContent>

              <TabsContent value="pizzas" className="mt-6">
                <AnimatedRecipeGrid recipes={recipes.filter((recipe) => recipe.category === "pizza")} />
              </TabsContent>

              <TabsContent value="sopas" className="mt-6">
                <AnimatedRecipeGrid recipes={recipes.filter((recipe) => recipe.category === "sopa")} />
              </TabsContent>

              <TabsContent value="sobremesas" className="mt-6">
                <AnimatedRecipeGrid recipes={recipes.filter((recipe) => recipe.category === "sobremesa")} />
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Pronto para começar a cozinhar?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Junte-se à nossa comunidade de amantes da culinária e descubra novas receitas deliciosas todos os dias.
            </p>
            <Button asChild size="lg" className="btn-primary">
              <Link href="/receitas">Explorar Todas as Receitas</Link>
            </Button>
          </div>
        </section>
      </main>

      <SiteFooter />
      <ScrollToBottom />
    </>
  )
}
