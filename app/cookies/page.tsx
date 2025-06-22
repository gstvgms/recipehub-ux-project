import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { SkipToContent } from "@/components/skip-to-content"

export default function CookiesPage() {
  return (
    <>
      <SkipToContent />
      <SiteHeader />
      <main id="main-content" className="container py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Política de Cookies</h1>

          <div className="prose prose-lg">
            <p className="text-muted-foreground mb-6">Última atualização: 19 de Maio de 2025</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">1. O que são cookies?</h2>
            <p className="mb-4">
              Cookies são pequenos arquivos de texto que são armazenados no seu computador ou dispositivo móvel quando
              você visita um site. Eles são amplamente utilizados para fazer os sites funcionarem de maneira mais
              eficiente, bem como fornecer informações aos proprietários do site.
            </p>
            <p className="mb-4">
              Os cookies permitem que um site reconheça seu dispositivo e lembre-se de informações sobre sua visita,
              como suas preferências de idioma, tamanho de fonte e outras configurações. Isso pode facilitar sua próxima
              visita e tornar o site mais útil para você.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">2. Como usamos cookies</h2>
            <p className="mb-4">
              O RecipeHub utiliza cookies para melhorar sua experiência em nosso site. Usamos diferentes tipos de
              cookies para diferentes propósitos:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>
                <strong>Cookies essenciais:</strong> Necessários para o funcionamento básico do site. Eles permitem que
                você navegue pelo site e use recursos essenciais, como áreas seguras e favoritos de receitas.
              </li>
              <li>
                <strong>Cookies de preferências:</strong> Permitem que o site lembre informações que mudam a aparência
                ou o comportamento do site, como seu idioma preferido ou a região em que você está.
              </li>
              <li>
                <strong>Cookies de estatísticas:</strong> Nos ajudam a entender como os visitantes interagem com o site,
                coletando e relatando informações anonimamente. Isso nos ajuda a melhorar o site.
              </li>
              <li>
                <strong>Cookies de marketing:</strong> Usados para rastrear visitantes em sites. A intenção é exibir
                anúncios relevantes e envolventes para o usuário individual.
              </li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">3. Cookies específicos que utilizamos</h2>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="border p-2 text-left">Nome do Cookie</th>
                    <th className="border p-2 text-left">Tipo</th>
                    <th className="border p-2 text-left">Propósito</th>
                    <th className="border p-2 text-left">Duração</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">recipe-hub-session</td>
                    <td className="border p-2">Essencial</td>
                    <td className="border p-2">Mantém sua sessão ativa enquanto você navega pelo site</td>
                    <td className="border p-2">Sessão</td>
                  </tr>
                  <tr>
                    <td className="border p-2">recipe-hub-preferences</td>
                    <td className="border p-2">Preferência</td>
                    <td className="border p-2">
                      Armazena suas preferências de visualização (modo escuro, tamanho da fonte)
                    </td>
                    <td className="border p-2">1 ano</td>
                  </tr>
                  <tr>
                    <td className="border p-2">recipe-hub-favorites</td>
                    <td className="border p-2">Funcionalidade</td>
                    <td className="border p-2">Armazena suas receitas favoritas</td>
                    <td className="border p-2">Persistente</td>
                  </tr>
                  <tr>
                    <td className="border p-2">recipe-hub-ratings</td>
                    <td className="border p-2">Funcionalidade</td>
                    <td className="border p-2">Armazena suas avaliações de receitas</td>
                    <td className="border p-2">Persistente</td>
                  </tr>
                  <tr>
                    <td className="border p-2">_ga</td>
                    <td className="border p-2">Estatística</td>
                    <td className="border p-2">Usado pelo Google Analytics para distinguir usuários</td>
                    <td className="border p-2">2 anos</td>
                  </tr>
                  <tr>
                    <td className="border p-2">_gid</td>
                    <td className="border p-2">Estatística</td>
                    <td className="border p-2">Usado pelo Google Analytics para distinguir usuários</td>
                    <td className="border p-2">24 horas</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-xl font-semibold mt-8 mb-4">4. Como gerenciar cookies</h2>
            <p className="mb-4">
              A maioria dos navegadores permite que você veja quais cookies você tem e exclua-os individualmente ou
              bloqueie cookies de um site específico ou de todos os sites. Esteja ciente de que, se você excluir todos
              os cookies, todas as suas preferências serão perdidas, incluindo a preferência de não usar cookies, pois
              isso requer que um cookie seja colocado.
            </p>
            <p className="mb-4">Você pode gerenciar e excluir cookies através das configurações do seu navegador:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>
                <a href="https://support.google.com/chrome/answer/95647" className="text-primary hover:underline">
                  Google Chrome
                </a>
              </li>
              <li>
                <a
                  href="https://support.mozilla.org/pt-BR/kb/limpe-cookies-e-dados-de-sites-no-firefox"
                  className="text-primary hover:underline"
                >
                  Mozilla Firefox
                </a>
              </li>
              <li>
                <a
                  href="https://support.microsoft.com/pt-br/microsoft-edge/excluir-cookies-no-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                  className="text-primary hover:underline"
                >
                  Microsoft Edge
                </a>
              </li>
              <li>
                <a
                  href="https://support.apple.com/pt-br/guide/safari/sfri11471/mac"
                  className="text-primary hover:underline"
                >
                  Safari
                </a>
              </li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">5. Cookies de terceiros</h2>
            <p className="mb-4">
              Alguns cookies são colocados por serviços de terceiros que aparecem em nossas páginas. Não temos controle
              sobre esses cookies. Eles são gerenciados pelos respectivos terceiros (por exemplo, Google Analytics,
              Facebook, etc.).
            </p>
            <p className="mb-4">
              Esses terceiros podem coletar informações sobre suas atividades online ao longo do tempo e em diferentes
              sites. Não temos controle sobre como esses terceiros usam suas informações.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">6. Alterações nesta Política de Cookies</h2>
            <p className="mb-4">
              Podemos atualizar nossa Política de Cookies de tempos em tempos. Notificaremos você sobre quaisquer
              alterações publicando a nova Política de Cookies nesta página e atualizando a data "Última atualização" no
              topo.
            </p>
            <p className="mb-4">
              Recomendamos que você revise esta Política de Cookies periodicamente para quaisquer alterações. Alterações
              nesta Política de Cookies são efetivas quando publicadas nesta página.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">7. Contato</h2>
            <p className="mb-4">
              Se você tiver alguma dúvida sobre esta Política de Cookies, entre em contato conosco pelo email:
              cookies@recipehub.com
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
