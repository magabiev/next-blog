import PostCard from '@/components/PostCard';
import { serverSideApi } from '@/api/serverSideInstance';
import { Post } from '@/api/posts';

const getPosts = async () => {
  try {
    return await serverSideApi.get<Post[]>(`posts`);
  } catch (e) {
    console.log('error', e);
  }
};

export default async function Home() {
  const data = await getPosts();

  if (!data?.data.length) {
    return 'Нет данных';
  }

  return (
    <main className="mt-10 flex gap-5 flex-wrap">
      {data?.data.map(el => <PostCard key={el.id} {...el} />)}
    </main>
  );
}
