import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

interface CheckoutData {
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    document: string; // CPF/CNPJ
    business: string;
  };
  billingAddress: {
    zipCode: string;
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
  };
  paymentMethod: 'credit_card';
  creditCard: {
    number: string;
    holder: string;
    expiry: string;
    cvv: string;
  };
}

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
}

export default function Checkout() {
  const [location] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    customerInfo: {
      name: '',
      email: '',
      phone: '',
      document: '',
      business: ''
    },
    billingAddress: {
      zipCode: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: ''
    },
    paymentMethod: 'credit_card',
    creditCard: {
      number: '',
      holder: '',
      expiry: '',
      cvv: ''
    }
  });

  // Plans data (matching digitalize-planos.tsx)
  const plans = [
    {
      id: 'test',
      name: 'Teste',
      price: 'R$ 5,00',
      period: '/mês',
      description: 'Plano para testes de pagamento',
      features: [
        'Plano apenas para testes',
        'Valor reduzido para sandbox',
        'Todas as funcionalidades do Start',
        'Teste de cartão de crédito',
        'Assinatura mensal recorrente'
      ]
    },
    {
      id: 'start',
      name: 'Start',
      price: 'R$ 74,50',
      period: '/mês',
      description: 'Ideal para começar sua presença digital',
      features: [
        'Site responsivo profissional',
        'Domínio .com.br grátis',
        'Certificado SSL incluso',
        'IA para atendimento 24h',
        'Integração WhatsApp',
        'Suporte via chat'
      ]
    },
    {
      id: 'plus',
      name: 'Plus',
      price: 'R$ 139,70',
      period: '/mês',
      description: 'Canais Digitais Otimizados e Automação de Comunicação',
      features: [
        'Tudo do plano Start',
        'Webchat no Mini-site',
        'Integração Facebook Messenger',
        'Análise de Sentimento (básico)',
        'Histórico de Conversas (detalhado)',
        'Até 10 páginas',
        'Blog/Notícias',
        'Galeria de Imagens/Vídeos',
        'Email Marketing (básico)',
        '5 Contas de email corporativo',
        'Gestão de Leads',
        'Automação de Fluxos de Comunicação',
        'Relatórios Detalhados por Canal',
        'Performance do Website',
        'Suporte Prioritário (Email e WhatsApp)'
      ]
    },
    {
      id: 'master',
      name: 'Master',
      price: 'R$ 247,80',
      period: '/mês',
      description: 'Estratégia Digital Completa e Automação Integrada',
      features: [
        'Tudo do plano Plus',
        'Integração Instagram DMs',
        'Outros canais sob demanda',
        'IA Generativa para criação de conteúdo',
        'Personalização Profunda com IA',
        'Design Premium e Customizado',
        'E-commerce (catálogo e carrinho completo)',
        'Gerenciador de Link na Bio',
        'Sistema de Gestão de Conteúdo (CMS)',
        'Segmentação Avançada de Email',
        'Automação de Jornadas de Email',
        'Automação de Fluxos de Trabalho',
        'Integração com Ferramentas Externas (API)',
        'Dashboards Personalizados',
        'Análise Preditiva (básico)',
        'Insights Estratégicos de Canais Digitais',
        'Suporte Premium 24/7',
        'Consultoria Estratégica (1 hora/mês)'
      ]
    }
  ];

  // Get plan from URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const planId = urlParams.get('plan');
    
    if (planId) {
      const plan = plans.find(p => p.id === planId);
      if (plan) {
        setSelectedPlan(plan);
      }
    }
  }, []);

  const handleInputChange = (section: keyof CheckoutData, field: string, value: string) => {
    setCheckoutData(prev => {
      const sectionData = prev[section] as Record<string, any>;
      return {
        ...prev,
        [section]: {
          ...sectionData,
          [field]: value
        }
      };
    });
  };

  const formatCurrency = (value: string) => {
    // Remove R$ and convert to cents
    const numericValue = value.replace(/[^\d,]/g, '').replace(',', '.');
    return Math.round(parseFloat(numericValue) * 100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPlan) {
      toast({
        title: "Erro",
        description: "Nenhum plano selecionado.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const paymentAmount = formatCurrency(selectedPlan.price);
      
      const subscriptionData = {
        ...checkoutData,
        planId: selectedPlan.id,
        planName: selectedPlan.name,
        planDescription: selectedPlan.description,
        amount: paymentAmount
      };

      console.log('Enviando dados da assinatura:', subscriptionData);

      const response = await fetch('/api/create-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscriptionData),
      });

      const result = await response.json();
      console.log('Resposta da API:', result);

      if (result.success && result.redirectUrl) {
        // Subscription created successfully - redirect to external checkout
        console.log('Redirecionando para:', result.redirectUrl);
        window.location.href = result.redirectUrl;
        return;
      } else {
        throw new Error(result.error || 'Erro ao processar assinatura');
      }

    } catch (error) {
      console.error('Erro no checkout:', error);
      toast({
        title: "Erro no pagamento",
        description: error instanceof Error ? error.message : "Tente novamente ou entre em contato conosco.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleZipCodeChange = async (zipCode: string) => {
    handleInputChange('billingAddress', 'zipCode', zipCode);
    
    if (zipCode.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${zipCode}/json/`);
        const data = await response.json();
        
        if (!data.erro) {
          setCheckoutData(prev => ({
            ...prev,
            billingAddress: {
              ...prev.billingAddress,
              street: data.logradouro || '',
              neighborhood: data.bairro || '',
              city: data.localidade || '',
              state: data.uf || ''
            }
          }));
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
      }
    }
  };

  if (!selectedPlan) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Plano não encontrado</h1>
            <p className="text-muted-foreground mb-6">
              Não foi possível encontrar o plano selecionado.
            </p>
            <Button onClick={() => window.history.back()}>
              Voltar
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Finalizar Assinatura</h1>
            <p className="text-muted-foreground">
              Complete seus dados para ativar o plano {selectedPlan.name}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Customer Information */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informações Pessoais</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input
                        id="name"
                        required
                        value={checkoutData.customerInfo.name}
                        onChange={(e) => handleInputChange('customerInfo', 'name', e.target.value)}
                        placeholder="Seu nome completo"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={checkoutData.customerInfo.email}
                        onChange={(e) => handleInputChange('customerInfo', 'email', e.target.value)}
                        placeholder="seu@email.com"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        required
                        value={checkoutData.customerInfo.phone}
                        onChange={(e) => handleInputChange('customerInfo', 'phone', e.target.value)}
                        placeholder="(11) 99999-9999"
                      />
                    </div>

                    <div>
                      <Label htmlFor="document">CPF/CNPJ</Label>
                      <Input
                        id="document"
                        required
                        value={checkoutData.customerInfo.document}
                        onChange={(e) => handleInputChange('customerInfo', 'document', e.target.value)}
                        placeholder="000.000.000-00"
                      />
                    </div>

                    <div>
                      <Label htmlFor="business">Tipo de Negócio</Label>
                      <Input
                        id="business"
                        required
                        value={checkoutData.customerInfo.business}
                        onChange={(e) => handleInputChange('customerInfo', 'business', e.target.value)}
                        placeholder="Ex: Clínica, Salão, Loja"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Billing Address */}
                <Card>
                  <CardHeader>
                    <CardTitle>Endereço de Cobrança</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="zipCode">CEP</Label>
                      <Input
                        id="zipCode"
                        required
                        value={checkoutData.billingAddress.zipCode}
                        onChange={(e) => handleZipCodeChange(e.target.value)}
                        placeholder="00000-000"
                        maxLength={8}
                      />
                    </div>

                    <div>
                      <Label htmlFor="street">Endereço</Label>
                      <Input
                        id="street"
                        required
                        value={checkoutData.billingAddress.street}
                        onChange={(e) => handleInputChange('billingAddress', 'street', e.target.value)}
                        placeholder="Rua, Avenida..."
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="number">Número</Label>
                        <Input
                          id="number"
                          required
                          value={checkoutData.billingAddress.number}
                          onChange={(e) => handleInputChange('billingAddress', 'number', e.target.value)}
                          placeholder="123"
                        />
                      </div>
                      <div>
                        <Label htmlFor="complement">Complemento</Label>
                        <Input
                          id="complement"
                          value={checkoutData.billingAddress.complement}
                          onChange={(e) => handleInputChange('billingAddress', 'complement', e.target.value)}
                          placeholder="Apto, Sala..."
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="neighborhood">Bairro</Label>
                      <Input
                        id="neighborhood"
                        required
                        value={checkoutData.billingAddress.neighborhood}
                        onChange={(e) => handleInputChange('billingAddress', 'neighborhood', e.target.value)}
                        placeholder="Nome do bairro"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">Cidade</Label>
                        <Input
                          id="city"
                          required
                          value={checkoutData.billingAddress.city}
                          onChange={(e) => handleInputChange('billingAddress', 'city', e.target.value)}
                          placeholder="Nome da cidade"
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">Estado</Label>
                        <Input
                          id="state"
                          required
                          value={checkoutData.billingAddress.state}
                          onChange={(e) => handleInputChange('billingAddress', 'state', e.target.value)}
                          placeholder="SP"
                          maxLength={2}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Payment and Summary */}
              <div className="space-y-6">
                {/* Plan Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle>Resumo do Pedido</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{selectedPlan.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {selectedPlan.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{selectedPlan.price}</div>
                          <div className="text-sm text-muted-foreground">{selectedPlan.period}</div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-2">
                        <h4 className="font-medium">Recursos inclusos:</h4>
                        <ul className="text-sm space-y-1">
                          {selectedPlan.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <i className="fas fa-check text-green-500 text-xs"></i>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex justify-between items-center font-semibold text-lg">
                        <span>Total</span>
                        <span>{selectedPlan.price}{selectedPlan.period}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card>
                  <CardHeader>
                    <CardTitle>Forma de Pagamento</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg">
                        <i className="fas fa-credit-card text-lg"></i>
                        <span className="font-medium">Cartão de Crédito</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">Pagamento recorrente mensal</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Número do Cartão</Label>
                        <Input
                          id="cardNumber"
                          required
                          value={checkoutData.creditCard.number}
                          onChange={(e) => handleInputChange('creditCard', 'number', e.target.value)}
                          placeholder="0000 0000 0000 0000"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="cardHolder">Nome no Cartão</Label>
                          <Input
                            id="cardHolder"
                            required
                            value={checkoutData.creditCard.holder}
                            onChange={(e) => handleInputChange('creditCard', 'holder', e.target.value)}
                            placeholder="Nome como no cartão"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardExpiry">Validade</Label>
                          <Input
                            id="cardExpiry"
                            required
                            value={checkoutData.creditCard.expiry}
                            onChange={(e) => handleInputChange('creditCard', 'expiry', e.target.value)}
                            placeholder="MM/AA"
                            maxLength={5}
                          />
                        </div>
                      </div>

                      <div className="w-1/2">
                        <Label htmlFor="cardCvv">CVV</Label>
                        <Input
                          id="cardCvv"
                          type="password"
                          required
                          value={checkoutData.creditCard.cvv}
                          onChange={(e) => handleInputChange('creditCard', 'cvv', e.target.value)}
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 text-lg font-semibold"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Processando...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-credit-card mr-2"></i>
                      Assinar {selectedPlan.name} - {selectedPlan.price}{selectedPlan.period}
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Ao finalizar, você concorda com nossos termos de serviço e autoriza a cobrança recorrente mensal.
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}