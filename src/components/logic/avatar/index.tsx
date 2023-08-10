import { Avatar as Root, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import Skeleton from '@/components/ui/Skeleton';
type Props = {
  src?: string;
};

function Avatar({ src }: Props) {
  return (
    <Root>
      <AvatarImage src={src} />
      <AvatarFallback>
        <Skeleton className="w-10 rounded-full h-10 bg-base-300" />
      </AvatarFallback>
    </Root>
  );
}

export default Avatar;
