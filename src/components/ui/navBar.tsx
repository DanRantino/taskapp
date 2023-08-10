'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import Avatar from './Avatar';
import { useQuery } from '@tanstack/react-query';
import { getProfile } from '@/server/profile/actions';
import Skeleton from './Skeleton';

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
    <nav className="w-screen h-12 bg-base-200 flex items-center shadow-lg shadow-black ">
      <div className="w-36 px-4 h-12 flex items-center">Task app</div>
      <div className="w-1/2 h-12 flex items-center">
        {links.map(link => (
          <Link
            className={cn([
              'border-secondary-focus border-x w-16 h-12 flex items-center justify-center hover:bg-secondary-focus hover:text-base-100 text-secondary transition-all duration-200',
              [pathName === link.href ? 'bg-secondary-focus text-base-100 cursor-default' : ''],
            ])}
            key={link.name}
            href={link.href}
          >
            {link.name}
          </Link>
        ))}
      </div>
      <div className="flex h-12 items-center justify-end w-1/2 px-4">
        {!data || !data.profile ? (
          <Skeleton className="w-10 rounded-full h-10 bg-base-300" />
        ) : (
          <Avatar image={data.profile.avatar_url} />
        )}
      </div>
    </nav>
  );
}

export default Navbar;
