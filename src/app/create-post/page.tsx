'use client';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getMe } from '@/api/users';
import { createPost } from '@/api/posts';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const CreatePost = () => {
  const router = useRouter();
  const { data } = useQuery({ queryKey: ['me'], queryFn: getMe });
  const { mutate, isPending } = useMutation({
    mutationFn: createPost,
    onSuccess: () => router.push('/'),
  });

  const [post, setPost] = useState<{
    content: string;
    title: string;
    image: File | null;
  }>({
    content: '',
    image: null,
    title: '',
  });

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setPost({ ...post, image: files ? files[0] : null });
  };

  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>,
  ) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const submit = () => {
    const formData = new FormData();
    if (post.image) {
      formData.append('image', post.image);
      formData.append('title', post.title);
      formData.append('content', post.content);
      formData.append('userId', String(data?.data.id));
      mutate(formData);
    }
  };

  const isButtonDisabled = !Object.values(post).every(Boolean) || isPending;

  return (
    <div className="w-4/12 h-full mx-auto flex">
      <Card className="w-full h-6/12 my-auto flex flex-col gap-5">
        <CardTitle className="text-center p-5">Добавить пост</CardTitle>
        <CardContent className="mt-auto flex flex-col gap-5">
          <div className="w-[300px]">
            {post.image ? (
              <Image
                width={300}
                height={300}
                src={URL.createObjectURL(post.image)}
                alt="Post Image"
                className="w-full object-cover"
              />
            ) : (
              'Выберите файл'
            )}
          </div>
          <Input
            placeholder="Заголовок"
            name="title"
            onChange={handleChange}
            className="mt-auto flex-1"
            type="text"
          />
          <Input
            onChange={handleChangeFile}
            className="mt-auto flex-1"
            type="file"
          />
          <Textarea
            onChange={handleChange}
            name="content"
            rows={10}
            className="mt-auto flex-2"
            placeholder="Введите текст"
          />
          <Button onClick={submit} disabled={isButtonDisabled}>
            {!isPending ? 'Сохранить' : <Loader2 className="animate-spin" />}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatePost;
