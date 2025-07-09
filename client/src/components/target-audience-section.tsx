import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { scrollToElement } from '@/lib/utils';

export default function TargetAudienceSection() {
  const targetAudience = [
    { icon: 'fas fa-cut', title: 'Salões de Beleza' },
    { icon: 'fas fa-spa', title: 'Terapeutas' },
    { icon: 'fas fa-user-tie', title: 'Consultores' },
    { icon: 'fas fa-paw', title: 'Pet Shops' },
    { icon: 'fas fa-chalkboard-teacher', title: 'Professores Particulares' },
    { icon: 'fas fa-palette', title: 'Artesãos' },
    { icon: 'fas fa-laptop', title: 'Freelancers' },
    { icon: 'fas fa-store', title: 'Pequenos Comércios' },
    { icon: 'fas fa-paint-brush', title: 'Estúdio de Tatuagem' },
    { icon: 'fas fa-wrench', title: 'Mecânica' },
    { icon: 'fas fa-car', title: 'Autopeças' },
    { icon: 'fas fa-tshirt', title: 'Lojas de Roupas' },
    { icon: 'fas fa-utensils', title: 'Restaurantes' },
    { icon: 'fas fa-birthday-cake', title: 'Confeitarias' },
    { icon: 'fas fa-stethoscope', title: 'Clínicas' },
    { icon: 'fas fa-balance-scale', title: 'Advocacias' },
    { icon: 'fas fa-user-md', title: 'Consultório Médico' },
    { icon: 'fas fa-apple-alt', title: 'Nutricionista' },
    { icon: 'fas fa-dumbbell', title: 'Personal Trainer' },
    { icon: 'fas fa-running', title: 'Academia' },
    { icon: 'fas fa-shopping-basket', title: 'Minimercados' },
    { icon: 'fas fa-coffee', title: 'Cafeterias' },
    { icon: 'fas fa-seedling', title: 'Jardineiros' },
    { icon: 'fas fa-user-cog', title: 'Profissionais Autônomos' },
    { icon: 'fas fa-tools', title: 'Prestadores de Serviço' },
    { icon: 'fas fa-wifi', title: 'Pequenos Provedores de Internet' },
    { icon: 'fas fa-camera', title: 'Fotógrafos' }
  ];

  return (
    <section id="para-quem" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Ideal para <span className="text-gradient">Empreendedores</span> como Você!
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Nossa solução foi pensada especialmente para pequenos negócios que precisam de presença digital profissional.
          </p>
        </div>
        
        {/* Target Audience Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
          {targetAudience.map((audience, index) => (
            <Card key={index} className="card-hover bg-card shadow-lg border hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 gradient-purple rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className={`${audience.icon} text-white text-xl`}></i>
                </div>
                <h3 className="font-semibold text-card-foreground text-sm">{audience.title}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-6">Se você se identificou com algum desses perfis, a Secode é para você!</p>
          <Button 
            size="lg"
            onClick={() => scrollToElement('contato')}
            className="gradient-purple text-white px-8 py-4 text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-xl"
          >
            <i className="fas fa-rocket mr-2"></i>
            Comece Sua Transformação Digital
          </Button>
        </div>
      </div>
    </section>
  );
}
