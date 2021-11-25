import React, { FC, useState } from 'react';
import { Comment } from '@demo/shared';

import CommentForm from './CommentForm';

const CommentListItem: FC<Comment> = ({ id, postId, body, children }) => {
  const [showReply, setShowReply] = useState<boolean>(false);
  const [items, setItems] = useState<Comment[]>(children || []);

  const handleReplyClick = () => {
    setShowReply(true);
  };

  const handleSuccess = (comment: Comment) => {
    setItems([...items, comment]);
  };

  return (
    <div>
      <div className="border-solid">{body}</div>
      <button onClick={handleReplyClick}>Reply</button>
      <div className="pl-4">
        {items && items.map((row: Comment) => <CommentListItem {...row} key={row.id} />)}

        {showReply && <CommentForm postId={postId} parentId={id as unknown as number} onSuccess={handleSuccess} />}
      </div>
    </div>
  );
};

export default CommentListItem;
