import { api } from '@/api/instance';

export interface Post {
  title: string;
  content: string;
  userId: number;
  image: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface AddCommentParams {
  userId: number;
  postId: number;
  content: string;
}

export interface Comment {
  id: number;
  content: string;
  userId: number;
  postId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostParams {
  title: string;
  content: string;
  userId: number;
}

export const createPost = async (body: FormData) => {
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };
  try {
    return await api.post<Comment>(`posts`, body, config);
  } catch (e) {
    console.log('error', e);
  }
};

export const addComment = async (body: AddCommentParams) => {
  try {
    return await api.post<Comment>(`comments`, { ...body });
  } catch (e) {
    console.log('error', e);
  }
};

export const getComments = async (postId: number) => {
  try {
    return await api.get<Comment[]>(`comments/${postId}`);
  } catch (e) {
    console.log('error', e);
  }
};
