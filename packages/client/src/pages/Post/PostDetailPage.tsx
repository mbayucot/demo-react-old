import React, { FC, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Reaction } from '@demo/shared';
import debounce from 'debounce';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

import { GET_POST_DETAIL, REACT_POST } from '@demo/shared';

import CommentList from './CommentList';

type Params = {
  slug: string;
};

export const weights: any = {
  thumb: 0,
  like: 1,
  love: 2,
  haha: 3,
  wow: 4,
  sad: 5,
  angry: 6,
};

const PostDetailPage: FC = () => {
  let { slug } = useParams<Params>();
  const [showComment, setShowComment] = useState<boolean>(false);

  const { loading, error, data } = useQuery(GET_POST_DETAIL, {
    variables: { id: slug },
  });

  const [reactPost] = useMutation(REACT_POST);

  const [reactionController, setReactionController] = useState<{ toggler: boolean; reaction: any }>({
    toggler: false,
    reaction: 'thumb',
  });

  const handleLikeClick = async () => {
    setReactionController({
      toggler: false,
      reaction: 'thumb',
    });

    /**
     *
     await reactPost({
      variables: {
        id: values.id,
        weight: 0,
      },
    });
     */
  };

  const handleReaction = async (label: string) => {
    setReactionController({
      toggler: false,
      reaction: label,
    });

    /**
    *
    await reactPost({
      variables: {
        id: values.id,
        weight: weights[reactionController.reaction],
      },
    });
    */
  };

  const handleHideReaction = () =>
    setReactionController((prevValues) => {
      return { ...prevValues, toggler: false };
    });

  const handleShowReaction = () =>
    setReactionController((prevValues) => {
      return { ...prevValues, toggler: true };
    });

  const debouncedChangeHandler = useMemo(() => debounce(handleHideReaction, 1000), []);

  const handleComment = () => {
    setShowComment(!showComment);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">${error.message}</Alert>;
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
          {data.post.content}
        </Typography>
      </CardContent>
      <CardActions>
        <Box>{showComment && data && <CommentList postId={data.post.id} children={data.post.comments} />}</Box>
        <Reaction
          handleShowReaction={handleShowReaction}
          debouncedChangeHandler={debouncedChangeHandler}
          handleLikeClick={handleLikeClick}
          reaction={reactionController.reaction}
        />
        <button onClick={handleComment}>Comment</button>
      </CardActions>
      <div>
        {data.post.subscribed && (
          <Link to={`/checkout`}>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Please subscribe to continue!
            </Typography>
          </Link>
        )}
      </div>
    </Card>
  );
};

export default PostDetailPage;
