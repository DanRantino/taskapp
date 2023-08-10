'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProfile } from '@/server/profile/actions';
import Avatar from '../logic/avatar';

const links = [
  {
    name: 'Home',
    href: '/',
  },
];

function Navbar() {
  const pathName = usePathname();
  const { data } = useQuery(['profile'], getProfile, {
    refetchOnWindowFocus: false,
  });
  return (
    <nav className="w-screen h-12 bg-background border-b flex items-center shadow-lg shadow-black ">
      <div className="w-36 px-4 h-12 flex items-center border-muted-foreground border-r">
        <span className="text-card-foreground p-2">Task app</span>
      </div>
      <div className="w-1/2 h-12 flex items-center p-2">
        {links.map(link => (
          <Link key={link.name} href={link.href}>
            <span className="transition-colors hover:text-foreground/80 text-foreground/60">{link.name}</span>
          </Link>
        ))}
      </div>
      <div className="flex h-12 items-center justify-end w-1/2 px-4">
        <Avatar src={data?.profile?.avatar_url} />
      </div>
    </nav>
  );
}

export default Navbar;
