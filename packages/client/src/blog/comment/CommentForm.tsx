import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import { gql, useMutation } from '@apollo/client';

export type Comment = {
  id: number;
  postId: number;
  body: string;
  children: Comment[];
};

interface CommentFormProps {
  parentId?: number;
  postId?: number;
  onSuccess: (result: Comment) => void;
}

export const CREATE_COMMENT = gql`
  mutation CreateComment($postId: ID!, $body: String!, $parentId: ID) {
    createComment(postId: $postId, body: $body, parentId: $parentId) {
      comment {
        id
        body
        ancestry
        children {
          id
          body
          ancestry
        }
      }
    }
  }
`;

const CommentForm: FC<CommentFormProps> = ({ postId, parentId, onSuccess }) => {
  const [searchText, setSearchText] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [createComment, { data, loading }] = useMutation(CREATE_COMMENT);

  const setSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value);
  };

  console.log(postId);

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
