import React, { FC } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Tag } from '@demo/shared';

import TagList from '../Post/TagList';

interface PostCardProps {
  id: number;
  title: string;
  body: string;
  slug: string;
  tags: Tag[];
}

const PostCard: FC<PostCardProps> = ({ id, title, body, slug, tags }) => {
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
        <TagList tags={tags} />
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
};

export default PostCard;
