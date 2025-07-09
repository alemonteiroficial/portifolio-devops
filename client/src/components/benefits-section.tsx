export default function BenefitsSection() {
  const benefits = [
    {
      icon: 'fas fa-clock',
      title: 'Mais Tempo Livre',
      description: 'Deixe a IA cuidar das tarefas repetitivas e foque no crescimento do seu negócio.'
    },
    {
      icon: 'fas fa-moon',
      title: 'Atendimento 24/7',
      description: 'Seu negócio nunca fecha, sua IA sempre atende e converte leads em qualquer horário.'
    },
    {
      icon: 'fas fa-star',
      title: 'Presença Profissional',
      description: 'Impressione clientes com um site moderno e funcional, transmitindo credibilidade.'
    },
    {
      icon: 'fas fa-rocket',
      title: 'Foco no Seu Negócio',
      description: 'Menos burocracia, mais tempo para o que você faz de melhor: atender seus clientes.'
    },
    {
      icon: 'fas fa-heart',
      title: 'Clientes Satisfeitos',
      description: 'Agilidade, informação e conveniência ao alcance dos seus clientes sempre.'
    },
    {
      icon: 'fas fa-chart-line',
      title: 'Crescimento Escalável',
      description: 'Solução que cresce junto com seu negócio, sem limitações de horário ou capacidade.'
    }
  ];

  return (
    <section id="beneficios" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Por que Escolher a <span className="text-gradient">Secode</span> para seu Negócio?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transforme a forma como você atende seus clientes e gerencie seu tempo com nossa solução inteligente.
          </p>
        </div>
        
        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center group">
              <div className="w-20 h-20 gradient-purple rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <i className={`${benefit.icon} text-white text-2xl`}></i>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
