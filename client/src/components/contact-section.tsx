import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { validateContactForm } from '@/lib/utils';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    business: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateContactForm(formData);
    if (errors.length > 0) {
      toast({
        title: "Erro no formulário",
        description: errors.join('\n'),
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Use environment variable for API endpoint or fallback to local
      const endpoint = import.meta.env.VITE_CONTACT_API_URL || '/api/contacts';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const result = await response.json();
      
      toast({
        title: "Mensagem enviada!",
        description: "Obrigado pelo seu interesse! Entraremos em contato em breve.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        business: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Erro ao enviar",
        description: "Tente novamente ou entre em contato diretamente conosco.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const businessOptions = [
    { value: 'academia', label: 'Academia' },
    { value: 'advocacia', label: 'Advocacias' },
    { value: 'advogado', label: 'Advogados' },
    { value: 'artesao', label: 'Artesão' },
    { value: 'autopecas', label: 'Autopeças' },
    { value: 'cafeteria', label: 'Cafeterias' },
    { value: 'clinica', label: 'Clínicas' },
    { value: 'confeitaria', label: 'Confeitarias' },
    { value: 'consultor', label: 'Consultor' },
    { value: 'medico', label: 'Consultório Médico' },
    { value: 'tatuagem', label: 'Estúdio de Tatuagem' },
    { value: 'fotografo', label: 'Fotógrafos' },
    { value: 'freelancer', label: 'Freelancer' },
    { value: 'jardineiro', label: 'Jardineiros' },
    { value: 'roupas', label: 'Lojas de Roupas' },
    { value: 'mecanica', label: 'Mecânica' },
    { value: 'minimercado', label: 'Minimercados' },
    { value: 'nutricionista', label: 'Nutricionista' },
    { value: 'comercio', label: 'Pequenos Comércios Locais' },
    { value: 'provedor', label: 'Pequenos Provedores de Internet' },
    { value: 'personal', label: 'Personal Trainer' },
    { value: 'petshop', label: 'Pet Shop' },
    { value: 'prestador', label: 'Prestadores de Serviço' },
    { value: 'autonomo', label: 'Profissionais Autônomos' },
    { value: 'professor', label: 'Professor Particular' },
    { value: 'restaurante', label: 'Restaurantes' },
    { value: 'salao', label: 'Salão de Beleza' },
    { value: 'terapeuta', label: 'Terapeuta' },
    { value: 'outro', label: 'Outro' }
  ];

  return (
    <section id="contato" className="py-12 sm:py-16 lg:py-20 gradient-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12 lg:mb-16 w-full">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Pronto para <span className="text-gradient">Transformar</span> Seu Negócio?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-white/90 max-w-3xl mx-auto">
            Comece agora sua jornada digital com a Secode e veja a diferença que a IA pode fazer no crescimento da sua empresa!
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-start">
          {/* Contact Form */}
          <Card className="bg-card shadow-xl border-0">
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-4 sm:mb-6">Solicite sua Solução Personalizada</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nome */}
                <div>
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Seu nome completo"
                    className="mt-2"
                  />
                </div>
                
                {/* Email */}
                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="seu@email.com"
                    className="mt-2"
                  />
                </div>
                
                {/* Phone */}
                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="(11) 99999-9999"
                    className="mt-2"
                  />
                </div>
                
                {/* Business Type */}
                <div>
                  <Label htmlFor="business">Tipo de Negócio</Label>
                  <Select value={formData.business} onValueChange={(value) => handleInputChange('business', value)} required>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Selecione seu tipo de negócio" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Message */}
                <div>
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Conte-nos mais sobre seu negócio e suas necessidades..."
                    className="mt-2"
                  />
                </div>
                
                {/* Submit Button */}
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full gradient-purple text-white py-3 sm:py-4 text-sm sm:text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  <i className="fas fa-paper-plane mr-2"></i>
                  <span className="hidden sm:inline">{isSubmitting ? 'Enviando...' : 'Solicitar Contato'}</span>
                  <span className="sm:hidden">{isSubmitting ? 'Enviando...' : 'Comece Sua Transformação'}</span>
                </Button>
              </form>
            </CardContent>
          </Card>
          
          {/* Contact Information */}
          <div className="space-y-8">
            {/* Main CTA */}
            <Card className="glass border-white/20 text-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Impulsione Seu Negócio: A IA da Secode Transforma Dados em Decisões</h3>
                <p className="text-gray-700 dark:text-white/90 mb-6">
                  Sua empresa busca crescimento e decisões mais inteligentes? A Secode é sua consultoria especializada em Inteligência Artificial, pronta para refinar seus dados e acelerar sua expansão.
                </p>
                
                <div className="space-y-6 mb-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      <i className="fas fa-chart-line text-accent mr-2"></i>
                      Inteligência de Dados para Decisões Precisas
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-white/80">
                      Transforme volumes de dados em insights acionáveis, garantindo escolhas estratégicas e eficazes.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      <i className="fas fa-rocket text-accent mr-2"></i>
                      Crescimento Otimizado e Escalável
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-white/80">
                      Implemente soluções de IA que maximizam sua eficiência operacional e abrem novas avenidas para a expansão do seu negócio.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      <i className="fas fa-users text-accent mr-2"></i>
                      Consultoria Especializada e Suporte Contínuo
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-white/80">
                      Conte com nossa expertise para guiar sua jornada em IA, desde a estratégia até a implementação e otimização.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Contact Details */}
            <Card className="glass border-white/20">
              <CardContent className="p-8">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  <i className="fas fa-headset text-accent mr-3"></i>
                  Contato Direto
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center text-gray-700 dark:text-white/90">
                    <i className="fas fa-phone text-accent mr-4 w-5"></i>
                    <a 
                      href="https://wa.me/551151971617" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                    >
                      (11) 5197-1617
                    </a>
                  </div>

                  <div className="flex items-center text-gray-700 dark:text-white/90">
                    <i className="fas fa-envelope text-accent mr-4 w-5"></i>
                    <span>contato@secode.com.br</span>
                  </div>

                  <div className="flex items-center text-gray-700 dark:text-white/90">
                    <i className="fas fa-map-marker-alt text-accent mr-4 w-5"></i>
                    <span>Barueri, SP - Brasil</span>
                  </div>
                </div>
                
                {/* Social Media */}
                <div className="mt-6 pt-6 border-t border-white/20">
                  <h5 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Siga-nos</h5>
                  <div className="flex space-x-4">
                    <button className="w-10 h-10 gradient-purple rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform duration-300">
                      <i className="fab fa-linkedin"></i>
                    </button>
                    <button className="w-10 h-10 gradient-purple rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform duration-300">
                      <i className="fab fa-instagram"></i>
                    </button>
                    <button className="w-10 h-10 gradient-purple rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform duration-300">
                      <i className="fab fa-facebook"></i>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
