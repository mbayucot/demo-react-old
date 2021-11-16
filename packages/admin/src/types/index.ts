export type Comment = {
  id: number;
  postId: number;
  body: string;
  children: Comment[];
};

export interface Comments {
  postId?: number;
  children: Comment[];
  count?: number;
}

export interface Post {
  id?: number;
  title: string;
  body: string;
  tags: Tag[];
  tag_list?: string[];
  comments: Comment[];
}

interface User {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  role: string;
}

export type Tag = {
  id: number;
  name: string;
};
