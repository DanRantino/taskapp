import { cn } from '@/lib/utils';
import React, { HTMLAttributes } from 'react';

function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded-sm bg-primary/10', className)} {...props} />;
}

export default Skeleton;
