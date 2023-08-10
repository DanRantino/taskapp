import { PropsWithChildren } from 'react';

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <body className="flex items-center justify-center w-screen h-screen bg-background overflow-hidden">
      <main>{children}</main>
    </body>
  );
}
