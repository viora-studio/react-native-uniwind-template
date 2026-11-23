import { TextClassContext } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import * as TabsPrimitive from '@rn-primitives/tabs';
import { Platform } from 'react-native';

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      className={cn(
        'bg-muted flex h-9 flex-row items-center justify-center rounded-4xl p-[3px]',
        Platform.select({ web: 'w-fit', native: 'mr-auto' }),
        className
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  const { value } = TabsPrimitive.useRootContext();
  const isActive = value === props.value;

  return (
    <TextClassContext.Provider
      value={cn(
        'text-sm font-medium text-foreground/60 dark:text-muted-foreground',
        isActive && 'text-foreground dark:text-foreground'
      )}>
      <TabsPrimitive.Trigger
        className={cn(
          'flex flex-row items-center justify-center gap-1.5 rounded-xl border border-transparent px-2 py-1',
          Platform.select({
            web: 'h-[calc(100%-1px)] whitespace-nowrap outline-none transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none',
          }),
          props.disabled && 'opacity-50',
          isActive && 'bg-background dark:border-input dark:bg-input/30',
          className
        )}
        {...props}
      />
    </TextClassContext.Provider>
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      className={cn(Platform.select({ web: 'flex-1 outline-none' }), className)}
      {...props}
    />
  );
}

export { Tabs, TabsContent, TabsList, TabsTrigger };
