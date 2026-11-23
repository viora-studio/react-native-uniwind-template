import { Icon } from '@/components/ui/icon';
import { Text, TextClassContext } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react-native';
import * as React from 'react';
import { View } from 'react-native';

type AlertVariant = 'default' | 'destructive';

function Alert({
  className,
  variant = 'default',
  children,
  icon,
  iconClassName,
  ...props
}: React.ComponentProps<typeof View> &
  React.RefAttributes<View> & {
    icon: LucideIcon;
    variant?: AlertVariant;
    iconClassName?: string;
  }) {
  const isDestructive = variant === 'destructive';

  return (
    <TextClassContext.Provider
      value={cn(
        'text-sm text-foreground',
        isDestructive && 'text-destructive'
      )}>
      <View
        role="alert"
        className={cn(
          'relative w-full rounded-lg border border-border bg-card px-4 py-3',
          className
        )}
        {...props}>
        <View className="absolute left-4 top-3.5">
          <Icon
            as={icon}
            className={cn('size-4', isDestructive && 'text-destructive', iconClassName)}
          />
        </View>
        {children}
      </View>
    </TextClassContext.Provider>
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<typeof Text>) {
  return (
    <Text
      className={cn('mb-1 ml-0.5 min-h-4 pl-6 font-medium leading-snug', className)}
      {...props}
    />
  );
}

function AlertDescription({ className, ...props }: React.ComponentProps<typeof Text>) {
  const textClass = React.useContext(TextClassContext);

  return (
    <Text
      className={cn(
        'ml-0.5 pb-0.5 pl-6 text-sm leading-relaxed text-muted-foreground',
        textClass?.includes('text-destructive') && 'text-destructive/90',
        className
      )}
      {...props}
    />
  );
}

function AlertAction({
  className,
  ...props
}: React.ComponentProps<typeof View> & React.RefAttributes<View>) {
  return (
    <View
      className={cn('absolute right-3 top-2.5', className)}
      {...props}
    />
  );
}

export { Alert, AlertAction, AlertDescription, AlertTitle };
export type { AlertVariant };
