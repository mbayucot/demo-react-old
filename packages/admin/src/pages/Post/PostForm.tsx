import React from 'react';
import { FormikProps } from 'formik';
import * as Yup from 'yup';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import Container from '@mui/material/Container';
import { gql, useQuery } from '@apollo/client';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { client } from '../../index';

type Tag = {
  id: number;
  name: string;
};

export type Comment = {
  id: number;
  post_id: number;
  body: string;
  children: Comment[];
};

interface Post {
  id?: number;
  title: string;
  body: string;
  tags: Tag[];
  tag_list?: string[];
  comments: Comment[];
}

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

export type LoginFormValues = Post;

export const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  body: Yup.string().required('Body is required'),
});

const PostForm = (props: FormikProps<LoginFormValues>): React.ReactElement => {
  const { touched, values, handleChange, errors, isSubmitting, handleSubmit, setFieldValue } = props;

  //const [getTags, { loading, error, data }] = useLazyQuery(GET_TAGS);
  const { loading, error, data } = useQuery(GET_TAGS);

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
            defaultValue={values.tags.map((x: any) => ({ value: x.id, label: x.name }))}
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
    </Container>
  );
};

export default PostForm;
