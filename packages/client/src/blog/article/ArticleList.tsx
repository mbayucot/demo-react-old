import React, { FC } from 'react';
import { gql, useQuery } from '@apollo/client';

import ArticleListItem from './ArticleListItem';

export interface Article {
  id: number;
  body?: string;
  slug?: string;
  title?: string;
}

interface ArticleData {
  articles: Article[];
}

interface Props {}

const GET_ARTICLES = gql`
  query GetArticles {
    articles {
      id
      title
      body
      slug
    }
  }
`;

const ArticleList: FC<Props> = () => {
  const { loading, error, data } = useQuery<ArticleData>(GET_ARTICLES);

  if (loading) return <p>'Loading...'</p>;
  if (error) return <p>`Error! ${error.message}`</p>;

  return <div>{data && data.articles.map((article) => <ArticleListItem key={article.id} article={article} />)}</div>;
};

export default ArticleList;
