import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

export default function CheckoutSuccess() {
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    // Get order details from URL params or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('order');
    
    if (orderId) {
      // In a real implementation, fetch order details from API
      setOrderDetails({
        id: orderId,
        plan: 'Plus',
        amount: 'R$ 89,00',
        email: 'cliente@exemplo.com'
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-check text-green-600 text-3xl"></i>
            </div>
            
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Pagamento Realizado com Sucesso!
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8">
              Obrigado por escolher a Secode! Seu plano foi ativado e você receberá um email com todas as instruções.
            </p>
          </div>

          {orderDetails && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Detalhes do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Número do Pedido:</span>
                  <span className="font-semibold">#{orderDetails.id}</span>
                </div>
                <div className="flex justify-between">
                  <span>Plano:</span>
                  <span className="font-semibold">{orderDetails.plan}</span>
                </div>
                <div className="flex justify-between">
                  <span>Valor:</span>
                  <span className="font-semibold">{orderDetails.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Email:</span>
                  <span className="font-semibold">{orderDetails.email}</span>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                <i className="fas fa-info-circle mr-2"></i>
                Próximos Passos
              </h3>
              <ul className="text-left text-blue-800 space-y-2">
                <li>✓ Você receberá um email de confirmação em até 5 minutos</li>
                <li>✓ Nossa equipe entrará em contato em até 24 horas</li>
                <li>✓ Seu mini-site será criado em até 48 horas</li>
                <li>✓ Você receberá acesso ao painel de controle</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => window.location.href = '/'}
                variant="outline"
                size="lg"
              >
                <i className="fas fa-home mr-2"></i>
                Voltar ao Início
              </Button>
              
              <Button
                onClick={() => window.location.href = 'https://wa.me/551151971617'}
                size="lg"
                className="bg-green-600 hover:bg-green-700"
              >
                <i className="fab fa-whatsapp mr-2"></i>
                Falar no WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}