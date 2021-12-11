import { rest } from 'msw';
import { gql } from '@apollo/client';
import { buildClientSchema, execute } from 'graphql';
import { addMocksToSchema } from '@graphql-tools/mock';
import casual from 'casual';

import introspection from '../schema.json';

const mocks = {
  ISO8601DateTime: () => casual.date('YYYY-MM-DDTHH:mm:ss.SSSZZ'),
};

// Build a schema using the introspection
// @ts-ignore
const schema = buildClientSchema(introspection, mocks);

// Stub out our schema with fake data
const mockedSchema = addMocksToSchema({ schema });

// Set up a server that reads a GraphQL document and returns the data for it

export const graphqlHandler = rest.post<{ query: string; variables: any }>(
  `${process.env.REACT_APP_HOST_URL}/graphql`,
  async (req, res, ctx) => {
    const result = await execute(
      mockedSchema,
      gql`
        ${req.body.query}
      `,
      null,
      null,
      req.body.variables,
    );

    return res(ctx.json(result));
  },
);
