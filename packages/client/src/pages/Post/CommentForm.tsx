import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import { useMutation } from '@apollo/client';
import { Comment, CREATE_COMMENT } from '@demo/shared';

interface CommentFormProps {
  parentId?: number;
  postId?: number;
  onSuccess: (result: Comment) => void;
}

const CommentForm: FC<CommentFormProps> = ({ postId, parentId, onSuccess }) => {
  const [searchText, setSearchText] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [createComment, { data, loading }] = useMutation(CREATE_COMMENT);

  const setSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value);
  };

  const handleSubmit = async (value: string) => {
    try {
      await createComment({
        variables: {
          postId: postId,
          body: value,
          parentId: parentId || null,
        },
      });
      if (!loading && data) {
        onSuccess(data.comment);
      }
      setSearchText('');
    } catch (error) {
      setError(true);
    }
  };

  const handleKeyPress = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      await handleSubmit(e.currentTarget.value);
    }
  };

  if (error) return <div>failed to load</div>;

  return (
    <input
      type="text"
      placeholder="Write a comment..."
      value={searchText}
      onChange={setSearch}
      onKeyPress={handleKeyPress}
      className="border-2 border-black-300"
    />
  );
};

export default CommentForm;
