import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'wouter';

export default function DigitalizeFacilSection() {
  const benefits = [
    {
      icon: 'fas fa-rocket',
      title: 'Implementação Rápida',
      description: 'Seu mini-site estará no ar em menos de 24 horas com IA já configurada e funcionando.'
    },
    {
      icon: 'fas fa-money-bill-wave',
      title: 'Custo Acessível',
      description: 'Solução completa por uma fração do custo de desenvolvimento tradicional.'
    },
    {
      icon: 'fas fa-mobile-alt',
      title: 'Totalmente Responsivo',
      description: 'Funciona perfeitamente em computadores, tablets e smartphones.'
    },
    {
      icon: 'fas fa-headset',
      title: 'Suporte Contínuo',
      description: 'Nossa equipe está sempre disponível para ajudá-lo a otimizar seus resultados.'
    }
  ];

  const features = [
    {
      category: 'Mini-Site Profissional',
      items: [
        'Design moderno e responsivo',
        'Páginas otimizadas para conversão',
        'Integração com redes sociais',
        'SEO básico configurado'
      ]
    },
    {
      category: 'Atendimento com IA',
      items: [
        'Chatbot inteligente 24/7',
        'Respostas personalizadas ao seu negócio',
        'Captação automática de leads',
        'Integração com WhatsApp'
      ]
    },
    {
      category: 'Sistema de Agendamento',
      items: [
        'Calendário online integrado',
        'Confirmações automáticas',
        'Lembretes por email/SMS',
        'Sincronização com Google Calendar'
      ]
    }
  ];

  const targetAudience = [
    {
      icon: 'fas fa-stethoscope',
      title: 'Profissionais da Saúde',
      description: 'Médicos, dentistas, fisioterapeutas que precisam de agendamento online e presença digital.'
    },
    {
      icon: 'fas fa-cut',
      title: 'Salões de Beleza',
      description: 'Cabeleireiros, manicures, esteticistas que querem automatizar agendamentos.'
    },
    {
      icon: 'fas fa-briefcase',
      title: 'Consultores',
      description: 'Advogados, contadores, coaches que necessitam de um canal profissional online.'
    },
    {
      icon: 'fas fa-dumbbell',
      title: 'Personal Trainers',
      description: 'Profissionais de fitness que precisam gerenciar clientes e horários.'
    },
    {
      icon: 'fas fa-wrench',
      title: 'Prestadores de Serviços',
      description: 'Técnicos, reparadores, jardineiros que querem profissionalizar o atendimento.'
    },
    {
      icon: 'fas fa-store',
      title: 'Pequenos Comércios',
      description: 'Lojas locais que precisam expandir sua presença digital.'
    }
  ];

  return (
    <section id="digitalize-facil" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Schema for Digitalize Fácil Product */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Product",
                "name": "Digitalize Fácil",
                "description": "Mini-site profissional com atendimento 24/7 via IA personalizada e sistema de agendamento inteligente",
                "brand": {
                  "@type": "Brand",
                  "name": "Secode"
                },
                "category": "AI-powered Digital Presence Solution",
                "offers": {
                  "@type": "Offer",
                  "availability": "https://schema.org/InStock",
                  "priceCurrency": "BRL"
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.8",
                  "reviewCount": "127"
                },
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "Digitalize Fácil Features",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Mini-site Responsivo",
                        "description": "Website profissional otimizado para conversão"
                      }
                    },
                    {
                      "@type": "Offer", 
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Chatbot com IA",
                        "description": "Atendimento automatizado 24/7 com inteligência artificial"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service", 
                        "name": "Agendamento Online",
                        "description": "Sistema inteligente de agendamento integrado"
                      }
                    }
                  ]
                }
              })
            }}
          />

          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 mb-4">
              Produto Destaque
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              <span className="text-gradient">Digitalize Fácil</span>: Detalhes da Solução
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              A solução completa que transforma pequenos empreendedores em presença digital profissional, 
              com o poder da <abbr title="Inteligência Artificial">IA</abbr> para automatizar atendimento e maximizar conversões.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <CardTitle className="text-xl text-center text-primary">
                    {feature.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {feature.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <i className="fas fa-check text-primary mt-1 text-sm"></i>
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Benefits Section */}
          <div className="mb-16">
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground text-center mb-12">
              Benefícios para Acelerar o seu Negócio
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-primary/60 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <i className={`${benefit.icon} text-white text-xl`}></i>
                  </div>
                  <h4 className="font-bold text-foreground mb-2">{benefit.title}</h4>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Target Audience */}
          <div className="mb-16">
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground text-center mb-12">
              Para Quem é o Digitalize Fácil?
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {targetAudience.map((audience, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <i className={`${audience.icon} text-white`}></i>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-foreground mb-2">{audience.title}</h4>
                        <p className="text-sm text-muted-foreground">{audience.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 lg:p-12 text-center text-white">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Pronto para Digitalizar seu Negócio?
            </h3>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Comece hoje mesmo e tenha sua presença digital profissional funcionando em 24 horas, 
              com atendimento via IA e sistema de agendamento integrado.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/digitalize-planos">
                <Button 
                  size="lg"
                  className="bg-white text-primary hover:bg-gray-100 px-8 py-4 text-lg font-semibold hover:scale-105 transition-all duration-300"
                >
                  <i className="fas fa-comments mr-2"></i>
                  Quero Meu Mini-Site com IA!
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}