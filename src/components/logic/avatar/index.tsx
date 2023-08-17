'use client';
import { Avatar as Root, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ExitIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
type Props = {
  src?: string;
};

function Avatar({ src }: Props) {
  const router = useRouter();
  const signOut = async () => {
    await fetch('/auth/sign-out', {
      method: 'POST',
    });
    router.push('/login');
  };

  return (
    <div className="pr-20">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Root>
            <AvatarImage src={src} />
            <AvatarFallback>CN</AvatarFallback>
          </Root>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-52 mr-2 bg-popover">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="focus:text-destructive " onClick={signOut}>
            <ExitIcon className="mr-4 w-4 h-4" />
            <span>Log out</span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default Avatar;
