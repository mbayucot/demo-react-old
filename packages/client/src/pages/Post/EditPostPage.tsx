import React, { FC } from 'react';
import { withFormik } from 'formik';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import PostForm from '@demo/client/src/pages/Post/PostForm';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import { GET_POST, UPDATE_POST, GET_ALL_POSTS } from '@demo/shared';

import { FormValues, validationSchema } from '@demo/client/src/pages/Post/PostForm';

type Params = {
  id: string;
};

const EditPostPage: FC = () => {
  let history = useHistory();
  let { id } = useParams<Params>();

  const { loading, error, data } = useQuery(GET_POST, {
    variables: { id: id },
  });

  const [updatePost] = useMutation(UPDATE_POST, {
    refetchQueries: [{ query: GET_ALL_POSTS }],
  });

  const EnhancedLoginForm = withFormik<FormValues, FormValues>({
    mapPropsToValues: (props) => ({
      title: props.title,
      body: props.body,
      tags: props.tags,
    }),

    validationSchema: validationSchema,

    handleSubmit: async (values: FormValues, { props, ...actions }) => {
      await updatePost({
        variables: {
          id: id,
          attributes: {
            title: values.title,
            body: values.body,
            tagList: values.tagList,
          },
        },
      });
      history.push('/posts');
    },
  })(PostForm);

  if (loading) return <p>'Loading...'</p>;
  if (error) return <p>`Error! ${error.message}`</p>;

  return (
    <Container>
      <Box>{data && <EnhancedLoginForm {...data.post} />}</Box>
    </Container>
  );
};

export default EditPostPage;
