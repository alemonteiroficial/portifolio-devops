import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';


interface WhatsappModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: string;
  planName: string;
}

export default function WhatsappModal({ isOpen, onClose, plan, planName }: WhatsappModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Salvar lead no banco de dados
      const response = await fetch('/api/whatsapp-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          plan: plan,
          source: 'digitalize-planos'
        })
      });

      if (!response.ok) {
        throw new Error('Falha ao salvar dados');
      }

      // Preparar mensagem para WhatsApp
      const message = `Olá! Sou ${formData.name} e tenho interesse no plano ${planName} do Digitalize Fácil.

Meus dados:
Email: ${formData.email}
Telefone: ${formData.phone}
Plano: ${planName}

Gostaria de saber mais detalhes sobre este plano.`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/551151971617?text=${encodedMessage}`;
      
      // Abrir WhatsApp
      window.open(whatsappUrl, '_blank');
      
      toast({
        title: "Dados salvos com sucesso!",
        description: "Você será redirecionado para o WhatsApp.",
      });

      // Fechar modal
      onClose();
      
      // Limpar formulário
      setFormData({ name: '', email: '', phone: '' });

    } catch (error) {
      console.error('Erro ao salvar lead:', error);
      
      // Mesmo com erro no banco, vamos permitir que o usuário continue para o WhatsApp
      const message = `Olá! Sou ${formData.name} e tenho interesse no plano ${planName} do Digitalize Fácil.

Meus dados:
Email: ${formData.email}
Telefone: ${formData.phone}
Plano: ${planName}

Gostaria de saber mais detalhes sobre este plano.`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/551151971617?text=${encodedMessage}`;
      
      // Abrir WhatsApp mesmo com erro no banco
      window.open(whatsappUrl, '_blank');
      
      toast({
        title: "Redirecionando para WhatsApp",
        description: "Você será direcionado para continuar a conversa.",
      });

      // Fechar modal
      onClose();
      
      // Limpar formulário
      setFormData({ name: '', email: '', phone: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <Card className="w-full max-w-md shadow-2xl border-0">
        <CardHeader className="text-center bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-white hover:text-gray-200 transition-colors"
            type="button"
          >
            <i className="fas fa-times text-lg"></i>
          </button>
          <CardTitle className="text-xl">
            <i className="fab fa-whatsapp mr-2"></i>
            Falar no WhatsApp
          </CardTitle>
          <p className="text-green-100 text-sm">
            Plano selecionado: <strong>{planName}</strong>
          </p>
        </CardHeader>

        <CardContent className="p-6">
          <p className="text-muted-foreground text-sm mb-6 text-center">
            Para melhor atendimento, precisamos de seus dados de contato:
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-sm font-medium text-foreground">
                Nome completo *
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Seu nome completo"
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Email *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="seu@email.com"
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-sm font-medium text-foreground">
                Telefone *
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="(11) 99999-9999"
                className="mt-1"
                required
              />
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                type="button"
                onClick={onClose}
                variant="outline"
                className="flex-1"
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Processando...
                  </>
                ) : (
                  <>
                    <i className="fab fa-whatsapp mr-2"></i>
                    Continuar
                  </>
                )}
              </Button>
            </div>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-4">
            Seus dados são seguros e utilizados apenas para melhor atendimento.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}