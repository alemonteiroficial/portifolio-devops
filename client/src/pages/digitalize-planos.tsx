import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import ChatPopup from "@/components/chat-popup";
import WhatsappModal from "@/components/whatsapp-modal";

export default function DigitalizePlanos() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [whatsappModal, setWhatsappModal] = useState({
    isOpen: false,
    plan: "",
    planName: "",
  });

  const plans = [
    {
      id: "start",
      name: "Start",
      subtitle: "Essencial",
      price: "R$ 99,90",
      period: "/mês",
      description: "Presença Digital Básica e IA no WhatsApp",
      color: "from-green-500 to-green-600",
      features: [
        "Atendimento Automatizado 24/7 (WhatsApp)",
        "Qualificação de Leads (WhatsApp)",
        "Agendamento Automatizado (WhatsApp)",
        "Respostas Imediatas (FAQ)",
        "Comunicação Personalizada (WhatsApp)",
        "Relatórios Básicos de Performance",
        "Mini-site Responsivo Básico",
        "Até 3 páginas",
        "Formulário de Contato",
        "SSL Incluído",
        "Suporte por Email"
      ],
      popular: false,
    },
    {
      id: "plus",
      name: "Plus",
      subtitle: "Avançado",
      price: "R$ 199,90",
      period: "/mês",
      description: "Canais Digitais Otimizados e Automação de Comunicação",
      color: "from-purple-500 to-purple-600",
      features: [
        "Tudo do plano Start",
        "Webchat no Mini-site",
        "Integração Facebook Messenger",
        "Análise de Sentimento (básico)",
        "Histórico de Conversas (detalhado)",
        "Até 10 páginas",
        "Blog/Notícias",
        "Galeria de Imagens/Vídeos",
        "Email Marketing (básico)",
        "5 Contas de email corporativo",
        "Gestão de Leads",
        "Automação de Fluxos de Comunicação",
        "Relatórios Detalhados por Canal",
        "Performance do Website",
        "Suporte Prioritário (Email e WhatsApp)"
      ],
      popular: true,
    },
    {
      id: "master",
      name: "Master",
      subtitle: "Completo",
      price: "R$ 399,90",
      period: "/mês",
      description: "Estratégia Digital Completa e Automação Integrada",
      color: "from-orange-500 to-orange-600",
      features: [
        "Tudo do plano Plus",
        "Integração Instagram DMs",
        "Outros canais sob demanda",
        "IA Generativa para criação de conteúdo",
        "Personalização Profunda com IA",
        "Design Premium e Customizado",
        "E-commerce (catálogo e carrinho completo)",
        "Gerenciador de Link na Bio",
        "Sistema de Gestão de Conteúdo (CMS)",
        "Segmentação Avançada de Email",
        "Automação de Jornadas de Email",
        "Automação de Fluxos de Trabalho",
        "Integração com Ferramentas Externas (API)",
        "Dashboards Personalizados",
        "Análise Preditiva (básico)",
        "Insights Estratégicos de Canais Digitais",
        "Suporte Premium 24/7",
        "Consultoria Estratégica (1 hora/mês)"
      ],
      popular: false,
    },
  ];

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    // Redirect to checkout for all plans
    window.location.href = `/checkout?plan=${planId}`;
  };

  const closeWhatsappModal = () => {
    setWhatsappModal({
      isOpen: false,
      plan: "",
      planName: "",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-gradient">Digitalize Fácil</span>
              <br />
              <span className="text-foreground">Sua Presença Online Completa com IA</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Solução completa de digitalização para pequenos empreendedores.
              Mini-site profissional + Atendimento IA 24/7 + Agendamento inteligente.
              Escolha o plano ideal para seu negócio.
            </p>
          </div>

          {/* Plans Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative overflow-hidden border-2 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                  plan.popular
                    ? "border-primary shadow-lg"
                    : "border-border hover:border-primary/50"
                } ${selectedPlan === plan.id ? "ring-2 ring-primary" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0">
                    <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-center py-2 text-sm font-semibold">
                      MAIS POPULAR
                    </div>
                  </div>
                )}

                <CardHeader
                  className={`bg-gradient-to-br ${plan.color} text-white ${plan.popular ? "pt-12" : "pt-6"}`}
                >
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
                    {plan.subtitle && (
                      <p className="text-lg font-semibold opacity-90 mb-3">({plan.subtitle})</p>
                    )}
                    <div className="mb-4">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-lg opacity-90">{plan.period}</span>
                    </div>
                    <p className="opacity-90 text-sm">{plan.description}</p>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <i className="fas fa-check-circle text-green-500 mt-1 mr-3 flex-shrink-0"></i>
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="space-y-3">
                    <Button
                      onClick={() => {
                        window.location.href = `/plano-detalhes?plano=${plan.id}`;
                      }}
                      variant="outline"
                      className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-semibold py-3"
                    >
                      <i className="fas fa-info-circle mr-2"></i>
                      Saiba Mais
                    </Button>
                    
                    <Button
                      onClick={() => handlePlanSelect(plan.id)}
                      className={`w-full bg-gradient-to-r ${plan.color} text-primary-foreground hover:scale-105 transition-all duration-300 font-semibold py-3`}
                    >
                      Escolher Plano
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-16 text-center">
            <div className="bg-primary/5 rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Todos os planos incluem:
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-center justify-center">
                  <i className="fas fa-shield-alt text-primary text-xl mr-3"></i>
                  <span className="text-muted-foreground">SSL e Segurança</span>
                </div>
                <div className="flex items-center justify-center">
                  <i className="fas fa-mobile-alt text-primary text-xl mr-3"></i>
                  <span className="text-muted-foreground">100% Responsivo</span>
                </div>
                <div className="flex items-center justify-center">
                  <i className="fas fa-rocket text-primary text-xl mr-3"></i>
                  <span className="text-muted-foreground">
                    Performance Otimizada
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact-section"
        className="py-20 bg-gradient-to-br from-primary/5 via-background to-primary/10"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Pronto para começar?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Entre em contato conosco e vamos criar a solução perfeita para o
              seu negócio.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() =>
                setWhatsappModal({
                  isOpen: true,
                  plan: "consulta",
                  planName: "Consulta Geral",
                })
              }
              size="lg"
              className="gradient-purple text-white px-8 py-4 text-lg font-semibold hover:scale-105 transition-all duration-300"
            >
              <i className="fab fa-whatsapp mr-2"></i>
              Falar no WhatsApp
            </Button>

            <Button
              onClick={() =>
                (window.location.href =
                  "mailto:contato@secode.com.br?subject=Interesse nos planos Digitalize Fácil")
              }
              variant="outline"
              size="lg"
              className="px-8 py-4 text-lg font-semibold border-2 hover:scale-105 transition-all duration-300"
            >
              <i className="fas fa-envelope mr-2"></i>
              Enviar Email
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <ChatPopup />

      <WhatsappModal
        isOpen={whatsappModal.isOpen}
        onClose={closeWhatsappModal}
        plan={whatsappModal.plan}
        planName={whatsappModal.planName}
      />
    </div>
  );
}
