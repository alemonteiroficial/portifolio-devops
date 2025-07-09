import { Button } from '@/components/ui/button';
import { scrollToElement } from '@/lib/utils';

export default function HeroSection() {
  return (
    <section id="home" className="pt-16 min-h-screen gradient-bg flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Hero Content */}
          <div className="text-center lg:text-left animate-slide-up w-full">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-3 sm:mb-4 md:mb-6 leading-tight">
              Seu Negócio Online e{' '}
              <span className="text-gradient">Atendendo 24h</span>
              : Sem Esforço, Com IA
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-4 sm:mb-6 md:mb-8 leading-relaxed">
              Oferecemos mini-sites profissionais com atendimento AI personalizado e agendamento inteligente para pequenos empreendedores.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-center w-full">
              <Button 
                size="lg"
                onClick={() => scrollToElement('contato')}
                className="gradient-purple text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold hover:scale-105 transition-all duration-300 shadow-xl w-full sm:w-auto max-w-xs sm:max-w-none"
              >
                <i className="fas fa-rocket mr-2 text-sm"></i>
                <span className="hidden sm:inline">Experimente o Atendimento AI Start</span>
                <span className="sm:hidden">Experimente AI Start</span>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => scrollToElement('produtos')}
                className="border-2 border-foreground text-foreground px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold hover:bg-foreground hover:text-background transition-all duration-300 w-full sm:w-auto max-w-xs sm:max-w-none"
              >
                Saiba Mais
              </Button>
            </div>
          </div>
          
          {/* Hero Visual */}
          <div className="relative animate-fade-in">
            <div className="relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Interface moderna de chatbot AI" 
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
            
            {/* Floating elements for visual appeal */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent rounded-full opacity-20 animate-bounce-gentle"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary rounded-full opacity-30 animate-bounce-gentle" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
      </div>
    </section>
  );
}
