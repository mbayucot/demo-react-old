import React, { FC } from 'react';
import { Link } from 'react-router-dom';

interface TagListProps {
  tag_list: string[];
}

const TagList: FC<TagListProps> = ({ tag_list }) => {
  return (
    <>
      {tag_list.map((tag) => (
        <Link key={tag} to={`/?tag=${tag}`}>
          <a>{tag}</a>
        </Link>
      ))}
    </>
  );
};

export default TagList;
