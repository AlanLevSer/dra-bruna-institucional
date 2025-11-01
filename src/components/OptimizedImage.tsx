import { ImgHTMLAttributes } from 'react';

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  sizes?: string;
}

export const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  priority = false,
  sizes,
  className,
  ...props
}: OptimizedImageProps) => {
  const imgProps: React.ImgHTMLAttributes<HTMLImageElement> = {
    src,
    alt,
    width,
    height,
    loading: priority ? 'eager' : 'lazy',
    decoding: priority ? 'sync' : 'async',
    className,
    sizes: sizes ?? "100vw",
    ...(priority && { fetchPriority: 'high' as const }),
    ...props,
  };

  return <img {...imgProps} />;
};
