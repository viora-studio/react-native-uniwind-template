import { cn } from '@/lib/utils';
import * as SwitchPrimitives from '@rn-primitives/switch';
import { Platform } from 'react-native';

type SwitchProps = React.ComponentProps<typeof SwitchPrimitives.Root> & {
  size?: 'sm' | 'default';
};

function Switch({
  className,
  size = 'default',
  ...props
}: SwitchProps) {
  const isChecked = Boolean(props.checked);
  const isSmall = size === 'sm';

  return (
    <SwitchPrimitives.Root
      className={cn(
        'flex shrink-0 flex-row items-center rounded-full border border-transparent',
        isSmall ? 'h-[14px] w-6' : 'h-[18.4px] w-8',
        Platform.select({
          web: 'peer outline-none transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 disabled:cursor-not-allowed dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
        }),
        isChecked ? 'bg-primary' : 'bg-input dark:bg-input/80',
        props.disabled && 'opacity-50',
        className
      )}
      {...props}>
      <SwitchPrimitives.Thumb
        className={cn(
          'bg-background rounded-full transition-transform',
          isSmall ? 'size-3' : 'size-4',
          Platform.select({ web: 'pointer-events-none block ring-0' }),
          isChecked
            ? cn('dark:bg-primary-foreground', isSmall ? 'translate-x-[10px]' : 'translate-x-3.5')
            : 'translate-x-0 dark:bg-foreground'
        )}
      />
    </SwitchPrimitives.Root>
  );
}

export { Switch };
export type { SwitchProps };
