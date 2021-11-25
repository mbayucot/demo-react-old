import React, { FC } from 'react';
import { gql, useQuery, useLazyQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

type Params = {
  slug: string;
};

const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      title
      body
      slug
      tags {
        id
        name
      }
      comments {
        id
        body
        postId
        ancestry
        children {
          id
          body
          postId
          ancestry
        }
      }
    }
  }
`;

const PostDetailPage: FC = () => {
  let { slug } = useParams<Params>();

  const { loading, error, data } = useQuery(GET_POST, {
    variables: { id: slug },
  });

  if (loading) return <p>Loading..</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;

  return (
    <Card>
      <CardContent>
        <Link to={`/posts/${slug}`}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {data.post.title}
          </Typography>
        </Link>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {data.post.body}
        </Typography>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
};

export default PostDetailPage;
