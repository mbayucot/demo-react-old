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

type Tag = {
  id: number;
  name: string;
};
