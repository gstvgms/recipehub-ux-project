import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { SkipToContent } from "@/components/skip-to-content"

export default function TermosPage() {
  return (
    <>
      <SkipToContent />
      <SiteHeader />
      <main id="main-content" className="container py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Termos de Serviço</h1>

          <div className="prose prose-lg">
            <p className="text-muted-foreground mb-6">Última atualização: 19 de Maio de 2025</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">1. Aceitação dos Termos</h2>
            <p className="mb-4">
              Ao acessar e usar o RecipeHub, você concorda em cumprir e ficar vinculado aos seguintes termos e
              condições. Se você não concordar com qualquer parte destes termos, não poderá acessar o serviço.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">2. Uso do Serviço</h2>
            <p className="mb-4">
              O RecipeHub fornece uma plataforma para descobrir, compartilhar e salvar receitas culinárias. Você
              concorda em usar o serviço apenas para fins legais e de acordo com estes termos.
            </p>
            <p className="mb-4">
              Você é responsável por manter a confidencialidade de sua conta e senha e por restringir o acesso ao seu
              computador. Você concorda em aceitar a responsabilidade por todas as atividades que ocorrem em sua conta.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">3. Conteúdo do Usuário</h2>
            <p className="mb-4">
              Ao enviar conteúdo para o RecipeHub, você concede ao RecipeHub uma licença mundial, não exclusiva, livre
              de royalties para usar, reproduzir, modificar, adaptar, publicar, traduzir, distribuir e exibir esse
              conteúdo.
            </p>
            <p className="mb-4">
              Você declara e garante que: (i) possui ou controla todos os direitos sobre o conteúdo que você publica;
              (ii) o conteúdo é preciso e não enganoso; e (iii) o uso do conteúdo não violará estes Termos de Serviço e
              não causará danos a qualquer pessoa ou entidade.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">4. Propriedade Intelectual</h2>
            <p className="mb-4">
              O serviço e seu conteúdo original, recursos e funcionalidades são e permanecerão propriedade exclusiva do
              RecipeHub e seus licenciadores. O serviço é protegido por direitos autorais, marcas registradas e outras
              leis.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">5. Links para Outros Sites</h2>
            <p className="mb-4">
              Nosso serviço pode conter links para sites ou serviços de terceiros que não são de propriedade ou
              controlados pelo RecipeHub. O RecipeHub não tem controle e não assume nenhuma responsabilidade pelo
              conteúdo, políticas de privacidade ou práticas de sites ou serviços de terceiros.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">6. Rescisão</h2>
            <p className="mb-4">
              Podemos encerrar ou suspender sua conta e acesso ao serviço imediatamente, sem aviso prévio ou
              responsabilidade, por qualquer motivo, incluindo, sem limitação, se você violar os Termos de Serviço.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">7. Limitação de Responsabilidade</h2>
            <p className="mb-4">
              Em nenhum caso o RecipeHub, seus diretores, funcionários ou agentes serão responsáveis por quaisquer danos
              indiretos, punitivos, incidentais, especiais, consequentes ou exemplares, incluindo, sem limitação, danos
              por perda de lucros, boa vontade, uso, dados ou outras perdas intangíveis, resultantes de (i) seu acesso
              ou uso ou incapacidade de acessar ou usar o serviço; (ii) qualquer conduta ou conteúdo de terceiros no
              serviço; (iii) qualquer conteúdo obtido do serviço; e (iv) acesso não autorizado, uso ou alteração de suas
              transmissões ou conteúdo.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">8. Alterações</h2>
            <p className="mb-4">
              Reservamo-nos o direito, a nosso critério, de modificar ou substituir estes termos a qualquer momento. Se
              uma revisão for material, tentaremos fornecer um aviso de pelo menos 30 dias antes que quaisquer novos
              termos entrem em vigor. O que constitui uma mudança material será determinado a nosso critério.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">9. Contato</h2>
            <p className="mb-4">
              Se você tiver alguma dúvida sobre estes Termos, entre em contato conosco pelo email: contato@recipehub.com
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
