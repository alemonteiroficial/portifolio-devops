import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

export default function CheckoutExpired() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-clock text-red-600 text-3xl"></i>
            </div>
            
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Sessão Expirada
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8">
              O tempo limite para finalizar seu pagamento foi atingido. Por segurança, a sessão foi encerrada.
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>O que aconteceu?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-left space-y-2">
                <p className="text-muted-foreground">
                  • PIX: Expira em 60 minutos após a geração
                </p>
                <p className="text-muted-foreground">
                  • Boleto: Expira em 3 dias úteis
                </p>
                <p className="text-muted-foreground">
                  • Cartão: Sessão expira por inatividade
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-yellow-900 mb-2">
                <i className="fas fa-info-circle mr-2"></i>
                Nenhuma cobrança foi realizada
              </h3>
              <p className="text-yellow-800 mb-4">
                Como a sessão expirou, nenhum valor foi cobrado. Você pode iniciar um novo processo de pagamento.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => window.location.href = '/digitalize-planos'}
                size="lg"
                className="gradient-purple text-primary-foreground"
              >
                <i className="fas fa-redo mr-2"></i>
                Tentar Novamente
              </Button>
              
              <Button
                onClick={() => window.location.href = 'https://wa.me/551151971617'}
                variant="outline"
                size="lg"
              >
                <i className="fab fa-whatsapp mr-2"></i>
                Preciso de Ajuda
              </Button>
              
              <Button
                onClick={() => window.location.href = '/'}
                variant="outline"
                size="lg"
              >
                <i className="fas fa-home mr-2"></i>
                Voltar ao Início
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}