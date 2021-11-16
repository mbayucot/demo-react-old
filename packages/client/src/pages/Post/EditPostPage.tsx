import React, { FC } from 'react';
import { withFormik } from 'formik';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import PostForm from '@demo/client/src/pages/Post/PostForm';
import { useParams } from 'react-router-dom';
import { gql, useQuery, useLazyQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { GET_POST } from '../../operations/queries/getPost';
import { UPDATE_POST } from '../../operations/mutations/updatePost';

import { LoginFormValues, validationSchema } from '@demo/client/src/pages/Post/PostForm';

type Params = {
  id: string;
};

type Tag = {
  id: number;
  name: string;
};

type PostAttributes = {
  id?: number;
  title?: string;
  body?: string;
  tag_list?: string;
};

export type Comment = {
  id: number;
  post_id: number;
  body: string;
  children: Comment[];
};

const EditPostPage: FC = () => {
  let history = useHistory();
  let { id } = useParams<Params>();

  const { loading, error, data } = useQuery(GET_POST, {
    variables: { id: id },
  });

  const [updatePost] = useMutation(UPDATE_POST);

  const EnhancedLoginForm = withFormik<
    {
      id?: number;
      title: string;
      body: string;
      tags: Tag[];
      comments: Comment[];
    },
    LoginFormValues
  >({
    mapPropsToValues: (props) => ({
      id: props.id || undefined,
      title: props.title || '',
      body: props.body || '',
      tags: props.tags || {},
      comments: props.comments || [],
    }),

    validationSchema: validationSchema,

    handleSubmit: async (values: LoginFormValues, { props, ...actions }) => {
      await updatePost({
        variables: {
          id: id,
          attributes: {
            title: values.title,
            body: values.body,
            tag_list: values.tag_list,
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
      <Box>
        <EnhancedLoginForm {...data.post} />
      </Box>
    </Container>
  );
};

export default EditPostPage;
