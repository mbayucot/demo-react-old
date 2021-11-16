import { FC, useState } from 'react';

import CommentListItem from './CommentListItem';
import CommentForm from './CommentForm';

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

const CommentList: FC<Comments> = ({ postId, children }) => {
  const [items, setItems] = useState<Comment[]>(children);

  const handleSuccess = (comment: Comment) => {
    setItems([...items, comment]);
  };

  return (
    <>
      {items.map((row: any) => (
        <CommentListItem {...row} postId={row.postId} key={row.id} />
      ))}
      <CommentForm postId={postId} onSuccess={handleSuccess} />
    </>
  );
};

export default CommentList;
