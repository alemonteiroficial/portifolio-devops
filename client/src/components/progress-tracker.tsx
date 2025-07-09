import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ProgressStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  estimatedTime: string;
  status: 'pending' | 'in-progress' | 'completed';
}

interface ProgressTrackerProps {
  userProgress?: {
    currentStep: number;
    completedSteps: string[];
  };
}

export default function ProgressTracker({ userProgress }: ProgressTrackerProps) {
  const [currentStep, setCurrentStep] = useState(userProgress?.currentStep || 0);
  const [animatedProgress, setAnimatedProgress] = useState(0);

  const steps: ProgressStep[] = [
    {
      id: 'consultation',
      title: 'Consulta Inicial',
      description: 'Entendemos seu negócio e necessidades específicas',
      icon: 'fas fa-handshake',
      estimatedTime: '30 min',
      status: currentStep > 0 ? 'completed' : currentStep === 0 ? 'in-progress' : 'pending'
    },
    {
      id: 'planning',
      title: 'Planejamento',
      description: 'Criamos o projeto personalizado do seu mini-site',
      icon: 'fas fa-clipboard-list',
      estimatedTime: '2-4 horas',
      status: currentStep > 1 ? 'completed' : currentStep === 1 ? 'in-progress' : 'pending'
    },
    {
      id: 'development',
      title: 'Desenvolvimento',
      description: 'Construímos seu mini-site e configuramos a IA',
      icon: 'fas fa-code',
      estimatedTime: '12-18 horas',
      status: currentStep > 2 ? 'completed' : currentStep === 2 ? 'in-progress' : 'pending'
    },
    {
      id: 'ai-training',
      title: 'Treinamento da IA',
      description: 'Personalizamos o chatbot para seu negócio',
      icon: 'fas fa-robot',
      estimatedTime: '2-4 horas',
      status: currentStep > 3 ? 'completed' : currentStep === 3 ? 'in-progress' : 'pending'
    },
    {
      id: 'testing',
      title: 'Testes e Ajustes',
      description: 'Validamos tudo antes do lançamento',
      icon: 'fas fa-check-circle',
      estimatedTime: '1-2 horas',
      status: currentStep > 4 ? 'completed' : currentStep === 4 ? 'in-progress' : 'pending'
    },
    {
      id: 'launch',
      title: 'Lançamento',
      description: 'Seu mini-site está no ar e funcionando!',
      icon: 'fas fa-rocket',
      estimatedTime: '1 hora',
      status: currentStep > 5 ? 'completed' : currentStep === 5 ? 'in-progress' : 'pending'
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress((currentStep / (steps.length - 1)) * 100);
    }, 100);
    return () => clearTimeout(timer);
  }, [currentStep, steps.length]);

  const getStepStatus = (index: number) => {
    if (index < currentStep) return 'completed';
    if (index === currentStep) return 'in-progress';
    return 'pending';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-500 bg-green-500';
      case 'in-progress':
        return 'text-primary bg-primary';
      case 'pending':
        return 'text-muted-foreground bg-muted';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const simulateProgress = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const resetProgress = () => {
    setCurrentStep(0);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-6 lg:p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-foreground">
              Sua Jornada de Digitalização
            </h3>
            <div className="text-sm text-muted-foreground">
              {currentStep + 1} de {steps.length} etapas
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="relative mb-6">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${animatedProgress}%` }}
              />
            </div>
            <div className="absolute -top-1 right-0 text-xs text-primary font-medium">
              {Math.round(animatedProgress)}%
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-6">
          {steps.map((step, index) => {
            const status = getStepStatus(index);
            const statusColors = getStatusColor(status);
            
            return (
              <div
                key={step.id}
                className={`relative flex items-start gap-4 p-4 rounded-lg transition-all duration-300 ${
                  status === 'in-progress' 
                    ? 'bg-primary/5 border border-primary/20' 
                    : status === 'completed'
                    ? 'bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800'
                    : 'bg-muted/30'
                }`}
              >
                {/* Step Icon */}
                <div className={`
                  relative z-10 w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300
                  ${status === 'completed' 
                    ? 'border-green-500 bg-green-500' 
                    : status === 'in-progress'
                    ? 'border-primary bg-primary animate-pulse'
                    : 'border-muted bg-muted'
                  }
                `}>
                  <i className={`${step.icon} text-white text-lg`}></i>
                </div>

                {/* Step Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className={`font-semibold ${
                      status === 'completed' ? 'text-green-700 dark:text-green-400' 
                      : status === 'in-progress' ? 'text-primary' 
                      : 'text-muted-foreground'
                    }`}>
                      {step.title}
                    </h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      status === 'completed' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                      : status === 'in-progress' ? 'bg-primary/10 text-primary'
                      : 'bg-muted text-muted-foreground'
                    }`}>
                      {step.estimatedTime}
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">
                    {step.description}
                  </p>

                  {/* Status Indicator */}
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      status === 'completed' ? 'bg-green-500' 
                      : status === 'in-progress' ? 'bg-primary animate-pulse'
                      : 'bg-muted-foreground/50'
                    }`} />
                    <span className="text-xs font-medium">
                      {status === 'completed' ? 'Concluído' 
                       : status === 'in-progress' ? 'Em Andamento'
                       : 'Pendente'}
                    </span>
                  </div>
                </div>

                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <div className={`
                    absolute left-6 top-16 w-0.5 h-6 transition-colors duration-300
                    ${status === 'completed' ? 'bg-green-500' : 'bg-muted'}
                  `} />
                )}
              </div>
            );
          })}
        </div>

        {/* Demo Controls */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex gap-4 justify-center">
            <Button
              onClick={simulateProgress}
              disabled={currentStep >= steps.length - 1}
              className="px-6"
            >
              <i className="fas fa-play mr-2"></i>
              Próxima Etapa
            </Button>
            <Button
              onClick={resetProgress}
              variant="outline"
              className="px-6"
            >
              <i className="fas fa-redo mr-2"></i>
              Reiniciar
            </Button>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-2">
            Demonstração - Use os botões para simular o progresso
          </p>
        </div>
      </CardContent>
    </Card>
  );
}