import LeadForm from "@/components/LeadForm";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-linear-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Primeiros Passos Fiscais para Profissionais da Saúde
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Guia gratuito e completo para médicos, dentistas, fisioterapeutas,
            psicólogos e outros profissionais que desejam entender os conceitos
            básicos de organização fiscal e contábil
          </p>
          <a
            href="#formulario"
            className="inline-block bg-white text-blue-700 font-bold py-4 px-8 rounded-lg text-lg hover:bg-blue-50 transition-colors duration-200 shadow-lg"
          >
            Quero receber o guia
          </a>
        </div>
      </section>

      {/* Seção de Benefícios */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            O que você vai aprender neste guia
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="mb-4">
                <svg
                  className="mx-auto h-12 w-12 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">PF x PJ</h3>
              <p className="text-gray-600">
                Entenda as diferenças práticas entre trabalhar como pessoa
                física ou jurídica e quando fazer a transição
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="mb-4">
                <svg
                  className="mx-auto h-12 w-12 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Evitar Erros Básicos
              </h3>
              <p className="text-gray-600">
                Conheça os principais impostos e regimes tributários para evitar
                problemas com o fisco desde o início
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="mb-4">
                <svg
                  className="mx-auto h-12 w-12 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Economia de Impostos
              </h3>
              <p className="text-gray-600">
                Tenha uma visão clara de quanto pode economizar com uma
                organização fiscal adequada e profissional
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="mb-4">
                <svg
                  className="mx-auto h-12 w-12 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Base para Conversar
              </h3>
              <p className="text-gray-600">
                Adquira conhecimento suficiente para conversar de igual para
                igual com contadores e tomar decisões informadas
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Para Quem É */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            Para quem é este guia?
          </h2>
          <p className="text-center text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            Este conteúdo foi pensado especialmente para profissionais da saúde
            e prestadores de serviços que estão começando sua carreira ou
            buscando organizar melhor sua situação fiscal
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              "Médicos",
              "Dentistas",
              "Fisioterapeutas",
              "Psicólogos",
              "Nutricionistas",
              "Enfermeiros",
              "Fonoaudiólogos",
              "Veterinários",
              "Farmacêuticos",
              "Terapeutas",
              "Outros profissionais da saúde",
              "Prestadores de serviços",
            ].map((profissional) => (
              <div
                key={profissional}
                className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 text-center hover:bg-blue-100 transition-colors duration-200"
              >
                <p className="text-gray-800 font-medium">{profissional}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção Sobre a Contabilidade */}
      <section className="py-16 px-4 bg-blue-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">
            Especialização em Profissionais da Saúde
          </h2>
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Nossa contabilidade possui{" "}
              <strong>amplo conhecimento e experiência</strong> no atendimento a
              profissionais da saúde e prestadores de serviços. Entendemos as
              particularidades do setor, desde as normas específicas até as
              melhores estratégias tributárias para cada tipo de profissional.
            </p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Trabalhamos especialmente com{" "}
              <strong>
                recém-formados e profissionais em início de carreira
              </strong>
              , oferecendo suporte completo para que você possa focar no que
              realmente importa: sua profissão e o atendimento aos seus
              pacientes e clientes.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Além de profissionais da saúde, também atendemos outros
              prestadores de serviços que buscam organização fiscal e contábil
              de qualidade. Nossa missão é ajudar você a crescer de forma
              estruturada e profissional desde o início.
            </p>
          </div>
        </div>
      </section>

      {/* Seção do Formulário */}
      <section id="formulario" className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Receba o guia completo gratuitamente
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Preencha o formulário abaixo e receba por e-mail o guia completo
              sobre primeiros passos fiscais para profissionais da saúde e
              prestadores de serviços. É 100% gratuito e sem compromisso.
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg shadow-lg p-8 md:p-12">
            <LeadForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400 mb-4">
            © {new Date().getFullYear()} Contabilidade Especializada em
            Profissionais da Saúde
          </p>
          <p className="text-sm text-gray-500">
            Este guia é fornecido apenas para fins educacionais e não substitui
            o aconselhamento profissional personalizado.
          </p>
        </div>
      </footer>
    </main>
  );
}
