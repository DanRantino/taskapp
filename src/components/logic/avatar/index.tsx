import { Avatar as Root, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import Skeleton from '@/components/ui/Skeleton';
type Props = {
  src?: string;
};

function Avatar({ src }: Props) {
  return (
    <Root>
      <AvatarImage src={src} />
      <AvatarFallback>CN</AvatarFallback>
    </Root>
  );
}

export default Avatar;
