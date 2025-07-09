import { useState, useEffect } from "react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

interface Feature {
  category: string;
  name: string;
  start: boolean;
  plus: boolean;
  master: boolean;
}

const features: Feature[] = [
  // Atendimento AI (Chatbot)
  { category: "Atendimento AI (Chatbot)", name: "Atendimento Automatizado 24/7 (WhatsApp)", start: true, plus: true, master: true },
  { category: "Atendimento AI (Chatbot)", name: "Qualificação de Leads (WhatsApp)", start: true, plus: true, master: true },
  { category: "Atendimento AI (Chatbot)", name: "Agendamento Automatizado (WhatsApp)", start: true, plus: true, master: true },
  { category: "Atendimento AI (Chatbot)", name: "Respostas Imediatas (FAQ)", start: true, plus: true, master: true },
  { category: "Atendimento AI (Chatbot)", name: "Comunicação Personalizada (WhatsApp)", start: true, plus: true, master: true },
  { category: "Atendimento AI (Chatbot)", name: "Relatórios Básicos de Performance do Chatbot", start: true, plus: true, master: true },
  { category: "Atendimento AI (Chatbot)", name: "Webchat no Mini-site", start: false, plus: true, master: true },
  { category: "Atendimento AI (Chatbot)", name: "Integração Facebook Messenger", start: false, plus: true, master: true },
  { category: "Atendimento AI (Chatbot)", name: "Análise de Sentimento (básico)", start: false, plus: true, master: true },
  { category: "Atendimento AI (Chatbot)", name: "Histórico de Conversas (detalhado)", start: false, plus: true, master: true },
  { category: "Atendimento AI (Chatbot)", name: "Integração Instagram DMs", start: false, plus: false, master: true },
  { category: "Atendimento AI (Chatbot)", name: "Outros canais sob demanda", start: false, plus: false, master: true },
  { category: "Atendimento AI (Chatbot)", name: "IA Generativa para criação de conteúdo", start: false, plus: false, master: true },
  { category: "Atendimento AI (Chatbot)", name: "Personalização Profunda com IA", start: false, plus: false, master: true },

  // Criação de Website
  { category: "Criação de Website", name: "Mini-site Responsivo Básico", start: true, plus: true, master: true },
  { category: "Criação de Website", name: "Até 3 páginas", start: true, plus: true, master: true },
  { category: "Criação de Website", name: "Formulário de Contato", start: true, plus: true, master: true },
  { category: "Criação de Website", name: "SSL Incluído", start: true, plus: true, master: true },
  { category: "Criação de Website", name: "Até 10 páginas", start: false, plus: true, master: true },
  { category: "Criação de Website", name: "Blog/Notícias", start: false, plus: true, master: true },
  { category: "Criação de Website", name: "Galeria de Imagens/Vídeos", start: false, plus: true, master: true },
  { category: "Criação de Website", name: "Design Premium e Customizado", start: false, plus: false, master: true },
  { category: "Criação de Website", name: "Integração com E-commerce (catálogo e carrinho completo)", start: false, plus: false, master: true },
  { category: "Criação de Website", name: "Gerenciador de Link na Bio", start: false, plus: false, master: true },
  { category: "Criação de Website", name: "Sistema de Gestão de Conteúdo (CMS)", start: false, plus: false, master: true },

  // Email Marketing
  { category: "Email Marketing", name: "Envio de Email Marketing (básico)", start: false, plus: true, master: true },
  { category: "Email Marketing", name: "5 Contas de email corporativo", start: false, plus: true, master: true },
  { category: "Email Marketing", name: "Segmentação Avançada de Email", start: false, plus: false, master: true },
  { category: "Email Marketing", name: "Automação de Jornadas de Email", start: false, plus: false, master: true },

  // Gestão e Automação
  { category: "Gestão e Automação", name: "Gestão de Leads (via formulários/chat)", start: false, plus: true, master: true },
  { category: "Gestão e Automação", name: "Automação de Fluxos de Comunicação", start: false, plus: true, master: true },
  { category: "Gestão e Automação", name: "Automação de Fluxos de Trabalho (workflows)", start: false, plus: false, master: true },
  { category: "Gestão e Automação", name: "Integração com Ferramentas Externas (via API)", start: false, plus: false, master: true },

  // Relatórios e Insights
  { category: "Relatórios e Insights", name: "Relatórios Básicos de Performance do Chatbot", start: true, plus: true, master: true },
  { category: "Relatórios e Insights", name: "Relatórios Detalhados de Interação por Canal", start: false, plus: true, master: true },
  { category: "Relatórios e Insights", name: "Performance do Website", start: false, plus: true, master: true },
  { category: "Relatórios e Insights", name: "Dashboards Personalizados", start: false, plus: false, master: true },
  { category: "Relatórios e Insights", name: "Análise Preditiva (básico)", start: false, plus: false, master: true },
  { category: "Relatórios e Insights", name: "Insights Estratégicos de Canais Digitais", start: false, plus: false, master: true },

  // Suporte
  { category: "Suporte", name: "Suporte por Email (SLA Padrão)", start: true, plus: true, master: true },
  { category: "Suporte", name: "Suporte Prioritário por Email e WhatsApp (SLA Melhorado)", start: false, plus: true, master: true },
  { category: "Suporte", name: "Suporte Premium 24/7", start: false, plus: false, master: true },
  { category: "Suporte", name: "Consultoria Estratégica (1 hora/mês)", start: false, plus: false, master: true },
];

const plans = [
  {
    id: "start",
    name: "Start",
    subtitle: "Essencial",
    price: "R$ 74,50",
    period: "/mês",
    description: "Presença Digital Básica e IA no WhatsApp",
    color: "from-green-500 to-green-600",
    popular: false,
  },
  {
    id: "plus",
    name: "Plus",
    subtitle: "Avançado",
    price: "R$ 139,70",
    period: "/mês",
    description: "Canais Digitais Otimizados e Automação de Comunicação",
    color: "from-purple-500 to-purple-600",
    popular: true,
  },
  {
    id: "master",
    name: "Master",
    subtitle: "Completo",
    price: "R$ 247,80",
    period: "/mês",
    description: "Estratégia Digital Completa e Automação Integrada",
    color: "from-orange-500 to-orange-600",
    popular: false,
  },
];

const testimonials = [
    {
      name: "Maria Silva",
      role: "Salão de Beleza",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
      quote: "Depois da Secode, meu salão nunca mais perdeu um cliente por falta de atendimento. A IA responde tudo perfeitamente!"
    },
    {
      name: "João Santos", 
      role: "Consultor Financeiro",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
      quote: "A presença digital que eu precisava! Agora tenho mais tempo para focar nas consultorias."
    },
    {
      name: "Ana Costa",
      role: "Terapeuta Holística", 
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
      quote: "Incrível como a solução da Secode entende perfeitamente o que meus clientes precisam."
    },
    {
      name: "Dr. Carlos Lima",
      role: "Dentista",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
      quote: "Meu consultório agora funciona 24h! A IA agenda consultas mesmo de madrugada. Triplicou minha agenda!"
    },
    {
      name: "Dra. Fernanda Oliveira",
      role: "Biomédica Esteta",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
      quote: "A automação revolucionou minha clínica. Agendamentos, orçamentos e follow-up funcionam perfeitamente!"
    },
    {
      name: "Roberto Mendes",
      role: "Barbeiro",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
      quote: "Minha barbearia virou referência! O site e a IA capturam clientes o tempo todo. Melhor investimento!"
    }
  ];

export default function DigitalizeComparacao() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 8000); // 8 segundos para leitura confortável

    return () => clearInterval(interval);
  }, []);

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    window.location.href = `/checkout?plan=${planId}`;
  };

  const categories = [...new Set(features.map(f => f.category))];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up">
              <span className="text-gradient">Digitalize Fácil</span>
              <br />
              <span className="text-foreground">Compare os Planos</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{animationDelay: '0.3s'}}>
              Solução completa de digitalização para pequenos empreendedores.
              Compare funcionalidades e escolha o plano ideal para seu negócio.
            </p>
          </div>

          {/* Plans Header Cards */}
          <div className="grid lg:grid-cols-3 gap-6 mb-12 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <Card key={plan.id} className={`relative text-center ${plan.popular ? 'ring-2 ring-primary' : ''}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                    MAIS POPULAR
                  </Badge>
                )}
                <CardHeader className={`bg-gradient-to-br ${plan.color} text-white`}>
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <p className="text-lg font-semibold opacity-90">({plan.subtitle})</p>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-lg opacity-90">{plan.period}</span>
                  </div>
                  <p className="opacity-90 text-sm mt-2">{plan.description}</p>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <Button
                      onClick={() => window.location.href = `/plano-detalhes?plano=${plan.id}`}
                      variant="outline"
                      className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-semibold"
                    >
                      <i className="fas fa-info-circle mr-2"></i>
                      Saiba Mais
                    </Button>
                    
                    <Button
                      onClick={() => handlePlanSelect(plan.id)}
                      className={`w-full bg-gradient-to-r ${plan.color} text-primary-foreground hover:scale-105 transition-all duration-300 font-semibold`}
                    >
                      Escolher Plano
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Comparison Table */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl overflow-hidden animate-fade-in" style={{animationDelay: '0.5s'}}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800">
                    <th className="text-left p-4 font-bold text-foreground min-w-[300px]">
                      Funcionalidades
                    </th>
                    {plans.map((plan, index) => (
                      <th key={plan.id} className="text-center p-4 font-bold text-foreground min-w-[150px]">
                        <div className="flex flex-col items-center animate-slide-up" style={{animationDelay: `${0.7 + index * 0.2}s`}}>
                          <span className="text-lg">{plan.name}</span>
                          <span className="text-sm text-muted-foreground">({plan.subtitle})</span>
                          <span className="text-lg font-bold text-primary mt-1">{plan.price}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category, categoryIndex) => (
                    <React.Fragment key={category}>
                      {/* Category Header */}
                      <tr className="bg-primary/10 dark:bg-primary/20">
                        <td colSpan={4} className="p-4 font-bold text-primary text-lg">
                          {category}
                        </td>
                      </tr>
                      
                      {/* Features in Category */}
                      {features
                        .filter(f => f.category === category)
                        .map((feature, featureIndex) => (
                          <tr 
                            key={`${category}-${featureIndex}`}
                            className={`border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 ${
                              featureIndex % 2 === 0 ? 'comparison-table-row-even' : 'comparison-table-row-odd'
                            }`}
                          >
                            <td className="p-4 text-foreground">
                              {feature.name}
                            </td>
                            <td className="p-4 text-center">
                              {feature.start ? (
                                <span className="text-green-500 text-xl">✅</span>
                              ) : (
                                <span className="text-red-500 text-xl">❌</span>
                              )}
                            </td>
                            <td className="p-4 text-center">
                              {feature.plus ? (
                                <span className="text-green-500 text-xl">✅</span>
                              ) : (
                                <span className="text-red-500 text-xl">❌</span>
                              )}
                            </td>
                            <td className="p-4 text-center">
                              {feature.master ? (
                                <span className="text-green-500 text-xl">✅</span>
                              ) : (
                                <span className="text-red-500 text-xl">❌</span>
                              )}
                            </td>
                          </tr>
                        ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="mt-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                O que Nossos <span className="text-gradient">Clientes</span> Dizem
              </h3>
              <p className="text-lg text-muted-foreground">Histórias reais de transformação digital com a Secode</p>
            </div>
            
            <div className="relative max-w-3xl mx-auto mb-16">
              {/* Testimonial visível */}
              <div className="min-h-[400px] flex items-center justify-center">
                <Card className="card-hover bg-card shadow-2xl border hover:shadow-3xl w-full">
                  <CardContent className="p-8 text-center">
                    <div className="flex justify-center mb-6">
                      <img 
                        src={testimonials[currentTestimonial]?.image}
                        alt={testimonials[currentTestimonial]?.name}
                        className="w-24 h-24 rounded-full object-cover border-4 border-purple-200"
                      />
                    </div>
                    <div className="flex justify-center mb-6">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-2xl">⭐</span>
                      ))}
                    </div>
                    <p className="text-muted-foreground italic text-xl mb-8 leading-relaxed max-w-2xl mx-auto">
                      "{testimonials[currentTestimonial]?.quote}"
                    </p>
                    <div>
                      <h4 className="font-bold text-card-foreground text-xl mb-2">
                        {testimonials[currentTestimonial]?.name}
                      </h4>
                      <p className="text-muted-foreground text-lg font-medium">
                        {testimonials[currentTestimonial]?.role}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Indicadores de navegação */}
              <div className="flex justify-center mt-8 space-x-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      index === currentTestimonial 
                        ? 'bg-purple-600 scale-125' 
                        : 'bg-gray-300 hover:bg-gray-400 hover:scale-110'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-primary/10 via-background to-primary/10 rounded-2xl p-8 lg:p-12">
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-6">
                Pronto para Transformar Seu Negócio?
              </h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
                Escolha o plano ideal e comece sua jornada de digitalização hoje mesmo.
                Todos os planos incluem suporte técnico e garantia de satisfação.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {plans.map((plan) => (
                  <Button
                    key={plan.id}
                    onClick={() => handlePlanSelect(plan.id)}
                    className={`bg-gradient-to-r ${plan.color} text-primary-foreground hover:scale-105 transition-all duration-300 font-semibold py-4`}
                    size="lg"
                  >
                    <i className="fas fa-rocket mr-2"></i>
                    Escolher {plan.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}