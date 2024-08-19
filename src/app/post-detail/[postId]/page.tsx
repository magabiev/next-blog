import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Post } from '@/api/posts';
import Image from 'next/image';
import Comments from '@/components/Comments';
import { serverSideApi } from '@/api/serverSideInstance';
import { Metadata } from 'next';

interface PostDetailProps {
  params: { postId: number };
}

const getPostDetail = async (postId: number) => {
  try {
    return await serverSideApi.get<Post>(`posts/${postId}`);
  } catch (e) {
    console.log('error', e);
  }
};

export const generateMetadata = async ({
  params,
}: PostDetailProps): Promise<Metadata> => {
  const data = await getPostDetail(params.postId);
  return {
    title: data?.data.title,
    description: data?.data.content,
    keywords: data?.data.content.split(''),
  };
};

async function PostDetail(params: PostDetailProps) {
  const data = await getPostDetail(params.params.postId);

  const createdDate = new Date(data?.data.createdAt || '').toLocaleDateString(
    'ru-Ru',
  );

  return (
    <div className="w-6/12 h-full mx-auto flex">
      <Card className="w-full h-5/6 my-auto flex gap-5">
        <ScrollArea className="flex-1 p-5">
          <CardHeader className="flex items-center space-x-3 p-4">
            <div>
              <h5 className="font-semibold">{data?.data.title}</h5>
              <p className="text-sm text-gray-500">{createdDate}</p>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Image
              width={300}
              height={300}
              src={`http://localhost:5001/${data?.data.image}`}
              alt="Post Image"
              className="w-full object-cover"
            />
            <div className="p-4">
              <p>{data?.data.content}</p>
            </div>
          </CardContent>
        </ScrollArea>
        <Comments postId={params.params.postId} />
      </Card>
    </div>
  );
}

export default PostDetail;
