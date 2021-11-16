import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';

export type Comment = {
  id: number;
  post_id: number;
  postId: number;
  body: string;
  children: Comment[];
};

export interface CommentFormProps {
  parentId?: number;
  postId: number;
  onSuccess: (comment: Comment) => void;
}

export const CREATE_COMMENT = gql`
  mutation CreateComment($postId: ID!, $body: String!, $parentId: ID!) {
    createComment(postId: $postId, body: $body, parentId: $parentId) {
      comment {
        id
        body
        parentId
      }
    }
  }
`;

const CommentForm: FC<CommentFormProps> = ({ postId, parentId, onSuccess }) => {
  const [searchText, setSearchText] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const [createComment] = useMutation(CREATE_COMMENT);

  const setSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value);
  };

  const handleSubmit = async (value: string) => {
    const result = await createComment({
      variables: {
        postId: postId,
        body: value,
        parentId: parentId,
      },
    });
    onSuccess(result.data);
    setSearchText('');
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
    />
  );
};

export default CommentForm;
