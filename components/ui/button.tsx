import { TextClassContext } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Platform, Pressable, View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

const buttonVariants = cva(
  cn(
    'group relative shrink-0 flex-row items-center justify-center gap-1.5 overflow-hidden rounded-4xl border border-transparent',
    Platform.select({
      web: 'whitespace-nowrap outline-none transition-all select-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 active:translate-y-px disabled:pointer-events-none [&_svg:not([class*=size-])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0',
    })
  ),
  {
    variants: {
      variant: {
        default: 'bg-primary',
        brand: 'bg-brand',
        outline: cn(
          'border-border bg-input/30',
          Platform.select({ web: 'hover:bg-input/50' })
        ),
        secondary: cn(
          'bg-secondary',
          Platform.select({ web: 'hover:bg-secondary/80' })
        ),
        ghost: cn(
          'bg-transparent',
          Platform.select({ web: 'hover:bg-muted hover:text-foreground' })
        ),
        destructive: 'bg-destructive-strong',
        'secondary-destructive': cn(
          'bg-destructive/10',
          Platform.select({ web: 'hover:bg-destructive/20' })
        ),
        link: cn(
          'bg-transparent text-primary underline-offset-4',
          Platform.select({ web: 'hover:underline' })
        ),
      },
      size: {
        default: 'h-9 px-3',
        xs: 'h-6 gap-1 px-2.5',
        sm: 'h-8 px-3',
        lg: 'h-10 px-4',
        icon: 'size-9',
        'icon-xs': 'size-6',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const buttonTextVariants = cva('text-sm font-medium', {
  variants: {
    variant: {
      default: 'text-primary-foreground',
      brand: 'text-brand-foreground',
      outline: 'text-foreground',
      secondary: 'text-secondary-foreground',
      ghost: 'text-foreground',
      destructive: 'text-white',
      'secondary-destructive': 'text-destructive',
      link: 'text-primary',
    },
    size: {
      default: '',
      xs: 'text-xs',
      sm: '',
      lg: '',
      icon: '',
      'icon-xs': '',
      'icon-sm': '',
      'icon-lg': '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

const emphasisGradients = {
  default: { start: '#3C86FF', end: '#056DFF', ring: '#045EDE' },
  brand: { start: '#DADD6C', end: '#D5D647', ring: '#B9BA3D' },
  destructive: { start: '#FF5B57', end: '#FB2C36', ring: '#DA252E' },
} as const;

type ButtonProps = React.ComponentProps<typeof Pressable> &
  React.RefAttributes<typeof Pressable> &
  VariantProps<typeof buttonVariants>;

function Button({
  className,
  variant = 'default',
  size = 'default',
  children,
  ...props
}: ButtonProps) {
  const gradientId = React.useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const gradient = variant in emphasisGradients
    ? emphasisGradients[variant as keyof typeof emphasisGradients]
    : undefined;

  return (
    <TextClassContext.Provider value={buttonTextVariants({ variant, size })}>
      <Pressable
        className={cn(
          props.disabled && 'opacity-50',
          buttonVariants({ variant, size }),
          className
        )}
        role="button"
        {...props}>
        {gradient && (
          <View pointerEvents="none" className="absolute inset-0 overflow-hidden rounded-[inherit]">
            <Svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none">
              <Defs>
                <LinearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
                  <Stop offset="0%" stopColor={gradient.start} />
                  <Stop offset="100%" stopColor={gradient.end} />
                </LinearGradient>
              </Defs>
              <Rect
                x="0.5"
                y="0.5"
                width="99"
                height="39"
                rx="18"
                fill={`url(#${gradientId})`}
                stroke={gradient.ring}
                strokeWidth="1"
              />
              <Rect x="1" y="1" width="98" height="1.5" rx="1" fill="#FFFFFF" opacity="0.18" />
            </Svg>
          </View>
        )}
        <View className="relative z-10 flex-row items-center justify-center gap-1.5">
          {children}
        </View>
      </Pressable>
    </TextClassContext.Provider>
  );
}

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };
