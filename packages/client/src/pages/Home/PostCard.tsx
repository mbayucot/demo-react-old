import React, { FC } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

import TagList from '../TagList';

interface PostCardProps {
  id: number;
  title: string;
  body: string;
  slug: string;
  tagList: string[];
}

const PostCard: FC<PostCardProps> = ({ id, title, body, slug, tagList }) => {
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
        <TagList tag_list={tagList} />
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
};

export default PostCard;
