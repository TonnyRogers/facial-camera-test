import React, { ReactNode } from 'react';
import { Logo } from '@/components/ui/logo';
import { ResponsiveContainer } from '@/components/layouts';
import { cn } from '@/lib/utils';

interface TitlePageProps {
  title?: string;
  description?: string | ReactNode;
  className?: string;
  children?: ReactNode;
  bgVariant?: keyof typeof bgVariants;
}

const bgVariants = {
  default: 'bg-background-cream',
  white: 'bg-white',
};

export const TitlePage: React.FC<TitlePageProps> = ({
  title,
  description,
  className = '',
  bgVariant = 'default',
  children,
}) => {
  // const navigate = useNavigate();
  return (
    <div className={cn(bgVariants[bgVariant], className)}>
      <ResponsiveContainer maxWidth="desktop" padding="lg">
        <div className="flex flex-col">
          <div onClick={() => {}}>
            <Logo className="mb-10 cursor-pointer" />
          </div>

          {children ? (
            children
          ) : (
            <>
              <h1 className="mb-2 text-2xl font-bold desktop:text-3xl text-text-primary">
                {title}
              </h1>

              {typeof description === 'string' ? (
                <p className="text-base desktop:mb-2 text-text-primary">
                  {description}
                </p>
              ) : (
                description
              )}
            </>
          )}
        </div>
      </ResponsiveContainer>
    </div>
  );
};
