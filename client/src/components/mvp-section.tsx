import { Card, CardContent } from '@/components/ui/card';
import logoIcon from '@assets/Logo_Secode_roxo_horiz_400px_1750608624303.png';

export default function MvpSection() {
  const features = [
    {
      icon: 'fas fa-globe',
      title: 'Mini-Site Profissional',
      description: 'Sua vitrine online simples e eficaz para atrair e converter clientes com design moderno e responsivo.'
    },
    {
      icon: 'secode-logo',
      title: 'Atendimento AI Personalizado',
      description: 'Chatbot inteligente que entende, responde e interage com seus clientes 24/7 de forma natural.'
    },
    {
      icon: 'fas fa-calendar-alt',
      title: 'Agendamento Inteligente',
      description: 'Clientes agendam facilmente, você gerencia sem complicação e otimiza seu tempo automaticamente.'
    }
  ];

  return (
    <section id="produtos" className="py-12 sm:py-16 lg:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 w-full">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            O que é o Nosso PDE:{' '}
            <span className="text-gradient">Presença Digital Essencial</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            A primeira e fundamental camada de serviço da Secode: um mini-site profissional com IA integrada e sistema de agendamento inteligente.
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="card-hover bg-card shadow-lg border hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 flex items-center justify-center">
                  {feature.icon === 'secode-logo' ? (
                    <img 
                      src={logoIcon} 
                      alt="Secode Logo" 
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="w-full h-full gradient-purple rounded-lg flex items-center justify-center">
                      <i className={`${feature.icon} text-white text-xl sm:text-2xl`}></i>
                    </div>
                  )}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-card-foreground mb-3 sm:mb-4">{feature.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Flow Demo Section */}
        <Card className="bg-card shadow-xl border mb-12">
          <CardContent className="p-8">
            <h3 className="text-2xl font-semibold text-card-foreground text-center mb-6">Como Funciona na Prática</h3>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              Veja o fluxo completo: do primeiro contato do cliente até o agendamento confirmado
            </p>

            {/* Flow Steps */}
            <div className="grid lg:grid-cols-4 gap-8">
              <div className="text-center relative">
                <div className="w-16 h-16 gradient-purple rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h4 className="font-semibold text-card-foreground mb-3">Cliente Acessa</h4>
                <p className="text-sm text-muted-foreground mb-4">Visita seu mini-site profissional</p>
                <div className="bg-gradient-to-br from-purple-900/10 to-black/20 rounded-lg p-4 border border-purple-500/20">
                  <i className="fas fa-globe text-purple-400 text-2xl mb-2"></i>
                  <p className="text-xs text-muted-foreground">Site responsivo e profissional</p>
                </div>
                {/* Arrow */}
                <div className="hidden lg:block absolute top-8 right-0 transform translate-x-1/2">
                  <i className="fas fa-arrow-right text-purple-400 text-xl"></i>
                </div>
              </div>
              
              <div className="text-center relative">
                <div className="w-16 h-16 gradient-purple rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h4 className="font-semibold text-card-foreground mb-3">IA Interage</h4>
                <p className="text-sm text-muted-foreground mb-4">Chatbot responde dúvidas automaticamente</p>
                <div className="bg-gradient-to-br from-purple-900/10 to-black/20 rounded-lg p-4 border border-purple-500/20">
                  <div className="w-8 h-8 mx-auto mb-2">
                    <img 
                      src={logoIcon} 
                      alt="Secode Logo" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Atendimento 24/7 inteligente</p>
                </div>
                {/* Arrow */}
                <div className="hidden lg:block absolute top-8 right-0 transform translate-x-1/2">
                  <i className="fas fa-arrow-right text-purple-400 text-xl"></i>
                </div>
              </div>
              
              <div className="text-center relative">
                <div className="w-16 h-16 gradient-purple rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h4 className="font-semibold text-card-foreground mb-3">Cliente Agenda</h4>
                <p className="text-sm text-muted-foreground mb-4">Sistema de agendamento inteligente</p>
                <div className="bg-gradient-to-br from-purple-900/10 to-black/20 rounded-lg p-4 border border-purple-500/20">
                  <i className="fas fa-calendar-alt text-purple-400 text-2xl mb-2"></i>
                  <p className="text-xs text-muted-foreground">Agendamento automático</p>
                </div>
                {/* Arrow */}
                <div className="hidden lg:block absolute top-8 right-0 transform translate-x-1/2">
                  <i className="fas fa-arrow-right text-purple-400 text-xl"></i>
                </div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 gradient-purple rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">4</span>
                </div>
                <h4 className="font-semibold text-card-foreground mb-3">Você Recebe</h4>
                <p className="text-sm text-muted-foreground mb-4">Notificação automática e gestão simplificada</p>
                <div className="bg-gradient-to-br from-purple-900/10 to-black/20 rounded-lg p-4 border border-purple-500/20">
                  <i className="fas fa-bell text-purple-400 text-2xl mb-2"></i>
                  <p className="text-xs text-muted-foreground">Gestão automatizada</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>




      </div>
    </section>
  );
}
