import React, { FC } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

interface PostCardProps {
  id: number;
  title: string;
  body: string;
  slug: string;
}

const PostCard: FC<PostCardProps> = ({ id, title, body, slug }) => {
  return (
    <Card>
      <CardContent>
        <Link to={`/post/${slug}`}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {title}
          </Typography>
        </Link>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {body}
        </Typography>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
};

export default PostCard;
