import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const techLogos = [
  {
    name: "OpenAI GPT",
    icon: "https://static.vecteezy.com/system/resources/previews/021/059/827/non_2x/chatgpt-logo-chat-gpt-icon-on-white-background-free-vector.jpg",
    description: "Powered by GPT-4 and advanced language models"
  },
  {
    name: "Google Gemini",
    icon: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg",
    description: "Integração com Google Gemini AI"
  },
  {
    name: "Azure AI Foundry",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
    description: "Plataforma Azure AI Foundry para desenvolvimento"
  },
  {
    name: "Amazon Bedrock",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    description: "Soluções AWS Bedrock para IA empresarial"
  },
  {
    name: "Meta AI",
    icon: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
    description: "Tecnologia Meta AI para automação"
  },
  {
    name: "Anthropic Claude",
    icon: "https://avatars.githubusercontent.com/u/100204830?s=200&v=4",
    description: "Claude AI para processamento avançado"
  },
  {
    name: "Hugging Face",
    icon: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg",
    description: "Modelos open-source Hugging Face"
  },
  {
    name: "Stability AI",
    icon: "https://avatars.githubusercontent.com/u/100950301?s=200&v=4",
    description: "Stable Diffusion e geração de conteúdo"
  }
];

export default function TechLogosSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % techLogos.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Powered by <span className="text-gradient">Leading AI Technologies</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Utilizamos as mais avançadas tecnologias de Inteligência Artificial para entregar soluções de excelência
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Logos Container */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-1000 ease-in-out"
              style={{ 
                transform: `translateX(-${currentIndex * (100 / techLogos.length)}%)`,
                width: `${techLogos.length * 100}%`
              }}
            >
              {techLogos.map((tech, index) => (
                <div key={tech.name} className="flex-shrink-0 px-4" style={{ width: `${100 / techLogos.length}%` }}>
                  <Card className="card-hover bg-card/50 backdrop-blur-sm border-2 border-purple-200/20 hover:border-purple-400/40 transition-all duration-300 h-full">
                    <CardContent className="p-4 text-center">
                      <div className="flex justify-center mb-2">
                        <div className="w-12 h-12 p-2 bg-white rounded-lg shadow-md flex items-center justify-center">
                          <img 
                            src={tech.icon}
                            alt={tech.name}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              // Fallback SVG se a imagem não carregar
                              e.currentTarget.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iOCIgZmlsbD0iIzlDNEREQyIvPgo8cGF0aCBkPSJNMjQgMjBIMjhWMjRIMjRWMjBaTTI0IDI4SDI4VjMySDI0VjI4Wk0yNCAzNkgyOFY0MEgyNFYzNloiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0zMiAyMEgzNlYyNEgzMlYyMFpNMzIgMjhIMzZWMzJIMzJWMjhaTTMyIDM2SDM2VjQwSDMyVjM2WiIgZmlsbD0id2hpdGUiLz4KPHA+IDQwSDM2VjQ0SDQwVjQwWk0zNiAyOEg0MFYzMkgzNlYyOFpNMzYgMjBINDBWMjRIMzZWMjBaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K";
                            }}
                          />
                        </div>
                      </div>
                      <h3 className="font-semibold text-card-foreground text-sm mb-1">
                        {tech.name}
                      </h3>
                      <p className="text-muted-foreground text-xs leading-tight">
                        {tech.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Indicadores de navegação */}
          <div className="flex justify-center space-x-2 mt-6">
            {techLogos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-purple-600 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400 hover:scale-110'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom text */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground text-lg">
            Combinamos o melhor da tecnologia mundial para criar soluções únicas para seu negócio
          </p>
        </div>
      </div>
    </section>
  );
}