import { SiteHeader } from "@/components/site-header"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SkipToContent } from "@/components/skip-to-content"

export default function Sobre() {
  return (
    <>
      <SkipToContent />
      <SiteHeader />
      <main id="main-content" className="container py-6 md:py-10">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Sobre o RecipeHub</h1>
          <p className="mt-4 text-lg text-muted-foreground">Conheça nossa história, equipe e valores que nos guiam</p>
        </div>

        <section aria-labelledby="nossa-missao" className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle id="nossa-missao" className="text-2xl text-primary">
                Nossa Missão
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                O RecipeHub nasceu da paixão pela culinária e do desejo de compartilhar receitas deliciosas com o mundo.
                Nossa missão é inspirar pessoas a cozinharem em casa, explorarem novos sabores e criarem memórias ao
                redor da mesa.
              </p>
              <p>
                Acreditamos que a comida tem o poder de unir pessoas e culturas. Por isso, trabalhamos para oferecer
                receitas autênticas, fáceis de seguir e com ingredientes acessíveis para todos.
              </p>
              <p>
                Fundado em 2025, o RecipeHub tem como objetivo ser o seu guia na cozinha, seja você um cozinheiro
                iniciante ou um chef experiente.
              </p>
            </CardContent>
          </Card>
        </section>

        <section aria-labelledby="nossa-equipe" className="mb-12">
          <h2 id="nossa-equipe" className="text-3xl font-bold tracking-tight mb-6">
            Nossa Equipe
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <Card key={member.id} className="overflow-hidden transition-all hover:shadow-md">
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={member.photo || "/placeholder.svg?height=400&width=400"}
                    alt={`Foto de ${member.name}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
                <CardHeader className="p-4">
                  <CardTitle className="text-xl text-primary">{member.name}</CardTitle>
                  <p className="text-sm text-muted-foreground font-medium">{member.role}</p>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section aria-labelledby="nossos-valores">
          <Card>
            <CardHeader>
              <CardTitle id="nossos-valores" className="text-2xl text-primary">
                Nossos Valores
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-4 sm:grid-cols-2">
                {values.map((value, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <span className="text-sm font-medium">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-medium">{value.title}</h3>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>
      </main>
    </>
  )
}

const team = [
  {
    id: 1,
    name: "Gustavo Gomes",
    role: "Desenvolvedor",
    bio: "Gustavo é um dos criadores do RecipeHub e adora experimentar novas receitas. Ele é responsável pela parte técnica do site.",
    photo: "/gustavo.jpeg?height=400&width=400&text=Gustavo",
  },
  {
    id: 2,
    name: "Luigi Pontes",
    role: "Gerente de Infraestrutura",
    bio: "Apaixonado por tecnologia e comida, Luigi é responsável por toda a infraestrutura do site.",
    photo: "/luigi.jpg?height=400&width=400&text=Luigi",
  },
  {
    id: 3,
    name: "Álvaro Peringer",
    role: "Analista de Dados",
    bio: "Álvaro é o responsável por analisar as receitas e tendências do site, garantindo que os usuários tenham acesso ao melhor conteúdo.",
    photo: "/alvaro.png?height=400&width=400&text=Álvaro",
  },
  {
    id: 4,
    name: "Gabriel Bittencourt",
    role: "Segurança da Informação",
    bio: "Gabriel é o responsável por garantir a segurança dos dados dos usuários e do site.",
    photo: "/gabriel.png?height=400&width=400&text=Gabriel",
  },
]

const values = [
  {
    title: "Qualidade",
    description: "Testamos todas as receitas antes de publicá-las para garantir resultados consistentes.",
  },
  {
    title: "Acessibilidade",
    description: "Criamos receitas com ingredientes fáceis de encontrar em qualquer região.",
  },
  {
    title: "Diversidade",
    description: "Celebramos culinárias de todo o mundo, respeitando tradições e inovações.",
  },
  {
    title: "Comunidade",
    description: "Valorizamos o feedback e as contribuições dos usuários para melhorar constantemente.",
  },
  {
    title: "Sustentabilidade",
    description: "Promovemos práticas culinárias sustentáveis e conscientes.",
  },
]
