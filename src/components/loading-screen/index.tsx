import { colors } from '@/theme';
import { Oval } from 'react-loader-spinner';

export const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-white backdrop-blur-sm z-40 flex h-dvh w-full flex-col items-center justify-center gap-2">
      <Oval
        width={20}
        height={20}
        strokeWidth={8}
        color={colors.brand.primary}
        secondaryColor={colors.brand.secondary}
      />
      <h1 className="font-semibold text-brand-500">Carregando...</h1>
    </div>
  );
};
