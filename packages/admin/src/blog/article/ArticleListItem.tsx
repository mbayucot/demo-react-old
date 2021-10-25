import React, { FC } from 'react';
import { Article } from './ArticleList';
import { Link } from 'react-router-dom';

interface ArticleProps {
  article: Article;
}

const ArticleListItem: FC<ArticleProps> = ({ article }) => {
  return (
    <p>
      <Link to={`/${article.slug}`}>{article.title}</Link>
      <p>{article.body}</p>
    </p>
  );
};

export default ArticleListItem;
