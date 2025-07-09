import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function About() {
  const values = [
    {
      icon: 'fas fa-lightbulb',
      title: 'Inovação',
      description: 'Estamos sempre na vanguarda da tecnologia, explorando novas possibilidades em IA e desenvolvimento de software.'
    },
    {
      icon: 'fas fa-users',
      title: 'Foco no Cliente',
      description: 'Cada solução é pensada para resolver problemas reais e gerar valor tangível para nossos clientes.'
    },
    {
      icon: 'fas fa-graduation-cap',
      title: 'Excelência Técnica',
      description: 'Mantemos os mais altos padrões de qualidade em código, arquitetura e implementação de soluções.'
    },
    {
      icon: 'fas fa-handshake',
      title: 'Transparência',
      description: 'Construímos relacionamentos baseados na confiança, comunicação clara e entrega de resultados.'
    }
  ];

  const timeline = [
    {
      year: '2023',
      title: 'Fundação',
      description: 'A Secode nasceu com a missão de democratizar o acesso à tecnologia para pequenos empreendedores.'
    },
    {
      year: '2023',
      title: 'Era da IA',
      description: 'Iniciamos nossa jornada em Inteligência Artificial, integrando chatbots e análise de dados.'
    },
    {
      year: '2024',
      title: 'Digitalize Fácil',
      description: 'Lançamos nossa primeira solução completa de IA para negócios.'
    },
    {
      year: '2024',
      title: 'Expansão',
      description: 'Ampliamos nosso portfólio com soluções avançadas de CRM AI e automação inteligente.'
    },
    {
      year: '2025',
      title: 'Crescimento',
      description: 'Consolidamos nossa posição como referência em soluções de IA para transformação digital.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* JSON-LD Schema for About Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "Quem Somos - Secode",
            "description": "Conheça a Secode: Inovação e Expertise em IA e Tecnologia para transformação de negócios",
            "url": "https://secode.com.br/quem-somos",
            "mainEntity": {
              "@type": "Organization",
              "@id": "https://secode.com.br/#organization",
              "name": "Secode",
              "description": "Especialista em Inteligência Artificial para transformação digital de negócios",
              "foundingDate": "2023",
              "knowsAbout": [
                "Artificial Intelligence",
                "Large Language Models", 
                "AI-powered automation",
                "Generative AI applications",
                "LLM orchestration",
                "Digital transformation",
                "Business automation"
              ],
              "hasCredential": [
                {
                  "@type": "EducationalOccupationalCredential",
                  "name": "AI Development Expertise"
                },
                {
                  "@type": "EducationalOccupationalCredential", 
                  "name": "Machine Learning Implementation"
                }
              ]
            }
          })
        }}
      />

      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-background via-background to-primary/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                <span className="text-gradient">Secode</span>: Inovação e Expertise em 
                <span className="text-gradient"> IA</span> e Tecnologia
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Somos apaixonados por tecnologia e pela transformação de negócios através da 
                <abbr title="Inteligência Artificial" className="no-underline font-semibold text-primary"> Inteligência Artificial</abbr> 
                {' '}e soluções de código inovadoras.
              </p>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-8 mb-16">
                {/* Mission */}
                <Card className="text-center h-full">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4">
                      <i className="fas fa-bullseye text-white text-xl"></i>
                    </div>
                    <CardTitle className="text-2xl text-primary">Nossa Missão</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      Democratizar o acesso à Inteligência Artificial e tecnologia avançada, 
                      capacitando pequenos e médios empreendedores a competirem no mercado digital 
                      com soluções profissionais e acessíveis.
                    </p>
                  </CardContent>
                </Card>

                {/* Vision */}
                <Card className="text-center h-full">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-4">
                      <i className="fas fa-eye text-white text-xl"></i>
                    </div>
                    <CardTitle className="text-2xl text-primary">Nossa Visão</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      Ser reconhecida como a principal referência em soluções de IA para pequenos negócios, 
                      transformando a forma como empreendedores se relacionam com a tecnologia e 
                      automatizam seus processos.
                    </p>
                  </CardContent>
                </Card>

                {/* Story */}
                <Card className="text-center h-full">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
                      <i className="fas fa-book text-white text-xl"></i>
                    </div>
                    <CardTitle className="text-2xl text-primary">Nossa História</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      Fundada em 2023, a Secode nasceu da paixão por tecnologia e da vontade de 
                      tornar soluções avançadas de IA acessíveis para todos os tipos de negócio, 
                      especialmente aqueles que mais precisam de diferenciação no mercado.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Values */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-foreground text-center mb-12">
                  Nossos Valores
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {values.map((value, index) => (
                    <div key={index} className="text-center group">
                      <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-primary/60 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <i className={`${value.icon} text-white text-xl`}></i>
                      </div>
                      <h3 className="font-bold text-foreground mb-2">{value.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-foreground text-center mb-12">
                  Nossa Jornada
                </h2>
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-primary to-primary/50"></div>
                  
                  <div className="space-y-12">
                    {timeline.map((item, index) => (
                      <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                        <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                          <Card>
                            <CardContent className="p-6">
                              <div className="text-2xl font-bold text-primary mb-2">{item.year}</div>
                              <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                              <p className="text-muted-foreground">{item.description}</p>
                            </CardContent>
                          </Card>
                        </div>
                        
                        {/* Timeline dot */}
                        <div className="w-4 h-4 bg-primary rounded-full border-4 border-background relative z-10"></div>
                        
                        <div className="w-1/2"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Technologies */}
              <div className="bg-gradient-to-r from-primary/10 via-background to-primary/10 rounded-2xl p-8 lg:p-12 text-center">
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Tecnologias que Dominamos
                </h2>
                <p className="text-muted-foreground mb-8 max-w-3xl mx-auto">
                  Nossa expertise abrange as mais modernas tecnologias de <abbr title="Inteligência Artificial">IA</abbr>, 
                  desde <abbr title="Large Language Models">Large Language Models</abbr> até automação avançada 
                  e análise preditiva de dados.
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-sm">
                  <span className="bg-primary/20 text-primary px-3 py-2 rounded-lg font-medium">Python</span>
                  <span className="bg-primary/20 text-primary px-3 py-2 rounded-lg font-medium">TensorFlow</span>
                  <span className="bg-primary/20 text-primary px-3 py-2 rounded-lg font-medium">OpenAI GPT</span>
                  <span className="bg-primary/20 text-primary px-3 py-2 rounded-lg font-medium">LangChain</span>
                  <span className="bg-primary/20 text-primary px-3 py-2 rounded-lg font-medium">React</span>
                  <span className="bg-primary/20 text-primary px-3 py-2 rounded-lg font-medium">Node.js</span>
                  <span className="bg-primary/20 text-primary px-3 py-2 rounded-lg font-medium">PostgreSQL</span>
                  <span className="bg-primary/20 text-primary px-3 py-2 rounded-lg font-medium">AWS</span>
                  <span className="bg-primary/20 text-primary px-3 py-2 rounded-lg font-medium">Docker</span>
                  <span className="bg-primary/20 text-primary px-3 py-2 rounded-lg font-medium">FastAPI</span>
                  <span className="bg-primary/20 text-primary px-3 py-2 rounded-lg font-medium">Scikit-learn</span>
                  <span className="bg-primary/20 text-primary px-3 py-2 rounded-lg font-medium">Hugging Face</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Pronto para Transformar seu Negócio?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Converse com nossos especialistas em IA e descubra como podemos 
                revolucionar seus processos e resultados.
              </p>
              <Button 
                size="lg"
                className="gradient-purple text-white px-8 py-4 text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <i className="fas fa-comments mr-2"></i>
                Converse com a Secode
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}