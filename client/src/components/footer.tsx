import { scrollToElement } from '@/lib/utils';
import logoSecode from '@assets/Logo_Secode_roxo_horiz_400px_1750608624303.png';

export default function Footer() {
  const quickLinks = [
    { label: 'Início', href: 'home' },
    { label: 'Produtos', href: 'produtos' },
    { label: 'Benefícios', href: 'beneficios' },
    { label: 'Para Quem', href: 'para-quem' },
    { label: 'Contato', href: 'contato' }
  ];

  const legalLinks = [
    { label: 'Política de Privacidade', href: '#' },
    { label: 'Termos de Uso', href: '#' },
    { label: 'Cookies', href: '#' },
    { label: 'Suporte', href: '#' }
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <img 
                src={logoSecode} 
                alt="Secode Logo" 
                className="h-8 w-auto object-contain"
              />
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Transformando pequenos negócios com soluções inteligentes de IA e presença digital profissional.
            </p>
            <div className="text-sm text-muted-foreground space-y-4">
              <div>
                <p className="font-semibold text-foreground mb-2">Contato</p>
                <p>Telefone: <a 
                  href="https://wa.me/551151971617" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors duration-200"
                >
                  (11) 5197-1617
                </a></p>
                <p>E-mail: contato@secode.com.br</p>
                <p>CNPJ: 53.520.156/0001-60</p>
              </div>
              
              <div>
                <p className="font-semibold text-foreground mb-2">Sede - São Paulo</p>
                <p>Alameda Rio Negro, 503, Sala 2020</p>
                <p>Alphaville, Barueri - SP</p>
                <p>CEP: 06454-000</p>
              </div>
              
              <div>
                <p className="font-semibold text-foreground mb-2">Filial - Paraná</p>
                <p>Estrada da Perobinha, Km 06</p>
                <p>Bairro Gleba Alegre</p>
                <p>Cidade Marialva - PR</p>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToElement(link.href)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground">
            © 2024 Secode. Todos os direitos reservados. Feito para trazer excelência na transformação digital.
          </p>
        </div>
      </div>
    </footer>
  );
}
