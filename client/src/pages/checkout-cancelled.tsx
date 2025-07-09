import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

export default function CheckoutCancelled() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-times text-orange-600 text-3xl"></i>
            </div>
            
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Pagamento Cancelado
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8">
              Seu pagamento foi cancelado. Não se preocupe, nenhuma cobrança foi realizada.
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>O que aconteceu?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                O processo de pagamento foi interrompido antes da conclusão. 
                Isso pode ter acontecido por escolha sua ou por algum problema técnico.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                <i className="fas fa-lightbulb mr-2"></i>
                Quer tentar novamente?
              </h3>
              <p className="text-blue-800 mb-4">
                Você pode voltar e escolher outro plano ou forma de pagamento.
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
                Falar no WhatsApp
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