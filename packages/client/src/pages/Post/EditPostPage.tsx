import React, { FC } from 'react';
import { withFormik } from 'formik';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import PostForm from '@demo/client/src/pages/Post/PostForm';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';

import { LoginFormValues, validationSchema } from '@demo/client/src/pages/Post/PostForm';
import { UPDATE_USER } from '../User/EditUserPage';

type Params = {
  id: string;
};

type ArticleAttributes = {
  title?: string;
  body?: string;
};

const GET_POST = gql`
  query GetArticle($id: ID!) {
    article(id: $id) {
      id
      title
      body
      slug
    }
  }
`;

export const UPDATE_POST = gql`
  mutation updateArticle($id: ID!, $attributes: ArticleAttributes!) {
    updateArticle(id: $id, attributes: $attributes) {
      article {
        id
        title
      }
    }
  }
`;

const EditPostPage: FC = () => {
  let { id } = useParams<Params>();

  const { loading, error, data } = useQuery(GET_POST, {
    variables: { id: id },
  });

  const [updatePost] = useMutation(UPDATE_POST);

  const EnhancedLoginForm = withFormik<
    {
      title: string;
      body: string;
    },
    LoginFormValues
  >({
    mapPropsToValues: (props) => ({
      title: props.title || '',
      body: props.body || '',
      tags: [''],
    }),

    validationSchema: validationSchema,

    handleSubmit: async (values: LoginFormValues, { props, ...actions }) => {
      await updatePost({
        variables: {
          id: id,
          attributes: {
            title: values.title,
            body: values.body,
          },
        },
      });
    },
  })(PostForm);

  if (loading) return <p>'Loading...'</p>;
  if (error) return <p>`Error! ${error.message}`</p>;

  return (
    <Container>
      <Box>
        <EnhancedLoginForm {...data.article} />
      </Box>
    </Container>
  );
};

export default EditPostPage;
