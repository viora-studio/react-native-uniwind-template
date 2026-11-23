import { TextClassContext } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { Slot } from '@rn-primitives/slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Platform, View } from 'react-native';

const badgeVariants = cva(
  cn(
    'h-5 w-fit shrink-0 flex-row items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5',
    Platform.select({
      web: 'whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [&>svg]:size-3',
    })
  ),
  {
    variants: {
      variant: {
        default: cn('bg-primary', Platform.select({ web: '[a&]:hover:bg-primary/80' })),
        secondary: cn('bg-secondary', Platform.select({ web: '[a&]:hover:bg-secondary/80' })),
        destructive: cn(
          'bg-destructive/10',
          Platform.select({ web: 'dark:bg-destructive/20 [a&]:hover:bg-destructive/20' })
        ),
        brand: cn('bg-brand', Platform.select({ web: '[a&]:hover:bg-brand/80' })),
        success: cn('bg-success-tint', Platform.select({ web: '[a&]:hover:bg-success-tint/80' })),
        info: cn('bg-info-tint', Platform.select({ web: '[a&]:hover:bg-info-tint/80' })),
        warning: cn('bg-warning-tint', Platform.select({ web: '[a&]:hover:bg-warning-tint/80' })),
        beta: cn('border border-dashed border-primary/50 bg-transparent'),
        outline: cn(
          'border-border bg-input/30',
          Platform.select({ web: '[a&]:hover:bg-muted' })
        ),
        ghost: cn('bg-transparent', Platform.select({ web: 'hover:bg-muted hover:text-muted-foreground' })),
        link: cn('bg-transparent', Platform.select({ web: 'text-primary underline-offset-4 hover:underline' })),
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const badgeTextVariants = cva('text-xs font-medium', {
  variants: {
    variant: {
      default: 'text-primary-foreground',
      secondary: 'text-secondary-foreground',
      destructive: 'text-destructive',
      brand: 'text-brand-foreground',
      success: 'text-success',
      info: 'text-info',
      warning: 'text-warning',
      beta: 'text-primary',
      outline: 'text-foreground',
      ghost: 'text-foreground',
      link: 'text-primary',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

type BadgeProps = React.ComponentProps<typeof View> &
  React.RefAttributes<View> & {
    asChild?: boolean;
  } & VariantProps<typeof badgeVariants>;

function Badge({ className, variant = 'default', asChild, ...props }: BadgeProps) {
  const Component = asChild ? Slot : View;

  return (
    <TextClassContext.Provider value={badgeTextVariants({ variant })}>
      <Component className={cn(badgeVariants({ variant }), className)} {...props} />
    </TextClassContext.Provider>
  );
}

export { Badge, badgeTextVariants, badgeVariants };
export type { BadgeProps };
