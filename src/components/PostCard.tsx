'use client';

import { Card, CardContent, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Post } from '@/api/posts';
import { useRouter } from 'next/navigation';

const PostCard = ({ image, title, id }: Post) => {
  const router = useRouter();
  const redirectToDetailPost = () => {
    router.push(`/post-detail/${id}`);
  };

  return (
    <Card
      onClick={redirectToDetailPost}
      className="flex flex-col w-fit gap-5 p-5 cursor-pointer hover:opacity-75"
    >
      <CardTitle className="self-start">{title}</CardTitle>
      <CardContent className="p-0 rounded overflow-hidden">
        <Image
          width={300}
          height={300}
          src={`http://localhost:5001/${image}`}
          alt="image"
        />
      </CardContent>
    </Card>
  );
};

export default PostCard;
