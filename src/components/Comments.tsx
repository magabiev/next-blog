'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, SendHorizonal } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addComment, getComments } from '@/api/posts';
import { getMe } from '@/api/users';
import { ChangeEvent, useState } from 'react';

interface CommentProps {
  postId: number;
}

const Comments = ({ postId }: CommentProps) => {
  const queryClient = useQueryClient();
  const [comment, setComment] = useState('');
  const { data: user } = useQuery({ queryKey: ['me'], queryFn: getMe });
  const { data: comments } = useQuery({
    queryFn: () => getComments(postId),
    queryKey: [`comments-${postId}`],
  });

  const onSuccess = () =>
    queryClient
      .invalidateQueries({ queryKey: [`comments-${postId}`] })
      .then(() => setComment(''));

  const { mutate, isPending } = useMutation({
    mutationFn: addComment,
    onSuccess,
  });

  const mutateComments = () =>
    mutate({ postId, userId: user?.data.id as number, content: comment });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setComment(e.target.value);

  return (
    <div className="flex-1 p-5">
      <CardHeader className="flex items-center space-x-3 p-4">
        Комментарии
      </CardHeader>
      <ScrollArea className="h-full max-h-[85%]">
        <CardContent className="p-0">
          {comments?.data.map(el => (
            <>
              <div className="mt-2.5">
                <p className="text-sm">{el.content}</p>
                <p className="text-sm text-gray-500">
                  {new Date(el.createdAt).toLocaleDateString('ru-Ru')}
                </p>
              </div>
              <Separator className="mt-2.5" orientation="horizontal" />
            </>
          ))}
        </CardContent>
      </ScrollArea>
      <div className="w-full flex justify-between gap-3 mt-2.5">
        <Input
          value={comment}
          onChange={handleChange}
          placeholder="Введите комментарий"
        />
        <Button
          onClick={mutateComments}
          disabled={isPending || !comment}
          size="sm"
        >
          {isPending ? <Loader2 className="animate-spin" /> : <SendHorizonal />}
        </Button>
      </div>
    </div>
  );
};

export default Comments;
