import React, { useState } from 'react';
import { FormikProps } from 'formik';
import * as Yup from 'yup';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import Container from '@mui/material/Container';
import { FacebookSelector } from '@charkour/react-reactions';
import { gql, useQuery, useLazyQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { UPDATE_POST } from './EditPostPage';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { client } from '../../index';

type Tag = {
  id: number;
  name: string;
};

interface Post {
  id?: number;
  title: string;
  body: string;
  tags: Tag[];
  tag_list?: string[];
}

export type Reaction = 'none' | 'thumb' | 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry';

type Options = {
  [key: number]: Reaction;
};

export const voteWeights: Options = {
  0: 'none',
  1: 'thumb',
  2: 'like',
  3: 'love',
  4: 'haha',
  5: 'wow',
  6: 'sad',
  7: 'angry',
};

const GET_TAGS = gql`
  query GetTags {
    tags {
      id
      name
    }
  }
`;

const query = gql`
  query GetTags($query: String!) {
    tags(query: $query) {
      id
      name
    }
  }
`;

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
  const { touched, values, handleChange, errors, isSubmitting, handleSubmit, setFieldValue } = props;
  const [showComment, setShowComment] = useState<boolean>(false);
  const [reaction, setReaction] = useState<Reaction>('none');
  const [searchText, setSearchText] = useState('');

  //const [getTags, { loading, error, data }] = useLazyQuery(GET_TAGS);
  const { loading, error, data } = useQuery(GET_TAGS);

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

  const loadOptions = (inputValue: string, callback: (options: any) => void) => {
    client.query({ query, variables: { query: inputValue } }).then((response) => {
      callback(response.data.tags.map((x: any) => ({ value: x.id, label: x.name })));
    });
  };

  // @ts-ignore
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
          <AsyncCreatableSelect
            cacheOptions
            defaultOptions
            placeholder="Tags"
            inputId="tags"
            name="tags"
            // onInputChange={handleInputChange}
            //defaultValue={values.tags.map((x: any) => ({ value: x.id, label: x.name }))}
            loadOptions={loadOptions}
            styles={{
              container: (base) => ({
                ...base,
                width: 250,
              }),
            }}
            isClearable
            isMulti
            onChange={(value) => {
              setFieldValue('tag_list', value ? value.map((x: any) => x.label) : '');
            }}
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
