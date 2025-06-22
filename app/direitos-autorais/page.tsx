import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { SkipToContent } from "@/components/skip-to-content"

export default function DireitosAutoraisPage() {
  return (
    <>
      <SkipToContent />
      <SiteHeader />
      <main id="main-content" className="container py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Direitos Autorais</h1>

          <div className="prose prose-lg">
            <p className="text-muted-foreground mb-6">Última atualização: 19 de Maio de 2025</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">1. Propriedade do Conteúdo</h2>
            <p className="mb-4">
              Todo o conteúdo disponível no RecipeHub, incluindo, mas não se limitando a textos, gráficos, logotipos,
              ícones, imagens, clipes de áudio, downloads digitais, compilações de dados e software, é propriedade do
              RecipeHub ou de seus fornecedores de conteúdo e está protegido pelas leis de direitos autorais nacionais e
              internacionais.
            </p>
            <p className="mb-4">
              A compilação de todo o conteúdo no site é propriedade exclusiva do RecipeHub e está protegida por leis de
              direitos autorais nacionais e internacionais. Todos os direitos reservados.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">2. Uso Permitido</h2>
            <p className="mb-4">
              O RecipeHub concede a você uma licença limitada, não exclusiva, não transferível e revogável para acessar
              e fazer uso pessoal e não comercial do site e seu conteúdo. Esta licença não inclui:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Qualquer revenda ou uso comercial do site ou seu conteúdo;</li>
              <li>Qualquer coleta e uso de listagens, descrições ou preços de produtos;</li>
              <li>Qualquer uso derivado do site ou seu conteúdo;</li>
              <li>Qualquer download ou cópia de informações de conta para o benefício de outro comerciante;</li>
              <li>
                Qualquer uso de data mining, robots ou ferramentas similares de coleta e extração de dados, exceto com
                nossa permissão expressa por escrito.
              </li>
            </ul>
            <p className="mb-4">
              Nenhuma parte do site pode ser reproduzida, duplicada, copiada, vendida, revendida ou explorada para
              qualquer finalidade comercial sem o consentimento expresso por escrito do RecipeHub.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">3. Receitas e Conteúdo Culinário</h2>
            <p className="mb-4">
              As receitas publicadas no RecipeHub são protegidas por direitos autorais em sua forma literária, incluindo
              descrições, narrativas, fotografias e apresentação visual. No entanto, é importante notar que, de acordo
              com a legislação de direitos autorais, os ingredientes e as instruções básicas de uma receita não são
              geralmente protegidos por direitos autorais, pois são considerados fatos ou procedimentos.
            </p>
            <p className="mb-4">
              Você pode usar as receitas do RecipeHub para preparação pessoal de alimentos. No entanto, a republicação,
              distribuição ou uso comercial de nossas receitas, incluindo texto, imagens ou vídeos, sem permissão
              expressa por escrito, é proibida.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">4. Conteúdo Gerado pelo Usuário</h2>
            <p className="mb-4">
              Ao enviar, postar ou exibir conteúdo no RecipeHub, você concede ao RecipeHub uma licença mundial, não
              exclusiva, livre de royalties, transferível e sublicenciável para usar, reproduzir, modificar, adaptar,
              publicar, traduzir, criar trabalhos derivados, distribuir e exibir tal conteúdo em qualquer mídia ou
              método de distribuição.
            </p>
            <p className="mb-4">
              Você declara e garante que possui ou controla todos os direitos sobre o conteúdo que publica, e que o uso
              de seu conteúdo não viola esta política e não causará danos a qualquer pessoa ou entidade.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">5. Marcas Registradas</h2>
            <p className="mb-4">
              RecipeHub e outros nomes, logotipos, designs de produtos e serviços, recursos e slogans do RecipeHub são
              marcas registradas do RecipeHub ou suas afiliadas. Você não pode usar tais marcas sem a permissão prévia
              por escrito do RecipeHub.
            </p>
            <p className="mb-4">
              Todos os outros nomes, logotipos, designs de produtos e serviços, recursos e slogans no site que não
              pertencem ao RecipeHub são marcas registradas de seus respectivos proprietários.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">6. Notificação de Violação de Direitos Autorais</h2>
            <p className="mb-4">
              Se você acredita que seu trabalho foi copiado de uma maneira que constitui violação de direitos autorais,
              forneça ao nosso agente de direitos autorais as seguintes informações:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>
                Uma assinatura eletrônica ou física da pessoa autorizada a agir em nome do proprietário do direito
                autoral;
              </li>
              <li>Uma descrição do trabalho protegido por direitos autorais que você alega ter sido violado;</li>
              <li>Uma descrição de onde o material que você alega estar infringindo está localizado no site;</li>
              <li>Seu endereço, número de telefone e endereço de e-mail;</li>
              <li>
                Uma declaração sua de que acredita de boa fé que o uso contestado não está autorizado pelo proprietário
                dos direitos autorais, seu agente ou a lei;
              </li>
              <li>
                Uma declaração sua, feita sob pena de perjúrio, de que as informações acima em sua notificação são
                precisas e que você é o proprietário dos direitos autorais ou está autorizado a agir em nome do
                proprietário dos direitos autorais.
              </li>
            </ul>
            <p className="mb-4">Nosso agente de direitos autorais pode ser contatado em: copyright@recipehub.com</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">7. Licença para Uso Pessoal</h2>
            <p className="mb-4">
              O RecipeHub concede a você uma licença pessoal, mundial, isenta de royalties, não atribuível e não
              exclusiva para usar o software fornecido pelo RecipeHub como parte dos serviços. Esta licença tem o único
              propósito de permitir que você use e desfrute do benefício dos serviços conforme fornecido pelo RecipeHub,
              da maneira permitida por estes Termos.
            </p>
            <p className="mb-4">
              Você não pode: (i) copiar, modificar, distribuir, vender ou alugar qualquer parte dos nossos serviços ou
              software incluído; (ii) fazer engenharia reversa ou tentar extrair o código-fonte desse software, a menos
              que tais restrições sejam proibidas por lei ou você tenha nossa permissão por escrito.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">8. Alterações</h2>
            <p className="mb-4">
              Reservamo-nos o direito, a nosso critério, de alterar ou modificar esta política de direitos autorais a
              qualquer momento. Se uma revisão for material, tentaremos fornecer um aviso de pelo menos 30 dias antes
              que quaisquer novos termos entrem em vigor. O que constitui uma mudança material será determinado a nosso
              critério.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">9. Contato</h2>
            <p className="mb-4">
              Se você tiver alguma dúvida sobre esta política de direitos autorais, entre em contato conosco pelo email:
              copyright@recipehub.com
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
