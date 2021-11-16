import React, { FC, useMemo, useState } from 'react';
import { gql, useQuery, useLazyQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useMutation } from '@apollo/client';
import { GET_POST } from '../../operations/queries/getPost';
import { REACT_POST } from '../../operations/mutations/reactPost';

import debounce from 'debounce';

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

  const { loading, error, data } = useQuery(GET_POST, {
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
    </Card>
  );
};

export default PostDetailPage;
