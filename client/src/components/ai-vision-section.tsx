import { useState, useEffect } from 'react';

export default function AIVisionSection() {
  const [barHeights, setBarHeights] = useState([40, 70, 85, 95]);
  const [animationKey, setAnimationKey] = useState(0);

  const generateRandomHeights = () => {
    return [
      Math.floor(Math.random() * 60) + 30, // 30-90%
      Math.floor(Math.random() * 60) + 30, // 30-90%
      Math.floor(Math.random() * 60) + 30, // 30-90%
      Math.floor(Math.random() * 60) + 30  // 30-90%
    ];
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setBarHeights(generateRandomHeights());
      setAnimationKey(prev => prev + 1);
    }, 7000); // Reset every 7 seconds (after animation completes)

    return () => clearInterval(interval);
  }, []);
  const pillars = [
    {
      icon: 'fas fa-magic',
      title: 'Automação Inteligente',
      description: 'Otimize processos e liberte sua equipe para o estratégico com soluções de IA que automatizam tarefas repetitivas e complexas.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: 'fas fa-chart-pie',
      title: 'Análise de Dados',
      description: 'Transforme dados brutos em insights acionáveis para decisões melhores utilizando algoritmos de Machine Learning avançados.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: 'fas fa-globe',
      title: 'Presença Digital Dinâmica',
      description: 'Crie canais digitais inteligentes que engajam e convertem usando Large Language Models (LLM) e Generative AI applications.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: 'fas fa-user-cog',
      title: 'Otimização de Experiência',
      description: 'Personalize a interação com seus clientes em cada ponto de contato através de AI-powered automation e LLM orchestration.',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <section id="nossa-visao-ia" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Como a <span className="text-gradient">IA</span> Transforma Negócios
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              A <abbr title="Inteligência Artificial" className="no-underline font-semibold text-primary">Inteligência Artificial</abbr> aplicada a negócios não é mais o futuro - é o presente. 
              Na Secode, desenvolvemos soluções de IA que resolvem problemas reais, aumentam a eficiência e criam vantagens competitivas sustentáveis para empresas de todos os tamanhos.
            </p>
          </div>

          {/* Pillars Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {pillars.map((pillar, index) => (
              <div key={index} className="group">
                <div className="bg-card border border-border rounded-xl p-6 h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${pillar.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <i className={`${pillar.icon} text-white text-xl`}></i>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Impact Visualization */}
          <div className="bg-gradient-to-r from-primary/5 via-background to-primary/5 rounded-2xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-6">
                  O Impacto da IA em Números
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                      <i className="fas fa-arrow-up text-white"></i>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">85%</div>
                      <div className="text-muted-foreground">Redução no tempo de processos manuais</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <i className="fas fa-chart-line text-white"></i>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">300%</div>
                      <div className="text-muted-foreground">Aumento na qualidade das decisões baseadas em dados</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <i className="fas fa-users text-white"></i>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">24/7</div>
                      <div className="text-muted-foreground">Atendimento automatizado inteligente</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Visual Chart */}
              <div className="relative">
                <div className="w-full h-64 bg-gradient-to-t from-primary/20 to-transparent rounded-lg relative overflow-hidden">
                  {/* Animated bars representing growth */}
                  <div className="absolute bottom-0 left-0 w-full h-full flex items-end justify-center gap-4 p-4">
                    <div 
                      key={`bar-1-${animationKey}`}
                      className="bg-gradient-to-t from-blue-500 to-blue-400 w-12 rounded-t-lg animate-grow-bar" 
                      style={{height: `${barHeights[0]}%`, animationDelay: '0.8s'}}
                    ></div>
                    <div 
                      key={`bar-2-${animationKey}`}
                      className="bg-gradient-to-t from-green-500 to-green-400 w-12 rounded-t-lg animate-grow-bar" 
                      style={{height: `${barHeights[1]}%`, animationDelay: '2.5s'}}
                    ></div>
                    <div 
                      key={`bar-3-${animationKey}`}
                      className="bg-gradient-to-t from-purple-500 to-purple-400 w-12 rounded-t-lg animate-grow-bar" 
                      style={{height: `${barHeights[2]}%`, animationDelay: '4.2s'}}
                    ></div>
                    <div 
                      key={`bar-4-${animationKey}`}
                      className="bg-gradient-to-t from-orange-500 to-orange-400 w-12 rounded-t-lg animate-grow-bar" 
                      style={{height: `${barHeights[3]}%`, animationDelay: '5.9s'}}
                    ></div>
                  </div>
                  
                  {/* Floating AI elements */}
                  <div className="absolute top-4 right-4 bg-primary/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-primary animate-float">
                    AI Growth
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}