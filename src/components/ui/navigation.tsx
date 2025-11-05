import { useNavigate } from 'react-router-dom';
import { Button } from './button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface NavigationProps {
  nextRoute?: string;
  previousRoute?: string;
  nextLabel?: string;
  previousLabel?: string;
  onNext?: () => void;
  onPrevious?: () => void;
  nextDisabled?: boolean;
  previousDisabled?: boolean;
  showNext?: boolean;
  showPrevious?: boolean;
  className?: string;
}

export function Navigation({
  nextRoute,
  previousRoute,
  nextLabel = 'Avançar',
  previousLabel = 'Voltar',
  onNext,
  onPrevious,
  nextDisabled = false,
  previousDisabled = false,
  showNext = true,
  showPrevious = true,
  className = '',
}: NavigationProps) {
  const navigate = useNavigate();

  const handleNext = () => {
    if (onNext) {
      onNext();
    } else if (nextRoute) {
      navigate(nextRoute);
    }
  };

  const handlePrevious = () => {
    if (onPrevious) {
      onPrevious();
    } else if (previousRoute) {
      navigate(previousRoute);
    }
  };

  return (
    <div className={`flex justify-between items-center gap-4 ${className}`}>
      {showPrevious ? (
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={previousDisabled}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          {previousLabel}
        </Button>
      ) : (
        <div /> // Placeholder para manter o espaçamento
      )}

      {showNext && (
        <Button
          variant="primary"
          onClick={handleNext}
          disabled={nextDisabled}
          className="flex items-center gap-2"
        >
          {nextLabel}
          <ArrowRight className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}

// Hook para facilitar o uso da navegação com o fluxo definido
export function useFlowNavigation() {
  const flowRoutes = [
    '/login',
    '/company-selection',
    '/health-declaration',
    '/schedule-interview',
    '/facial-verification',
    '/contract-signature',
    '/proposal-acceptance',
    '/beneficiaries',
    '/success',
  ];

  const getCurrentRouteIndex = (currentPath: string) => {
    return flowRoutes.findIndex(route =>
      currentPath.includes(route.replace('/', ''))
    );
  };

  const getNavigationRoutes = (currentPath: string) => {
    const currentIndex = getCurrentRouteIndex(currentPath);

    return {
      previousRoute:
        currentIndex > 0 ? flowRoutes[currentIndex - 1] : undefined,
      nextRoute:
        currentIndex < flowRoutes.length - 1
          ? flowRoutes[currentIndex + 1]
          : undefined,
      currentIndex,
      totalSteps: flowRoutes.length,
    };
  };

  return { getNavigationRoutes, flowRoutes };
}
