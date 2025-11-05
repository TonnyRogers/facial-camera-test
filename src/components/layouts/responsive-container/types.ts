export interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'mobile' | 'tablet' | 'desktop' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  center?: boolean;
}
