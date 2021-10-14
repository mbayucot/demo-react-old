import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { REACT_POST } from '../Post/PostForm';

export type Comment = {
  id: number;
  article_id: number;
  body: string;
  children: Comment[];
};

export interface CommentFormProps {
  parent_id?: number;
  article_id: number;
  onSuccess: (result: Comment) => void;
}

export const CREATE_COMMENT = gql`
  mutation CreateComment($articleId: ID!, $body: String!, $parentId: ID!) {
    createComment(articleId: $articleId, body: $body, parentId: $parentId) {
      comment {
        id
        body
        parentId
      }
    }
  }
`;

const CommentForm: FC<CommentFormProps> = ({ article_id, parent_id, onSuccess }) => {
  const [searchText, setSearchText] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const [createComment] = useMutation(CREATE_COMMENT);

  const setSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value);
  };

  const handleSubmit = async (value: string) => {
    const result = await createComment({
      variables: {
        articleId: article_id,
        body: value,
        parentId: parent_id,
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
