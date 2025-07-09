import { Card, CardContent } from '@/components/ui/card';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Maria Silva',
      business: 'Salão de Beleza',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100',
      text: 'Depois da Secode, meu salão nunca mais perdeu um cliente por falta de atendimento. A IA responde tudo perfeitamente e os agendamentos ficaram muito mais organizados!'
    },
    {
      name: 'João Santos',
      business: 'Consultor Financeiro',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100',
      text: 'A presença digital que eu precisava! Agora tenho mais tempo para focar nas consultorias enquanto a IA cuida do primeiro contato com os clientes.'
    },
    {
      name: 'Ana Costa',
      business: 'Terapeuta Holística',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100',
      text: 'Incrível como a solução da Secode entende perfeitamente o que meus clientes precisam. Meu negócio ficou muito mais profissional e acessível.'
    }
  ];

  return (
    <section className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            O que Nossos <span className="text-gradient">Clientes</span> Dizem
          </h2>
          <p className="text-xl text-muted-foreground">Histórias reais de transformação digital com a Secode</p>
        </div>
        
        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="card-hover bg-card shadow-lg border hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <img 
                    src={testimonial.avatar}
                    alt={`Cliente ${testimonial.name}`}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-card-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.business}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fas fa-star text-yellow-400"></i>
                  ))}
                </div>
                <p className="text-muted-foreground italic">"{testimonial.text}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
