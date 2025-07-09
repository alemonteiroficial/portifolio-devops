import { Button } from '@/components/ui/button';
import { scrollToElement } from '@/lib/utils';
import { Link } from 'wouter';

export default function AIHeroSection() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-16 sm:mt-8 lg:mt-0">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                <span className="text-gradient">A Secode Guia Sua Empresa</span>
                <br />
                <span className="text-foreground">na Jornada da</span>
                <br />
                <span className="text-gradient">Inteligência Artificial</span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-muted-foreground mb-8 leading-relaxed">
                Transformamos desafios em oportunidades com soluções de 
                <abbr title="Inteligência Artificial" className="no-underline font-semibold text-primary"> IA</abbr> 
                {' '}intuitivas e eficazes
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/produtos">
                  <Button 
                    size="lg"
                    className="gradient-purple text-white px-8 py-4 text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    <i className="fas fa-rocket mr-2"></i>
                    Explore Nossos Produtos AI
                  </Button>
                </Link>
                
                <Button 
                  onClick={() => scrollToElement('nossa-visao-ia')}
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 text-lg font-semibold border-2 hover:scale-105 transition-all duration-300"
                >
                  <i className="fas fa-brain mr-2"></i>
                  Nossa Visão em IA
                </Button>
              </div>
            </div>
            
            {/* Visual Element */}
            <div className="relative">
              <div className="w-full max-w-lg mx-auto relative">
                {/* AI Network Illustration */}
                <div className="relative h-96 w-full">
                  {/* Central AI Brain */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                    <i className="fas fa-brain text-white text-2xl"></i>
                  </div>
                  
                  {/* Connecting Nodes */}
                  <div className="absolute top-8 left-8 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                    <i className="fas fa-database text-white"></i>
                  </div>
                  
                  <div className="absolute top-8 right-8 w-16 h-16 bg-gradient-to-br from-green-500 to-green-400 rounded-full flex items-center justify-center shadow-lg animate-bounce" style={{animationDelay: '0.5s'}}>
                    <i className="fas fa-cogs text-white"></i>
                  </div>
                  
                  <div className="absolute bottom-8 left-8 w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-400 rounded-full flex items-center justify-center shadow-lg animate-bounce" style={{animationDelay: '1s'}}>
                    <i className="fas fa-chart-line text-white"></i>
                  </div>
                  
                  <div className="absolute bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-400 rounded-full flex items-center justify-center shadow-lg animate-bounce" style={{animationDelay: '1.5s'}}>
                    <i className="fas fa-users text-white"></i>
                  </div>
                  
                  {/* Connection Lines */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                    <defs>
                      <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgb(147, 51, 234)" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="rgb(147, 51, 234)" stopOpacity="0.2" />
                      </linearGradient>
                    </defs>
                    
                    {/* Lines connecting center to nodes */}
                    <line x1="200" y1="200" x2="72" y2="72" stroke="url(#line-gradient)" strokeWidth="2" className="animate-pulse" />
                    <line x1="200" y1="200" x2="328" y2="72" stroke="url(#line-gradient)" strokeWidth="2" className="animate-pulse" />
                    <line x1="200" y1="200" x2="72" y2="328" stroke="url(#line-gradient)" strokeWidth="2" className="animate-pulse" />
                    <line x1="200" y1="200" x2="328" y2="328" stroke="url(#line-gradient)" strokeWidth="2" className="animate-pulse" />
                  </svg>
                </div>
                
                {/* Floating AI Keywords */}
                <div className="absolute top-2 left-2 bg-primary/10 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-primary animate-float">
                  Machine Learning
                </div>
                <div className="absolute top-2 right-2 bg-primary/10 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-primary animate-float" style={{animationDelay: '1s'}}>
                  LLM
                </div>
                <div className="absolute bottom-2 left-2 bg-primary/10 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-primary animate-float" style={{animationDelay: '2s'}}>
                  Automation
                </div>
                <div className="absolute bottom-2 right-2 bg-primary/10 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-primary animate-float" style={{animationDelay: '0.5s'}}>
                  Analytics
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <i className="fas fa-chevron-down text-muted-foreground text-xl"></i>
      </div>
    </section>
  );
}