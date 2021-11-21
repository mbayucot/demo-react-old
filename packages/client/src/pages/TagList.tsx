import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Tag } from '@demo/shared';

interface TagListProps {
  tags: Tag[];
}

const TagList: FC<TagListProps> = ({ tags }) => {
  return (
    <>
      {tags.map((tag) => (
        <Link key={tag.id} to={`/?tag=${tag.name}`}>
          <a>{tag.name}</a>
        </Link>
      ))}
    </>
  );
};

export default TagList;
