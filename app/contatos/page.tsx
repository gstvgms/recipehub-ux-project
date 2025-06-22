import { SiteHeader } from "@/components/site-header"
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Label } from "@/components/ui/label"
import { SkipToContent } from "@/components/skip-to-content"

export default function Contatos() {
  return (
    <>
      <SkipToContent />
      <SiteHeader />
      <main id="main-content" className="container py-6 md:py-10">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Entre em Contato</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Estamos aqui para ajudar. Envie-nos uma mensagem ou use um de nossos canais de contato.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="md:col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle>Envie uma Mensagem</CardTitle>
              <CardDescription>
                Preencha o formulário abaixo e entraremos em contato o mais breve possível.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input id="name" placeholder="Seu nome" required aria-required="true" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="seu.email@exemplo.com" required aria-required="true" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Assunto</Label>
                  <Input id="subject" placeholder="Assunto da mensagem" required aria-required="true" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea id="message" placeholder="Sua mensagem aqui..." rows={5} required aria-required="true" />
                </div>
                <Button type="submit" className="w-full">
                  Enviar Mensagem
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações de Contato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <a
                      href="mailto:contato@recipehub.com"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      contato@recipehub.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <h3 className="font-medium">Telefone</h3>
                    <a
                      href="tel:+554133145850"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      +55 (41) 3314-5850
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <h3 className="font-medium">Endereço</h3>
                    <address className="text-sm text-muted-foreground not-italic">
                      Calixto Razolini, 215
                      <br />
                      Curitiba, PR
                      <br />
                      Brasil
                    </address>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Redes Sociais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <a
                  href="#"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Siga-nos no Instagram"
                >
                  <Instagram className="h-5 w-5" />
                  <span>@recipehub</span>
                </a>

                <a
                  href="#"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Curta nossa página no Facebook"
                >
                  <Facebook className="h-5 w-5" />
                  <span>RecipeHub Oficial</span>
                </a>

                <a
                  href="#"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Siga-nos no Twitter"
                >
                  <Twitter className="h-5 w-5" />
                  <span>@recipehub</span>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>

        <section className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Perguntas Frequentes</CardTitle>
              <CardDescription>Encontre respostas para as dúvidas mais comuns sobre o RecipeHub</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Como posso contribuir com uma receita?</AccordionTrigger>
                  <AccordionContent>
                    Você pode enviar sua receita através do formulário de contato ou diretamente para o email
                    contato@recipehub.com com fotos e instruções detalhadas. Nossa equipe irá revisar e, se aprovada,
                    publicaremos com os devidos créditos.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>Vocês oferecem cursos de culinária?</AccordionTrigger>
                  <AccordionContent>
                    Infelizmente ainda não! Mas fique de olho em nossas redes sociais para informações sobre possíveis
                    cursos a serem lançados no futuro. Estamos sempre buscando novas formas de compartilhar conhecimento
                    culinário.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>Posso republicar receitas do RecipeHub?</AccordionTrigger>
                  <AccordionContent>
                    Nossas receitas são protegidas por direitos autorais. Entre em contato conosco para solicitar
                    permissão para uso em outros meios. Geralmente permitimos o compartilhamento com atribuição adequada
                    e link para nossa página.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </section>
      </main>
    </>
  )
}
