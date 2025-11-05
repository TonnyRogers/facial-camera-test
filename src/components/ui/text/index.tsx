import { ReactNode } from 'react';

const fontWeightClass = {
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  bold: 'font-semibold',
  black: 'font-black',
};

const fontSizeClass = {
  xs: 'text-[4px]',
  sm: 'text-[8px]',
  base: 'text-[16px]',
  lg: 'text-[22px]',
  xl: 'text-[32px]',
};

interface TextProps {
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  weight?: 'light' | 'normal' | 'medium' | 'bold' | 'black';
  extraClasses?: string;
  children: ReactNode;
}

export const Text = ({ children }: TextProps) => {
  return <>{children}</>;
};

const Tag = ({
  children,
  weight = 'normal',
  size = 'base',
  extraClasses,
}: TextProps) => {
  return (
    <>
      <span
        className={`rounded-full p-2 text-xs ${fontWeightClass?.[weight]} ${fontSizeClass?.[size]} ${extraClasses}`}
      >
        {children}
      </span>
    </>
  );
};

const Span = ({
  children,
  weight = 'normal',
  size = 'base',
  extraClasses,
}: TextProps) => {
  return (
    <>
      <span
        className={`${fontWeightClass?.[weight]} ${fontSizeClass?.[size]} ${extraClasses}`}
      >
        {children}
      </span>
    </>
  );
};

const Paragraph = ({
  children,
  weight = 'normal',
  size = 'base',
  extraClasses,
}: TextProps) => {
  return (
    <>
      <p
        className={`text-textColor ${fontWeightClass?.[weight]} ${fontSizeClass?.[size]} ${extraClasses}`}
      >
        {children}
      </p>
    </>
  );
};

const H1 = ({
  children,
  weight = 'normal',
  size = 'base',
  extraClasses,
}: TextProps) => {
  return (
    <>
      <h1
        className={`${fontWeightClass?.[weight]} ${fontSizeClass?.[size]} ${extraClasses}`}
      >
        {children}
      </h1>
    </>
  );
};

const H2 = ({
  children,
  weight = 'normal',
  size = 'base',
  extraClasses,
}: TextProps) => {
  return (
    <>
      <h2
        className={`${fontWeightClass?.[weight]} ${fontSizeClass?.[size]} ${extraClasses}`}
      >
        {children}
      </h2>
    </>
  );
};

const H3 = ({
  children,
  weight = 'normal',
  size = 'base',
  extraClasses,
}: TextProps) => {
  return (
    <>
      <h3
        className={`${fontWeightClass?.[weight]} ${fontSizeClass?.[size]} ${extraClasses}`}
      >
        {children}
      </h3>
    </>
  );
};

const H4 = ({
  children,
  weight = 'normal',
  size = 'base',
  extraClasses,
}: TextProps) => {
  return (
    <>
      <h4
        className={`${fontWeightClass?.[weight]} ${fontSizeClass?.[size]} ${extraClasses}`}
      >
        {children}
      </h4>
    </>
  );
};

const H5 = ({
  children,
  weight = 'normal',
  size = 'base',
  extraClasses,
}: TextProps) => {
  return (
    <>
      <h5
        className={`${fontWeightClass?.[weight]} ${fontSizeClass?.[size]} ${extraClasses}`}
      >
        {children}
      </h5>
    </>
  );
};

const H6 = ({
  children,
  weight = 'normal',
  size = 'base',
  extraClasses,
}: TextProps) => {
  return (
    <>
      <h6
        className={`${fontWeightClass?.[weight]} ${fontSizeClass?.[size]} ${extraClasses}`}
      >
        {children}
      </h6>
    </>
  );
};

Text.Paragraph = Paragraph;
Text.H1 = H1;
Text.H2 = H2;
Text.H3 = H3;
Text.H4 = H4;
Text.H5 = H5;
Text.H6 = H6;
Text.Span = Span;
Text.Tag = Tag;
