import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { scrollToElement } from '@/lib/utils';

export default function AIProductsSection() {
  const products = [
    {
      id: 'digitalize-facil',
      title: 'Digitalize Fácil',
      subtitle: 'Sua Presença Online Completa com IA',
      description: 'Tenha um mini-site profissional, atendimento 24/7 com IA personalizada e agendamento inteligente, tudo em uma solução intuitiva para pequenos empreendedores.',
      icon: 'fas fa-globe',
      features: ['Mini-site Responsivo', 'Chatbot com IA', 'Agendamento Online', 'Analytics Integrado'],
      ctaText: 'Saiba Mais e Experimente!',
      available: true
    },
    {
      id: 'gestao-inteligente',
      title: 'Gestão Inteligente com IA',
      subtitle: 'Automatize Processos Operacionais',
      description: 'Sistema completo de gestão empresarial com IA integrada para automação de fluxos de trabalho, análise preditiva e otimização de recursos.',
      icon: 'fas fa-brain',
      features: ['Automação de Processos', 'Análise Preditiva', 'Dashboard Inteligente', 'Integração ERP'],
      ctaText: 'Em Breve',
      available: false
    },
    {
      id: 'marketing-ai',
      title: 'Marketing Digital AI',
      subtitle: 'Campanhas Inteligentes que Convertem',
      description: 'Plataforma de marketing digital alimentada por IA para criação automática de conteúdo, segmentação inteligente e otimização de campanhas.',
      icon: 'fas fa-chart-line',
      features: ['Conteúdo Automático', 'Segmentação IA', 'A/B Testing', 'ROI Otimizado'],
      ctaText: 'Em Desenvolvimento',
      available: false
    }
  ];

  return (
    <section id="produtos" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Schema for Products Collection */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "CollectionPage",
                "name": "Soluções de IA da Secode",
                "description": "Produtos de Inteligência Artificial desenvolvidos para resolver problemas específicos de negócios",
                "url": "https://secode.com.br/#produtos",
                "hasPart": products.map(product => ({
                  "@type": "Product",
                  "name": product.title,
                  "description": product.description,
                  "category": "AI Software Solution",
                  "brand": {
                    "@type": "Brand",
                    "name": "Secode"
                  },
                  "offers": product.available ? {
                    "@type": "Offer",
                    "availability": "https://schema.org/InStock",
                    "priceSpecification": {
                      "@type": "PriceSpecification",
                      "priceCurrency": "BRL"
                    }
                  } : {
                    "@type": "Offer",
                    "availability": "https://schema.org/PreOrder"
                  }
                }))
              })
            }}
          />

          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Soluções de <span className="text-gradient">IA Desenvolvidas</span> Para Você
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Nossos produtos são projetados para resolver problemas específicos de negócios com o poder da 
              <abbr title="Inteligência Artificial" className="no-underline font-semibold text-primary"> Inteligência Artificial</abbr>.
              Cada solução combina algoritmos avançados de <abbr title="Machine Learning" className="no-underline font-semibold text-primary">Machine Learning</abbr> 
              {' '}com interfaces intuitivas para maximizar resultados.
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {products.map((product, index) => (
              <Card key={product.id} className={`group transition-all duration-300 hover:shadow-xl ${product.available ? 'hover:-translate-y-2 cursor-pointer' : 'opacity-75'} flex flex-col h-full`}>
                <CardHeader className="text-center pb-4 flex-shrink-0">
                  {/* Icon */}
                  <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mb-4 ${product.available ? 'group-hover:scale-110' : ''} transition-transform duration-300`}>
                    <i className={`${product.icon} text-primary-foreground text-2xl`}></i>
                  </div>
                  
                  <CardTitle className="text-xl font-bold text-foreground mb-2">
                    {product.title}
                  </CardTitle>
                  <p className="text-primary font-semibold">
                    {product.subtitle}
                  </p>
                </CardHeader>
                
                <CardContent className="flex flex-col flex-grow">
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {product.description}
                  </p>
                  
                  {/* Features */}
                  <div className="mb-6 flex-grow">
                    <h4 className="font-semibold text-foreground mb-3">Recursos Principais:</h4>
                    <ul className="space-y-2">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <i className="fas fa-check text-primary text-xs flex-shrink-0"></i>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* CTA Button */}
                  <div className="mt-auto">
                    <Button 
                      onClick={() => {
                        if (product.available && product.id === 'digitalize-facil') {
                          window.location.href = '/digitalize-planos';
                        } else if (product.available) {
                          scrollToElement('digitalize-facil');
                        }
                      }}
                      disabled={!product.available}
                      className={`w-full ${product.available 
                        ? 'gradient-purple text-white hover:scale-105' 
                        : 'bg-muted text-muted-foreground cursor-not-allowed'
                      } transition-all duration-300`}
                    >
                      <i className={`fas ${product.available ? 'fa-arrow-right' : 'fa-clock'} mr-2`}></i>
                      {product.ctaText}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-16">
            <div className="bg-gradient-to-r from-primary/10 via-background to-primary/10 rounded-2xl p-8 lg:p-12 text-center">
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-6">
                Tecnologia de Ponta em <abbr title="Inteligência Artificial">IA</abbr>
              </h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
                Nossas soluções utilizam as mais avançadas tecnologias de <abbr title="Large Language Models">LLM</abbr>, 
                Generative AI applications e LLM orchestration para entregar resultados excepcionais em automação, 
                análise de dados e experiência do usuário.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 max-w-4xl mx-auto">
                <span className="bg-primary/20 text-primary px-4 py-2 rounded-lg font-medium text-sm">GPT-4</span>
                <span className="bg-primary/20 text-primary px-4 py-2 rounded-lg font-medium text-sm">Machine Learning</span>
                <span className="bg-primary/20 text-primary px-4 py-2 rounded-lg font-medium text-sm">NLP</span>
                <span className="bg-primary/20 text-primary px-4 py-2 rounded-lg font-medium text-sm">Computer Vision</span>
                <span className="bg-primary/20 text-primary px-4 py-2 rounded-lg font-medium text-sm">Analytics</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}