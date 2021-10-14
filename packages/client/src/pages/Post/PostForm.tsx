import React, { useState } from 'react';
import { FormikProps } from 'formik';
import * as Yup from 'yup';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import Container from '@mui/material/Container';
import { FacebookSelector } from '@charkour/react-reactions';
import { gql, useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { UPDATE_POST } from './EditPostPage';

interface Post {
  id?: number;
  title: string;
  body: string;
  tags: string[];
}

export const REACT_POST = gql`
  mutation reactArticle($id: ID!, $weight: Int!) {
    reactArticle(id: $id, weight: $weight) {
      article {
        id
        title
      }
    }
  }
`;

export type LoginFormValues = Post;

export const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  body: Yup.string().required('Body is required'),
});

const PostForm = (props: FormikProps<LoginFormValues>): React.ReactElement => {
  const { touched, values, handleChange, errors, isSubmitting, handleSubmit } = props;
  const [showComment, setShowComment] = useState<boolean>(false);

  const [reactPost] = useMutation(REACT_POST);

  const [reactionController, setReactionController] = useState({
    toggler: false,
    reaction: 'like',
  });

  const handleLikeClick = () => {
    setReactionController((prevValues) => {
      return { ...prevValues, toggler: !reactionController.toggler };
    });
  };

  const handleReaction = async (label: string) => {
    setReactionController({
      toggler: !reactionController.toggler,
      reaction: label,
    });

    await reactPost({
      variables: {
        id: 1,
        weight: 1,
      },
    });
  };

  const handleComment = () => {
    setShowComment(!showComment);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoComplete="title"
            autoFocus
            value={values.title}
            onChange={handleChange}
            error={touched.title && Boolean(errors.title)}
            helperText={touched.title && errors.title}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="body"
            label="Body"
            name="body"
            autoComplete="body"
            autoFocus
            value={values.body}
            onChange={handleChange}
            error={touched.body && Boolean(errors.body)}
            helperText={touched.body && errors.body}
          />
          <LoadingButton type="submit" loading={isSubmitting} loadingIndicator="Loading..." variant="outlined">
            Save
          </LoadingButton>
        </Box>
      </Box>
      <Box>{reactionController.toggler && <FacebookSelector onSelect={handleReaction} />}</Box>
      <Box>{showComment && <p>Comment box</p>}</Box>
      <Box>
        <button className="mr-4" onClick={handleLikeClick}>
          Like
        </button>
        <button onClick={handleComment}>Comment</button>
      </Box>
    </Container>
  );
};

export default PostForm;
