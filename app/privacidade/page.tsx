import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { SkipToContent } from "@/components/skip-to-content"

export default function PrivacidadePage() {
  return (
    <>
      <SkipToContent />
      <SiteHeader />
      <main id="main-content" className="container py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Política de Privacidade</h1>

          <div className="prose prose-lg">
            <p className="text-muted-foreground mb-6">Última atualização: 19 de Maio de 2025</p>

            <p className="mb-4">
              O RecipeHub ("nós", "nosso" ou "nossa") está comprometido em proteger sua privacidade. Esta Política de
              Privacidade explica como coletamos, usamos, divulgamos e protegemos suas informações quando você usa nosso
              site e serviços.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">1. Informações que Coletamos</h2>
            <p className="mb-4">
              <strong>Informações Pessoais:</strong> Podemos coletar informações pessoais que você nos fornece
              voluntariamente, como nome, endereço de e-mail, e outras informações de contato quando você se registra em
              nossa plataforma, assina nossa newsletter, ou interage com nossos serviços.
            </p>
            <p className="mb-4">
              <strong>Informações de Uso:</strong> Coletamos automaticamente informações sobre como você interage com
              nosso site, incluindo as páginas que você visita, o tempo gasto no site, os links clicados e outras ações
              realizadas dentro do site.
            </p>
            <p className="mb-4">
              <strong>Informações do Dispositivo:</strong> Podemos coletar informações sobre o dispositivo que você usa
              para acessar nosso site, incluindo o tipo de dispositivo, sistema operacional, navegador, endereço IP e
              identificadores de dispositivo.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">2. Como Usamos Suas Informações</h2>
            <p className="mb-4">Usamos as informações que coletamos para:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Fornecer, manter e melhorar nossos serviços</li>
              <li>Processar e completar transações</li>
              <li>Enviar informações técnicas, atualizações, alertas de segurança e mensagens de suporte</li>
              <li>Responder a comentários, perguntas e solicitações</li>
              <li>Desenvolver novos produtos e serviços</li>
              <li>Monitorar e analisar tendências, uso e atividades</li>
              <li>Personalizar sua experiência no site</li>
              <li>Detectar, prevenir e resolver problemas técnicos</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">3. Compartilhamento de Informações</h2>
            <p className="mb-4">
              Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, exceto nas seguintes
              circunstâncias:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Com seu consentimento</li>
              <li>Para cumprir obrigações legais</li>
              <li>Para proteger e defender nossos direitos e propriedade</li>
              <li>Com prestadores de serviços que nos ajudam a operar nosso site e serviços</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">4. Cookies e Tecnologias Semelhantes</h2>
            <p className="mb-4">
              Usamos cookies e tecnologias semelhantes para coletar informações sobre suas atividades em nosso site.
              Cookies são pequenos arquivos de texto armazenados em seu dispositivo que nos ajudam a fornecer e melhorar
              nossos serviços. Você pode configurar seu navegador para recusar todos os cookies ou para indicar quando
              um cookie está sendo enviado. No entanto, alguns recursos do site podem não funcionar corretamente sem
              cookies.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">5. Segurança</h2>
            <p className="mb-4">
              Tomamos medidas razoáveis para proteger suas informações contra acesso não autorizado, alteração,
              divulgação ou destruição. No entanto, nenhum método de transmissão pela Internet ou método de
              armazenamento eletrônico é 100% seguro, e não podemos garantir sua segurança absoluta.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">6. Seus Direitos</h2>
            <p className="mb-4">
              Você tem o direito de acessar, corrigir ou excluir suas informações pessoais. Você também pode optar por
              não receber comunicações promocionais nossas seguindo as instruções de cancelamento de inscrição incluídas
              em tais comunicações.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">7. Alterações nesta Política de Privacidade</h2>
            <p className="mb-4">
              Podemos atualizar nossa Política de Privacidade de tempos em tempos. Notificaremos você sobre quaisquer
              alterações publicando a nova Política de Privacidade nesta página e atualizando a data "Última
              atualização" no topo.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">8. Contato</h2>
            <p className="mb-4">
              Se você tiver alguma dúvida sobre esta Política de Privacidade, entre em contato conosco pelo email:
              privacidade@recipehub.com
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
