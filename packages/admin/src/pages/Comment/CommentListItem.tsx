import React, { FC, useState } from 'react';

import CommentForm from './CommentForm';

export type Comment = {
  id: number;
  post_id: number;
  body: string;
  children: Comment[];
};

const CommentListItem: FC<Comment> = ({ id, post_id, body, children }) => {
  const [showReply, setShowReply] = useState<boolean>(false);
  const [items, setItems] = useState<Comment[]>(children);

  const handleReplyClick = () => {
    setShowReply(true);
  };

  const handleSuccess = (comment: Comment) => {
    setItems([...items, comment]);
  };

  return (
    <div>
      <div>{body}</div>
      <button onClick={handleReplyClick}>Reply</button>
      <div>
        {items && items.map((row: Comment) => <CommentListItem {...row} key={row.id} />)}

        {showReply && <CommentForm post_id={post_id} parent_id={id} onSuccess={handleSuccess} />}
      </div>
    </div>
  );
};

export default CommentListItem;
