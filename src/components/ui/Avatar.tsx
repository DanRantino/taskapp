import Image from 'next/image';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

type Props = {
  image: string;
};

function Avatar({ image }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="avatar">
          <div className="w-10 rounded-full">
            <Image alt="Profile" src={image} width={35} height={35} />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-base-300 border-none shadow-xl ">
        <DropdownMenuLabel className="text-base">Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="hover:bg-base-100 hover:text-secondary">
          <Link href={'/settings'}>Settings</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Avatar;
